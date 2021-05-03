/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import firebase from './firebaseConfig';
import './gallery.css';

export default function Gallery({ photoHeader }) {
  const [imageUrl, setImageUrl] = useState([]);
  const [text, setText] = useState('');
  const [src, setSrc] = useState('name');
  const [name, setName] = useState('user');
  const [champmsg, setChampmsg] = useState('msg');
  const [msg, setMsg] = useState('msg');
  const [date, setDate] = useState('date');
  const [commentary, setCommentary] = useState('');
  const [nameComment, setNameComment] = useState('');
  const [time, setTime] = useState('time');
  const id = uuid();

  const readImages = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(e.target.files[0]);

    let date1 = new Date();
    let date2 = Date.now();
    let dateLocale = date1.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    console.log(dateLocale);

    const storageRef = firebase.storage().ref().child(id);
    const imageRef = firebase.database().ref('images').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.child(src).set(url);
      imageRef.child(name).set(text);
      imageRef.child(champmsg).set(msg);
      imageRef.child(time).set(date2);
      imageRef.child(date).set(dateLocale);
      console.log(date2);
      const newState = [...imageUrl, { id, url }];
      setImageUrl(newState);
    });
  };
  const myChangeHandler = (event) => {
    setText(event.target.value);
    console.log(text);
  };
  const myChangeHandlerMsg = (event) => {
    setMsg(event.target.value);
    console.log(msg);
  };
  const myChangeHandlerCommentary = (event) => {
    setCommentary(event.target.value);
    console.log(commentary);
  };
  const myChangeHandlerNameCommentary = (event) => {
    setNameComment(event.target.value);
  };

  const getImageUrl = () => {
    const imageRef = firebase.database().ref('images');

    imageRef.orderByChild('time').on('value', (snapshot) => {
      const imageUrls = snapshot.val();
      const urls = [];
      for (let id in imageUrls) {
        urls.push({ id, url: imageUrls[id] });
      }

      console.log(snapshot.val);
      setImageUrl(urls);
      console.log(imageUrl);
    });
  };
  const deleteImage = (id) => {
    const storageRef = firebase.storage().ref().child(id);
    const imageRef = firebase.database().ref('images').child('daily').child(id);
    storageRef.delete().then(() => {
      imageRef.remove();
    });
  };
  useEffect(() => {
    getImageUrl();

    console.log(imageUrl);
  }, []);
  const handleSubmitCommentary = (id) => {
    let commentRef = firebase
      .database()
      .ref('images')
      .child('daily')
      .child(id)
      .child('comment');
    const comment = {
      commentary,
      nameComment,
    };
    commentRef.push(comment);
    setCommentary('');
    setNameComment('');
  };
  return (
    <form className="boxGallery">
      <h2 className="textHead">Galeries photo</h2>

      <div className="form-gallery">
        <div className="form-gallery-content">
          <h2 className="title-gallery">Partagez votre photo : </h2>
          <input
            className="gallery-input"
            type="text"
            placeholder="Nom"
            onChange={myChangeHandler}
          />

          <input
            className="gallery-input"
            type="text"
            placeholder="Message"
            onChange={myChangeHandlerMsg}
          />
          <div>
            <input
              name="files"
              className="gallery-input-btn"
              type="file"
              accept="image/*"
              onChange={readImages}
            />
            <button type="submit" className="buttonSend">
              Envoyer
            </button>
          </div>
        </div>
      </div>

      {imageUrl
        ? imageUrl
            .sort((a, b) => a.url.time - b.url.time)
            .reverse()
            .map(({ id, url }) => (
              <div>
                <div className="gallery-card" key={id}>
                  <img src={url.name} alt="" className="gallery-img" />
                  <div className="gallery-card-description">
                    <p className="gallery-card-description-text">
                      &quot;{url.msg}&quot;
                    </p>
                    <p className="gallery-card-description-name">{url.user}</p>
                    <p
                      style={{
                        textAlign: 'right',
                        fontSize: '10px',
                        marginRight: '10px',
                      }}
                    >
                      {url.date}
                    </p>
                  </div>
                  <div className="gallery-social">
                    <div className="content-social1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#53d496"
                      >
                        <path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z" />
                      </svg>
                      {/* <p>J&apos;aime</p> */}
                    </div>
                    <div className="content-social2">
                      <svg
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#53d496"
                      >
                        <g>
                          <path d="M19.2,3.8H4.8c-1.2,0-2.1,1-2.1,2.2v9.4c0,1.2,1,2.2,2.1,2.2h6.4v2c0,0.3,0.1,0.5,0.4,0.6c0.1,0.1,0.2,0.1,0.4,0.1   c0.1,0,0.3,0,0.4-0.1l4.6-2.7h2.2c1.2,0,2.1-1,2.1-2.2V5.9C21.3,4.7,20.4,3.8,19.2,3.8z M19.8,15.3c0,0.4-0.3,0.7-0.6,0.7h-2.4   c-0.1,0-0.3,0-0.4,0.1l-3.7,2.1v-1.5c0-0.4-0.3-0.8-0.8-0.8H4.8c-0.3,0-0.6-0.3-0.6-0.7V5.9c0-0.4,0.3-0.7,0.6-0.7h14.4   c0.3,0,0.6,0.3,0.6,0.7V15.3z" />
                          <circle cx="7.8" cy="10.5" r="1" />
                          <circle cx="12" cy="10.5" r="1" />
                          <circle cx="16.2" cy="10.5" r="1" />
                        </g>
                      </svg>
                      {/* <p className="p-middle">Commenter</p> */}
                    </div>
                    <div className="content-social3">
                      <svg
                        width="25"
                        height="25"
                        x="0px"
                        y="0px"
                        viewBox="0 0 60.062 60.062"
                        fill="#53d496"
                      >
                        <path
                          d="M60.046,11.196c0.004-0.024,0.011-0.048,0.013-0.072c0.007-0.074-0.001-0.149-0.01-0.224
	                    c-0.002-0.019,0.001-0.037-0.002-0.056c-0.018-0.099-0.051-0.196-0.1-0.289c-0.008-0.016-0.019-0.031-0.028-0.047
	                    c-0.002-0.002-0.002-0.005-0.003-0.008c-0.001-0.002-0.004-0.003-0.005-0.006c-0.007-0.011-0.013-0.023-0.02-0.033
	                    c-0.062-0.091-0.137-0.166-0.221-0.23c-0.019-0.014-0.041-0.022-0.061-0.035c-0.074-0.049-0.152-0.089-0.236-0.116
	                    c-0.037-0.012-0.074-0.018-0.112-0.025c-0.073-0.015-0.146-0.022-0.222-0.02c-0.04,0.001-0.078,0.003-0.118,0.009
	                    c-0.026,0.004-0.051,0-0.077,0.006L0.798,22.046c-0.413,0.086-0.729,0.421-0.788,0.839s0.15,0.828,0.523,1.025l16.632,8.773
	                    l2.917,16.187c-0.002,0.012,0.001,0.025,0,0.037c-0.01,0.08-0.011,0.158-0.001,0.237c0.005,0.04,0.01,0.078,0.02,0.117
	                    c0.023,0.095,0.06,0.184,0.11,0.268c0.01,0.016,0.01,0.035,0.021,0.051c0.003,0.005,0.008,0.009,0.012,0.013
	                    c0.013,0.019,0.031,0.034,0.046,0.053c0.047,0.058,0.096,0.111,0.152,0.156c0.009,0.007,0.015,0.018,0.025,0.025
	                    c0.015,0.011,0.032,0.014,0.047,0.024c0.061,0.04,0.124,0.073,0.191,0.099c0.027,0.01,0.052,0.022,0.08,0.03
	                    c0.09,0.026,0.183,0.044,0.277,0.044c0.001,0,0.002,0,0.003,0h0c0,0,0,0,0,0c0.004,0,0.008-0.002,0.012-0.002
	                    c0.017,0.001,0.034,0.002,0.051,0.002c0.277,0,0.527-0.124,0.712-0.315l11.079-7.386l11.6,7.54c0.164,0.106,0.354,0.161,0.545,0.161
	                    c0.105,0,0.212-0.017,0.315-0.051c0.288-0.096,0.518-0.318,0.623-0.604l13.996-37.989c0.013-0.034,0.024-0.069,0.033-0.105
	                    c0.004-0.015,0.005-0.03,0.008-0.044C60.042,11.22,60.044,11.208,60.046,11.196z M48.464,17.579L24.471,35.22
	                    c-0.039,0.029-0.07,0.065-0.104,0.099c-0.013,0.012-0.026,0.022-0.037,0.035c-0.021,0.023-0.04,0.046-0.059,0.071
	                    c-0.018,0.024-0.032,0.049-0.048,0.074c-0.037,0.06-0.068,0.122-0.092,0.188c-0.005,0.013-0.013,0.023-0.017,0.036
	                    c-0.001,0.004-0.005,0.006-0.006,0.01l-2.75,8.937l-2.179-12.091L48.464,17.579z M22.908,46.594l2.726-9.004l4.244,2.759
	                    l1.214,0.789l-4.124,2.749L22.908,46.594z M52.044,13.498L18.071,30.899l-14.14-7.458L52.044,13.498z M44.559,47.504L29.154,37.492
	                    l-2.333-1.517l30.154-22.172L44.559,47.504z"
                        />
                      </svg>
                      {/* <p>Partager</p> */}
                    </div>
                  </div>
                  <div className="section-comment">
                    {url.comment
                      ? Object.values(url.comment).map((el) => (
                          <div className="section-comment-p">
                            <p className="section-comment-name" key={el}>
                              {el.nameComment}
                            </p>
                            <p className="section-comment-content" key={el}>
                              {el.commentary}
                            </p>
                          </div>
                        ))
                      : null}
                    <div className="form-comment">
                      <input
                        type="text"
                        placeholder="votre commentaire"
                        onChange={myChangeHandlerCommentary}
                        className="input-comment1"
                        value={commentary}
                      />
                      <div className="content-comment">
                        <input
                          type="text"
                          placeholder="votre nom"
                          onChange={myChangeHandlerNameCommentary}
                          value={nameComment}
                          className="input-comment"
                        />

                        <button
                          type="button"
                          className="buttonSendComment"
                          onClick={() => {
                            handleSubmitCommentary(id);

                            console.log(commentary);
                          }}
                        >
                          Publier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        : ''}
    </form>
  );
}
