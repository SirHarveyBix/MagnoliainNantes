/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import HerbariumCard from './HerbariumCard';

function HerbariumListo({ magnoliaArray, showAll, setShowAll, GetMagnolia }) {
  useEffect(() => {
    GetMagnolia();
  }, []);

  console.log(magnoliaArray);
  console.log(showAll);
  const showMineOnly = () => setShowAll(filtered);
  const showAllOnly = () => setShowAll(all);
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
