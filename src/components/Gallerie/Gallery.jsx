/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import firebase from './firebaseConfig';
import './gallery.css';

export default function Gallery() {
  const [imageUrl, setImageUrl] = useState([]);
  const [text, setText] = useState('');
  const [src, setSrc] = useState('name');
  const [name, setName] = useState('user');
  const [champmsg, setChampmsg] = useState('msg');
  const [msg, setMsg] = useState('msg');
  const [date, setDate] = useState('date');
  const readImages = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    const id = uuid();
    let date1 = new Date();
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
    const imageRef = firebase.database().ref('images').child('daily').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.child(src).set(url);
      imageRef.child(name).set(text);
      imageRef.child(champmsg).set(msg);
      imageRef.child(date).set(dateLocale);
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
    console.log(text);
  };
  const getImageUrl = () => {
    const imageRef = firebase.database().ref('images').child('daily');
    imageRef.on('value', (snapshot) => {
      const imageUrls = snapshot.val();
      const urls = [];
      for (let id in imageUrls) {
        urls.push({ id, url: imageUrls[id] });
      }
      const newState = [...imageUrl, ...urls];
      setImageUrl(newState);
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
  }, []);

  return (
    <div className="boxGallery">
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
          </div>
        </div>
      </div>

      {imageUrl
        ? imageUrl.map(({ id, url }) => (
            <div className="gallery-card" key={id.name}>
              <img src={url.name} alt="" className="gallery-img" />
              <div className="gallery-card-description">
                <p className="gallery-card-description-text">
                  &quot;{url.msg}&quot;, {url.user}
                </p>
                <p style={{ textAlign: 'right', fontSize: '10px' }}>
                  {url.date}
                </p>
              </div>
              <div className="gallery-social">
                <div className="content-social">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="green"
                  >
                    <path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z" />
                  </svg>
                  <p>J&apos;aime</p>
                </div>

                <p className="p-middle">Commenter</p>
                <p>Partager</p>
              </div>
            </div>
          ))
        : ''}
    </div>
  );
}
