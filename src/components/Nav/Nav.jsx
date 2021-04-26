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
import './Nav.css';
import HomeSvg from './HomeSvg';
import ProgressSvg from './ProgressSvg';
import HerbierSvg from './HerbierSvg';
import PlansSvg from './PlansSvg';
import MapProgress from '../mapProgress/MapProgress';

const apiMap = [
  {
    name: 'Parc de Procé',
    photo:
      'https://domaine-de-sceaux.hauts-de-seine.fr/fileadmin/_processed_/5/2/csm_1-_plaine_orangerie_625d27e89a.jpg',
    found: localStorage.getItem('totalProce'),
    total: 10,
  },
  {
    name: 'Parc de la Gaudinière',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Nantes_-_Parc_Gaudiniere_%282%29.jpg',
    found: 0,
    total: 1,
  },
  {
    name: 'Parc du Grand Blottereau',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/2/25/Nantes_GrandBlottereau_jangseungSucheon.jpg',
    found: 0,
    total: 3,
  },
  {
    name: 'Jardin des Plantes',
    photo:
      'https://www.parcsetjardins.fr/data/cache/GardenPicture/picture/main/2/2/9384.1606317648.jpg',
    found: localStorage.getItem('contJardinPlante'),
    total: 3,
  },
  {
    name: 'Parc Floral de la Beaujoire',
    photo:
      'https://www.sortir-en-ville.com/images/kcfinder/images/beaujoire-jdo-13-754-4.JPG',
    found: 0,
    total: 93,
  },
  {
    name: 'Cimetière Parc',
    photo:
      'https://jardins.nantes.fr/N/Jardin/Parcs-jardins/Plus/433/Cimetiere-Parc/photo/IMGP6027-js.jpg',
    found: 0,
    total: 16,
  },
];

function Nav({
  setPhotoHeader,
  setUsername,
  username,
  user,
  setUser,
  photoHeader,
  setHomeActive,
  showAll,
  getMagnolia,
  setShowAll,
  magnoliaArray,
  setMagnoliaArray,
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
            to="/mapProgress/"
            className="main-nav"
            activeClassName="main-nav-active"
          >
            <ProgressSvg fill="white" onClick={() => setHomeActive(true)} />
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
            <HerbierSvg fill="white" onClick={() => setHomeActive(true)} />
            <p>Herbier</p>
          </NavLink>
        </div>
        <div className="boxIcon">
          <NavLink
            exact
            to="/Map/"
            className="main-nav"
            activeClassName="main-nav-active"
          >
            <PlansSvg fill="white" onClick={() => setHomeActive(true)} />
            <p>Plans</p>
          </NavLink>
        </div>
      </nav>

      <Switch>
        <Route path="/Herbarium/">
          <HerbariumListo
            getMagnolia={getMagnolia}
            magnoliaArray={magnoliaArray}
            setMagnoliaArray={setMagnoliaArray}
            showAll={showAll}
            setShowAll={setShowAll}
            photoHeader={photoHeader}
          />
        </Route>
        <Route path="/mapProgress/">
          {apiMap.map((parc) => (
            <MapProgress
              namePark={parc.name}
              imgPark={parc.photo}
              totalPlantPark={parc.total}
              plantFound={parc.found}
            />
          ))}
        </Route>

        <Route path="/Map/">
          <Map
            getMagnolia={getMagnolia}
            magnoliaArray={magnoliaArray}
            setMagnoliaArray={setMagnoliaArray}
            showAll={showAll}
            setShowAll={setShowAll}
            photoHeader={photoHeader}
          />
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
