/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import HerbariumCard from './HerbariumCard';

function HerbariumListo({ magnoliaArray, showAll, setShowAll, getMagnolia }) {
  const [plantFound, setPlantFound] = useState([]);

  useEffect(() => {
    getMagnolia();
    const plantfound = localStorage.getItem('isfound');
    setPlantFound(plantfound);
  }, []);

  const filtered = magnoliaArray.filter(
    (valeur) =>
      plantFound !== undefined ? plantFound.includes(valeur.recordid) : ''
    /* valeur.fields.photo1 !== undefined &&
      valeur.fields.nom_du_site === 'Arboretum Cimetière Parc' */
  );

  const all = magnoliaArray.filter(
    (valeur) =>
      valeur.fields.photo1 !== undefined &&
      valeur.fields.cultivar !== undefined &&
      valeur.fields.espece !== undefined
  );

  const showMineOnly = () => setShowAll(filtered);
  const showAllOnly = () => setShowAll(all);

  return (
    <div className="BoxHerbarium">
      <button onClick={() => showMineOnly()}>My Magno</button>
      <button onClick={() => showAllOnly()}>All the Magno</button>

      {showAll &&
        showAll.map((plant, index) => (
          <HerbariumCard id={index} key={plant.recordid} plant={plant} />
        ))}
    </div>
  );
}
export default HerbariumListo;
