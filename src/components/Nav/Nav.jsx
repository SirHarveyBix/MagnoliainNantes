/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import HomePage from '../homepage/Home';
import HerbariumCard from '../Herbarium/HerbariumCard';
import HomeSvg from './HomeSvg';
import ProgressSvg from './ProgressSvg';
import HerbierSvg from './HerbierSvg';
import PlansSvg from './PlansSvg';

function Nav({
  setPhotoHeader,
  setUsername,
  username,
  user,
  setUser,
  photoHeader,
  setHomeActive,
  checkAcquis,
  logoCheck,
}) {
  return (
    <Router>
      <nav className="footer">
        <div className="boxIcon">
          <NavLink
            exact
            to="/"
            className="main-nav"
            activeClassName="main-nav-active"
          >
            <HomeSvg fill="white" onClick={() => setHomeActive(false)} />
            <p>Home</p>
          </NavLink>
        </div>
        <div className="boxIcon">
          <NavLink
            exact
            to="/"
            className="main-nav"
            activeClassName="main-nav-active"
          >
            <ProgressSvg fill="white" onClick={() => setHomeActive(false)} />
            <p>Progres</p>
          </NavLink>
        </div>
        <div className="boxIcon">
          <NavLink
            exact
            to="/Herbarium/"
            className="main-nav"
            activeClassName="main-nav-active"
          >
            <HerbierSvg fill="white" onClick={() => setHomeActive(false)} />
            <p>Herbier</p>
          </NavLink>
        </div>
        <div className="boxIcon">
          <NavLink
            exact
            to="/"
            className="main-nav"
            activeClassName="main-nav-active"
          >
            <PlansSvg fill="white" onClick={() => setHomeActive(false)} />
            <p>Plans</p>
          </NavLink>
        </div>
      </nav>

      <Switch>
        <Route path="/Herbarium/">
          <HerbariumCard checkAcquis={checkAcquis} logoCheck={logoCheck} />
        </Route>
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
    </Router>
  );
}

export default Nav;
