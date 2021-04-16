/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home.svg';
import Herbier from './Herbier.svg';
import Plan from './Plan.svg';
import Progress from './progress.svg';
import HomePage from '../homepage/Home';

function Nav({
  setPhotoHeader,
  setUsername,
  username,
  user,
  setUser,
  photoHeader,
  setHomeActive,
}) {
  return (
    <Router>
      <div>
        <div className="footer">
          <div className="boxIcon">
            <Link to="/">
              <img src={Home} alt="home" onClick={() => setHomeActive(false)} />
            </Link>
            <p>Home</p>
          </div>
          <div className="boxIcon">
            <img
              src={Progress}
              alt="progress"
              onClick={() => setHomeActive(true)}
            />
            <p>Progres</p>
          </div>
          <div className="boxIcon">
            <img src={Herbier} alt="herbier" />
            <p>Herbarium</p>
          </div>
          <div className="boxIcon">
            <img src={Plan} alt="plan" />
            <p>Plans</p>
          </div>
        </div>

        <Switch>
          <Route path="/">
            <HomePage
              photoHeader={photoHeader}
              setPhotoHeader={setPhotoHeader}
              username={username}
              setUsername={setUsername}
              user={user}
              setUser={setUser}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Nav;
