/* eslint-disable no-unused-vars */
/* eslint-disable indent */
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
  const readImages = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    const id = uuid();
    const storageRef = firebase.storage().ref().child(id);
    const imageRef = firebase.database().ref('images').child('daily').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
      imageRef.child(src).set(url);
      imageRef.child(name).set(text);
      imageRef.child(champmsg).set(msg);
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
      for (const id in imageUrls) {
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
    <div>
      <h2 className="textHead">Galeries photo</h2>

      <div className="form-gallery">
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

      {imageUrl
        ? imageUrl.map(({ id, url }) => (
            <div
              key={id.name}
              style={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <img
                src={url.name}
                alt=""
                style={{ width: 350, height: 'auto' }}
                className="image-post"
              />
              <div className="subtext-photo">
                <h3 className="subtext-pseudo">Photographié par {url.user}</h3>
                <p className="subtext-msg">{url.msg}</p>
              </div>
            </div>
          ))
        : ''}
    </div>
  );
}
