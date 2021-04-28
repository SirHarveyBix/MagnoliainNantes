/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Jplante from './img/parc1.png';
import Proce from './img/parc7.jpg';
import Beaujoire from './img/parc3.png';
import Blotereau from './img/parc4.png';
import Cimetier from './img/parc5.jpg';
import Gaudiniere from './img/parc6.jpg';
import magno from './img/magno.png';
import Mark from './img/fleur1.png';
import Mark2 from './img/fleur2.png';
import useGeoLocation from './useGeoLocation';
import './Map.css';

require('react-leaflet-markercluster/dist/styles.min.css');

const Map = ({ photoHeader }) => {
  const [countPlante, setCountPlant] = useState(0);
  const [countProce, setCountProce] = useState(0);
  const [isFound, setIsFound] = useState([]);
  const [parc, SetParc] = useState([]);
  const [parcfilter, setParcFilter] = useState([]);
  const [newParc, setNewParc] = useState([]);
  const [countTotal, setCountTotal] = useState(0);
  const [topPlant, SetTopPlant] = useState([]);
  const [showAll, setShowAll] = useState([]);
  const [countBeaujoire, setCountBeaujoire] = useState(0);
  const [countCimetiere, setCountCimetiere] = useState(0);
  const [countGaudiniere, setCountGaudiniere] = useState(0);
  const [countBlotereau, setCountBlotereau] = useState(0);

  const GetTopPlant = async () => {
    const temp = await fetch(`https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_collection-vegetale-nantes&q=&rows=400&start=0&refine.genre=Magnolia
    `).then((res) => res.json());

    SetTopPlant(temp.records);
    setShowAll(
      temp.records.filter(
        (valeur) =>
          valeur.fields.photo1 !== undefined &&
          valeur.fields.cultivar !== undefined &&
          valeur.fields.espece !== undefined &&
          valeur.fields.location !== undefined &&
          valeur.fields.nom_du_site !== undefined
      )
    );
  };

  const GetParc = async () => {
    const tempo = await fetch(`https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_parcs-jardins-nantes&q=&rows=100
      `).then((res) => res.json());
    SetParc(tempo.records);
    const newarray = {
      fields: {
        nom_complet: 'Cimetière Parc',
        adresse: 'Chemin de la justice',
        location: [47.269653, -1.584945],
      },
    };

    setParcFilter(
      tempo.records
        .concat(newarray)
        .filter(
          (valeur) =>
            valeur.fields.nom_complet === 'Parc de Procé' ||
            valeur.fields.nom_complet === 'Parc Floral de la Beaujoire' ||
            valeur.fields.nom_complet === 'Jardin des Plantes' ||
            valeur.fields.nom_complet === 'Parc du Grand Blottereau' ||
            valeur.fields.nom_complet === 'Parc de la Gaudinière' ||
            valeur.fields.nom_complet === 'Cimetière Parc'
        )
    );
  };

  useEffect(() => {
    GetParc();
  }, []);
  useEffect(() => {
    GetTopPlant();
  }, []);
  useEffect(() => {
    const plantfound = localStorage.getItem('isfound');
    const total = localStorage.getItem('total');
    const totalPlante = localStorage.getItem('totalJardinPlante');
    const totalProce = localStorage.getItem('totalProce');
    const totalBeaujoire = localStorage.getItem('totalBeaujoire');
    const totalCimetiere = localStorage.getItem('totalCimetiere');
    const totalBlotereau = localStorage.getItem('totalBlotereau');
    const totalGaudiniere = localStorage.getItem('totalGaudiniere');
    if (
      plantfound &&
      total &&
      (totalPlante ||
        totalProce ||
        totalBeaujoire ||
        totalBlotereau ||
        totalCimetiere ||
        totalGaudiniere)
    ) {
      setIsFound(plantfound);
      setCountTotal(parseInt(total));
      setCountPlant(parseInt(totalPlante));
      setCountProce(parseInt(totalProce));
      setCountBeaujoire(parseInt(totalBeaujoire));
      setCountBlotereau(parseInt(totalBlotereau));
      setCountGaudiniere(parseInt(totalGaudiniere));
      setCountCimetiere(parseInt(totalCimetiere));
    }
  }, []);

  // function to get distance beetween user and all plant
  function getDistance(origin, destination) {
    // return distance in meters
    const lon1 = toRadian(origin[1]);
    const lat1 = toRadian(origin[0]);
    const lon2 = toRadian(destination[1]);
    const lat2 = toRadian(destination[0]);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
  }
  function toRadian(degree) {
    return (degree * Math.PI) / 180;
  }
  // marker for plant
  const markerIcon = new L.Icon({
    iconUrl: Mark,
    iconSize: [40, 70],
    iconAnchor: [17, 50], // [left/right, top/bottom]
    popupAnchor: [0, -50], // [left/right, top/bottom]
  });
  const markerIsFound = new L.Icon({
    iconUrl: Mark2,
    iconSize: [40, 70],
    iconAnchor: [17, 50], // [left/right, top/bottom]
    popupAnchor: [0, -50], // [left/right, top/bottom]
  });
  // marker for user
  const markerUser = new L.Icon({
    className: 'avatarLocation',
    iconUrl: photoHeader,
    iconSize: [40, 40],
    iconAnchor: [17, 50], // [left/right, top/bottom]
    popupAnchor: [0, -50], // [left/right, top/bottom]
  });

  // get user position
  const location = useGeoLocation();

  // map all plant and get distance with user
  const allPlants = showAll.map((plant) => {
    const distance = getDistance(plant.fields.location, [
      location.coordinates.lat,
      location.coordinates.lng,
    ]);
    plant.distance = parseInt(distance.toFixed(0));
    plant.isfound = false;
    return plant;
  });

  const counter = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const plantFound = isFound;
    plantFound.push(e.target.id);
    console.log(plantFound);
    setIsFound(plantFound);
    localStorage.setItem('isfound', plantFound);
    setCountTotal(
      countPlante +
        countProce +
        countBlotereau +
        countCimetiere +
        countGaudiniere +
        countBeaujoire +
        1
    );

    allPlants.map((position) =>
      position.distance <= 2800 &&
      position.fields.nom_du_site === 'Jardin des Plantes'
        ? add(countPlante, setCountPlant)
        : '' ||
          (position.distance <= 2800 &&
            position.fields.nom_du_site === 'Parc de Procé')
        ? add(countProce, setCountProce)
        : '' ||
          (position.distance <= 2800 &&
            position.fields.nom_du_site === 'Parc floral de la Beaujoire')
        ? add(countBeaujoire, setCountBeaujoire)
        : '' ||
          (position.distance <= 2800 &&
            position.fields.nom_du_site === 'Parc de la Gaudinière')
        ? add(countGaudiniere, setCountGaudiniere)
        : '' ||
          (position.distance <= 2800 &&
            position.fields.nom_du_site === 'Parc exotique du Grand-Blottereau')
        ? add(countBlotereau, setCountBlotereau)
        : '' ||
          (position.distance <= 2800 &&
            position.fields.nom_du_site === 'Arboretum Cimetière Parc')
        ? add(countCimetiere, setCountCimetiere)
        : ''
    );
  };

  function add(cont, setCont) {
    const newcount = cont + 1;
    setCont(newcount);
    localStorage.setItem('total', countTotal + 1);
    switch (setCont) {
      case setCountPlant:
        localStorage.setItem('totalJardinPlante', countPlante + 1);
        localStorage.setItem('totalGaudiniere', countGaudiniere);
        localStorage.setItem('totalCimetiere', countCimetiere);
        localStorage.setItem('totalBlotereau', countBlotereau);
        localStorage.setItem('totalBeaujoire', countBeaujoire);
        localStorage.setItem('totalProce', countProce);
        break;
      case setCountProce:
        localStorage.setItem('totalProce', countProce + 1);
        localStorage.setItem('totalJardinPlante', countPlante);
        localStorage.setItem('totalGaudiniere', countGaudiniere);
        localStorage.setItem('totalCimetiere', countCimetiere);
        localStorage.setItem('totalBlotereau', countBlotereau);
        localStorage.setItem('totalBeaujoire', countBeaujoire);
        break;
      case setCountBeaujoire:
        localStorage.setItem('totalProce', countProce);
        localStorage.setItem('totalJardinPlante', countPlante);
        localStorage.setItem('totalGaudiniere', countGaudiniere);
        localStorage.setItem('totalCimetiere', countCimetiere);
        localStorage.setItem('totalBlotereau', countBlotereau);
        localStorage.setItem('totalBeaujoire', countBeaujoire + 1);
        break;
      case setCountBlotereau:
        localStorage.setItem('totalProce', countProce);
        localStorage.setItem('totalJardinPlante', countPlante);
        localStorage.setItem('totalGaudiniere', countGaudiniere);
        localStorage.setItem('totalCimetiere', countCimetiere);
        localStorage.setItem('totalBlotereau', countBlotereau + 1);
        localStorage.setItem('totalBeaujoire', countBeaujoire);
        break;
      case setCountCimetiere:
        localStorage.setItem('totalProce', countProce);
        localStorage.setItem('totalJardinPlante', countPlante);
        localStorage.setItem('totalGaudiniere', countGaudiniere);
        localStorage.setItem('totalCimetiere', countCimetiere + 1);
        localStorage.setItem('totalBlotereau', countBlotereau);
        localStorage.setItem('totalBeaujoire', countBeaujoire);
        break;
      case setCountGaudiniere:
        localStorage.setItem('totalProce', countProce);
        localStorage.setItem('totalJardinPlante', countPlante);
        localStorage.setItem('totalGaudiniere', countGaudiniere + 1);
        localStorage.setItem('totalCimetiere', countCimetiere);
        localStorage.setItem('totalBlotereau', countBlotereau);
        localStorage.setItem('totalBeaujoire', countBeaujoire);
        break;
      default:
      
    }
  }

 

  return (
    <div>
      <div className="BoxMap">
        {parcfilter &&
          parcfilter.map((parc) => (
            <div className="CardMap">
              <div
                className="CardInfo"
                style={{
                  backgroundImage: `url( ${
                    parc.fields.nom_complet === 'Jardin des Plantes'
                      ? Jplante
                      : '' ||
                        parc.fields.nom_complet ===
                          'Parc Floral de la Beaujoire'
                      ? Beaujoire
                      : '' ||
                        parc.fields.nom_complet === 'Parc du Grand Blottereau'
                      ? Blotereau
                      : '' || parc.fields.nom_complet === 'Cimetière Parc'
                      ? Cimetier
                      : '' ||
                        parc.fields.nom_complet === 'Parc de la Gaudinière'
                      ? Gaudiniere
                      : '' || parc.fields.nom_complet === 'Parc de Procé'
                      ? Proce
                      : ''
                  })`,
                }}
              >
                <div className="CardInfoTxt">
                  <h3>{parc.fields.nom_complet}</h3>
                  <div className="CardInfoSubTxt">
                    <p>{parc.fields.adresse}</p>
                    <p>
                      {parc.fields.nom_complet === 'Jardin des Plantes'
                        ? countPlante
                        : '' || parc.fields.nom_complet === 'Parc de Procé'
                        ? countProce
                        : '' ||
                          parc.fields.nom_complet ===
                            'Parc Floral de la Beaujoire'
                        ? countBeaujoire
                        : '' ||
                          parc.fields.nom_complet === 'Parc de la Gaudinière'
                        ? countGaudiniere
                        : '' ||
                          parc.fields.nom_complet === 'Parc du Grand Blottereau'
                        ? countBlotereau
                        : '' || parc.fields.nom_complet === 'Cimetière Parc'
                        ? countCimetiere
                        : ''}
                      /
                      {parc.fields.nom_complet === 'Parc de Procé'
                        ? showAll.filter(
                            (total) =>
                              total.fields.nom_du_site === 'Parc de Procé'
                          ).length
                        : '' || parc.fields.nom_complet === 'Jardin des Plantes'
                        ? showAll.filter(
                            (plant) =>
                              plant.fields.nom_du_site === 'Jardin des Plantes'
                          ).length
                        : '' ||
                          parc.fields.nom_complet ===
                            'Parc Floral de la Beaujoire'
                        ? showAll.filter(
                            (total) =>
                              total.fields.nom_du_site ===
                              'Parc floral de la Beaujoire'
                          ).length
                        : '' ||
                          parc.fields.nom_complet === 'Parc de la Gaudinière'
                        ? showAll.filter(
                            (total) =>
                              total.fields.nom_du_site ===
                              'Parc de la Gaudinière'
                          ).length
                        : '' ||
                          parc.fields.nom_complet === 'Parc du Grand Blottereau'
                        ? showAll.filter(
                            (total) =>
                              total.fields.nom_du_site ===
                              'Parc exotique du Grand-Blottereau'
                          ).length
                        : '' || parc.fields.nom_complet === 'Cimetière Parc'
                        ? showAll.filter(
                            (total) =>
                              total.fields.nom_du_site ===
                              'Arboretum Cimetière Parc'
                          ).length
                        : ''}
                    </p>
                  </div>
                </div>
                <div
                  className="scoreMagno"
                  style={{
                    backgroundImage: `url(${Proce})`,
                  }}
                >
                  {countTotal} Magnolia sur {showAll.length}
                </div>
              </div>
              <MapContainer
                center={[parc.fields.location[0], parc.fields.location[1]]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=nCEJmAfEuJiX0snlBIpkDSV8G7APluwStdVjOXtOvGoOeNdXAcwynbxB5myumP0D"

                  /* attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' */
                />
                <MarkerClusterGroup>
                  {allPlants.map((plant) => (
                    <Marker
                      position={[
                        plant.fields.location[0],
                        plant.fields.location[1],
                      ]}
                      icon={
                        isFound.includes(plant.recordid)
                          ? markerIsFound
                          : markerIcon
                      }
                      key={plant.recordid}
                    >
                      <Popup keepInView closeButton={false}>
                        Espèce : {plant.fields.espece}
                        <p>
                          {isFound.includes(plant.recordid)
                            ? 'Vous avez déjà cette plante'
                            : plant.distance <= 2800
                            ? `Vous êtes à ${plant.distance} mètres de ce magnolia vous pouvez le cueillir `
                            : `Vous êtes à ${plant.distance} mètres de ce magnolia`}
                        </p>
                        <div>
                          <input
                            type="button"
                            onClick={(e) => counter(e)}
                            disabled={
                              !(
                                plant.distance <= 2800 &&
                                !isFound.includes(plant.recordid)
                              )
                            }
                            id={plant.recordid}
                            value={`add ${plant.fields.espece}`}
                          />

                          <button>ta photo</button>
                        </div>
                        <img
                          src={`https://data.nantesmetropole.fr/explore/dataset/244400404_collection-vegetale-nantes/files/${plant.fields.photo1.id}/300/`}
                          alt="plant"
                          className="imgPopup"
                        />
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
                {location.loaded && !location.error && (
                  <Marker
                    icon={markerUser}
                    position={[
                      location.coordinates.lat,
                      location.coordinates.lng,
                    ]}
                  >
                    <Popup keepInView closeButton={false}>
                      <p>Vous êtes ici !</p>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Map;
