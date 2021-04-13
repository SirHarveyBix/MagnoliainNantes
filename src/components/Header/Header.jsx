import React from 'react';
import Logo from './logo.png';
import Avatar from './avataaars.png';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="logo" className="logo" />

      <div className="avatar">
        <h2 className="titleAvatar"> Mr Tartenpion </h2>
        <img src={Avatar} alt="avatar" className="avatarImg" />
      </div>
    </div>
  );
}

export default Header;
