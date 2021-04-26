
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import HerbariumCard from './HerbariumCard';

function HerbariumListo({ magnoliaArray, showAll, setShowAll, GetMagnolia }) {
  useEffect(() => {
    getMagnolia();
  }, []);



  const filtered = magnoliaArray.filter(
    (valeur) =>
      valeur.fields.photo1 !== undefined &&
      valeur.fields.nom_du_site === 'Arboretum Cimetière Parc'
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
      <button type="button" onClick={() => showMineOnly()}>My Magno</button>
      <button type"button" onClick={() => showAllOnly()}>All the Magno</button>

      {showAll &&
        showAll.map((plant, index) => (
          <HerbariumCard id={index} key={plant.recordid} plant={plant} />
        ))}
    </div>
  );
}
export default HerbariumListo;
