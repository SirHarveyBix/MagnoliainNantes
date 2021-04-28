/* eslint-disable react/prop-types */
import React from 'react';
import Logo from './dqdq.png';
import './Header.css';

function Header({ photoHeader, user }) {
  return (
    <div className="header">
      <div className="boxLogo">
        <img src={Logo} alt="logo" className="logo" />
        <p className="slogan">Magnolia in Nantes</p>
      </div>
      <div className="avatar">
        <h2 className="titleAvatar">{user}</h2>
        <img src={photoHeader} alt="" className="avatarImg" />
      </div>
    </div>
  );
}

export default Header;
