/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import checkGreen from './checkGreen.png';
import checkBlack from './checkBlack.png';
import './HerbariumCard.css';

const magnolia = {
  image:
    'https://www.meillandrichardier.com/media/catalog/product/cache/1/image/800x800/040ec09b1e35df139433887a97daa66f/8/0/8072a-magnolia_susan.jpg',
  gender: 'Magnolia des tropiques ',
  location: 'Parc de la Chanterie',
};

function HerbariumCard() {
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
          src={magnolia.image}
          alt="photoMagnolia"
          className="photoMagnolia"
        />
      </div>
      <div className="infoCard">
        <div className="gender">
          <h3 className="title">Espèce</h3>
          <p className="content">{magnolia.gender}</p>
        </div>
        <div className="location">
          <h3 className="title">Localisation</h3>
          <p className="content">{magnolia.location}</p>
          <img
            src={logoCheck}
            alt="toggleImg"
            className="toggleImg"
            onClick={checkAcquis}
          />
        </div>
      </div>
    </div>
  );
}
export default HerbariumCard;
