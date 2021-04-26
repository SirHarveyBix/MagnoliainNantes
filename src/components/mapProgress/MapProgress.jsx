import React from 'react';
import ProgressBar from './ProgressBar';
import logoplant from './Vector.png';
import './MapProgress.css';

function MapProgress({ namePark, imgPark, totalPlantPark, plantFound }) {
  return (
    <div className="MapProgress">
      <div className="divPhotoPark">
        <img className="photoPark" src={imgPark} alt="photoPark" />
      </div>
      <div className="info">
        <h3 className="namePark">{namePark}</h3>
        <div className="totalPlant">
          <div className="count">
            <img className="logoplant" src={logoplant} alt="logoplant" />
            <p>
              {plantFound}/{totalPlantPark}
            </p>
          </div>
          <div className="ProgressBar">
            <ProgressBar width={200} progress={plantFound / totalPlantPark} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MapProgress;
