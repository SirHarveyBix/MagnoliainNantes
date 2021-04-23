import * as React from 'react';
import './ProgressBar.css';

function ProgressBar({ largeur, progress }) {
  const largeurProgress = progress * largeur;
  const porcent = Math.floor(progress * 100);
  return (
    <div className="progress-div" style={{ width: largeur }}>
      <div style={{ width: `${largeurProgress}px` }} className="progress">
        <p>{porcent}%</p>
      </div>
    </div>
  );
}

export default ProgressBar;
