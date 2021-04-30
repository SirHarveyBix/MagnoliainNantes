/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import firebase from './firebaseConfig';
import './gallery.css';
import Social from './Social';

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
              <Social id={id} />
            </div>
          ))
        : ''}
    </div>
  );
}
