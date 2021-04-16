
import { useState } from 'react';
import HerbariumCard from './components/HerbariumCard';
import checkGreen from './components/checkGreen.png';
import checkBlack from './components/checkBlack.png';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import './components/Nav/Nav.css';
import Home from './components/homepage/Home';


function App() {
  const [logoCheck, setLogoCheck] = useState(checkBlack);
  const [acquisition, setAcquisition] = useState(false);

  function checkAcquis() {
    setAcquisition(!acquisition);
    if (logoCheck === checkBlack) {
      setLogoCheck(checkGreen);
    } else if (logoCheck === checkGreen) {
      setLogoCheck(checkBlack);
    }
  }

  return (
    <div className="App">
      <HerbariumCard checkAcquis={checkAcquis} logoCheck={logoCheck} />
      <Header />
      <Nav />
      <Home />
    </div>
  );
}

export default App;
