// eslint-disable-next-line prettier/prettier
import { useState } from 'react';
import HerbariumCard from './components/HerbariumCard';
import checkGreen from './components/checkGreen.png';
import checkBlack from './components/checkBlack.png';

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
    </div>
  );
}

export default App;
