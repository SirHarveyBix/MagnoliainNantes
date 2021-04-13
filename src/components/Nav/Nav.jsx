import React from 'react';
import Home from './Home.svg';
import Herbier from './Herbier.svg';
import Plan from './Plan.svg';
import Progress from './progress.svg';

function Nav() {
  return (
    <div className="footer">
      <div className="boxIcon">
        <img src={Home} alt="home" className="home" />
        <p>Home</p>
      </div>
      <div>
        <img src={Progress} alt="progress" className="plan" />
        <p>Progrès</p>
      </div>
      <div>
        <img src={Herbier} alt="herbier" className="herbier" />
        <p>Herbarium</p>
      </div>
      <div>
        <img src={Plan} alt="plan" className="plan" />
        <p>Plan</p>
      </div>
    </div>
  );
}

export default Nav;
