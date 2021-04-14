/* eslint-disable react/prop-types */
import React from 'react';
import Logo from './logo.png';
import './Header.css';

function Header({ photoHeader, user }) {
  return (
    <div className="header">
      <img src={Logo} alt="logo" className="logo" />

      <div className="avatar">
        <h2 className="titleAvatar">{user}</h2>
        <img src={photoHeader} alt="" className="avatarImg" />
      </div>
    </div>
  );
}

export default Header;
