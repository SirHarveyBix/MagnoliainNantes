import React from 'react';
import './Home.css';
import logo from './logo.png';
import avatar1 from './avatars(1).png';
import avatar2 from './avatars(2).png';
import avatar3 from './avatars(3).png';
import avatar4 from './avatars(4).png';
import avatar5 from './avatars(5).png';
import avatar6 from './avatars(6).png';

function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <img className="home-header-img" src={logo} alt="logo magnolia" />
      </div>
      <div className="home-section-profil">
        <h2>Choisissez votre pseudo :</h2>
        <input type="text" placeholder="Pseudo" required />
      </div>
      <div className="home-section-avatar">
        <h2>Choisissez votre avatar :</h2>
        <div className="home-section-avatar-img">
          <img src={avatar1} alt="avatar" />
          <img src={avatar3} alt="avatar1" />
          <img src={avatar4} alt="avatar1" />
          <img src={avatar2} alt="avatar1" />
          <img src={avatar5} alt="avatar1" />
          <img src={avatar6} alt="avatar1" />
        </div>
      </div>
      <div className="home-button">
        <button type="button">VALIDER</button>
      </div>
    </div>
  );
}

export default Home;
