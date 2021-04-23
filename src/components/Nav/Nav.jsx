/* eslint-disable import/no-named-as-default-member */
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
import HerbariumListo from '../Herbarium/HerbariumListo';
import Map from '../Map/Map';

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
  showAll,
  GetMagnolia,
  setShowAll,
  magnoliaArray,
  setMagnoliaArray,
}) {
  return (
    <Router>

      <div>
        <div className="footer nav">
          <div className="boxIcon">
            <NavLink
              exact
              to="/"
              className="main-nav"
              activeClassName="main-nav-active"
            >
              <img src={Home} alt="home" onClick={() => setHomeActive(false)} />
            </NavLink>
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
            <NavLink
              exact
              to="/Herbarium/"
              className="main-nav"
              activeClassName="main-nav-active"
            >
              <img
                src={Herbier}
                alt="herbier"
                onClick={() => setHomeActive(true)}
                className="svg"
              />
            </NavLink>
            <p>Herbarium</p>
          </div>
          <div className="boxIcon">
            <NavLink
              exact
              to="/Map/"
              className="main-nav"
              activeClassName="main-nav-active"
            >
              <img src={Plan} alt="plan" onClick={() => setHomeActive(true)} />
            </NavLink>

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
            <p>Progrès</p>
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
            <HerbariumListo
              checkAcquis={checkAcquis}
              logoCheck={logoCheck}
              GetMagnolia={GetMagnolia}
              showAll={showAll}
              setShowAll={setShowAll}
              magnoliaArray={magnoliaArray}
              setMagnoliaArray={setMagnoliaArray}
            />
          </Route>
          <Route path="/Map/">
            <Map photoHeader={photoHeader} />
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
      </div>
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
