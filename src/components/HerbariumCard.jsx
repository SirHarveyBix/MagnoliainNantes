import React from 'react';
import './HerbariumCard.css';

const magnolia = {
  image:
    'https://www.meillandrichardier.com/media/catalog/product/cache/1/image/800x800/040ec09b1e35df139433887a97daa66f/8/0/8072a-magnolia_susan.jpg',
  gender: 'magolitumsarasin',
  location: 'jardin des plantes',
};
function HerbariumCard() {
  return (
    <div className="cardsHerbarium">
      <img src={magnolia.image} alt="photoMagnolia" className="photoMagnolia" />
      <div className="infoCard">
        <h3 className="gender card">Genre</h3>
        <p className="content gender">{magnolia.gender}</p>
        <h3 className="location card">Localisation</h3>
        <p className="content location">{magnolia.location}</p>
      </div>
      <img
        src="https://cdn.discordapp.com/attachments/816732696658313229/831525323622318190/magnolia-icon-green.png"
        alt="toggleImg"
        className="toggleImg"
      />
    </div>
  );
}
export default HerbariumCard;
