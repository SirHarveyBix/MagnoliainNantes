/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import checkGreen from './checkGreen.png';
import checkBlack from './checkBlack.png';
import './HerbariumCard.css';

function HerbariumCard({ plant }) {
  const [logoCheck, setLogoCheck] = useState(checkBlack);
  const [acquisition, setAcquisition] = useState(false);

  function checkAcquis() {
    setAcquisition(!acquisition);
    if (logoCheck === checkBlack) {
      setLogoCheck(checkGreen);
    } else if (logoCheck === checkGreen) {
      setLogoCheck(checkBlack);
    }
  }

  return (
    <div className="cardsHerbarium">
      <div className="imageCard">
        <img
          src={`https://data.nantesmetropole.fr/explore/dataset/244400404_collection-vegetale-nantes/files/${plant.fields.photo1.id}/300/`}
          alt="plant"
          className="photoMagnolia"
        />
      </div>
      <div className="infoCard">
        <h3 className="title">Espèce</h3>
        <p className="content">{plant.fields.espece}</p>
        <h3 className="title">Cultivar</h3>
        <p className="content">{plant.fields.cultivar}</p>
        <img
          src={logoCheck}
          alt="toggleImg"
          className="toggleImg"
          onClick={checkAcquis}
        />
      </div>
    </div>
  );
}
export default HerbariumCard;
