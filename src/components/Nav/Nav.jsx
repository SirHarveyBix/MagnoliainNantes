import React from 'react';
import Home from './Home.svg';
import Herbier from './Herbier.svg';
import Plan from './Plan.svg';
import Progress from './progress.svg';

function Nav() {
  return (
    <div className="footer">
      <div className="boxIcon">
        <img src={Home} alt="home" />
        <p>Home</p>
      </div>
      <div className="boxIcon">
        <img src={Progress} alt="progress" />
        <p>Progrès</p>
      </div>
      <div className="boxIcon">
        <img src={Herbier} alt="herbier" />
        <p>Herbarium</p>
      </div>
      <div className="boxIcon">
        <img src={Plan} alt="plan" />
        <p>Plan</p>
      </div>
    </div>
  );
}

export default Nav;
