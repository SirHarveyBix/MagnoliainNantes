import ProgressCircle from './ProgressCircle';
import MapProgress from './MapProgress';
import './PageProgress.css';

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
    found: localStorage.getItem('totalGaudiniere'),
    total: 1,
  },
  {
    name: 'Parc du Grand Blottereau',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/2/25/Nantes_GrandBlottereau_jangseungSucheon.jpg',
    found: localStorage.getItem('totalBlotereau'),
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
    found: localStorage.getItem('totalBeaujoire'),
    total: 93,
  },
  {
    name: 'Cimetière Parc',
    photo:
      'https://jardins.nantes.fr/N/Jardin/Parcs-jardins/Plus/433/Cimetiere-Parc/photo/IMGP6027-js.jpg',
    found: localStorage.getItem('totalCimetiere'),
    total: 16,
  },
];

const PageProgress = () => {
  return (
    <div className="page-progress">
      <h2 className="progress-title">Progression par parc :</h2>
      <ProgressCircle />
      {apiMap.map((parc) => (
        <MapProgress
          namePark={parc.name}
          imgPark={parc.photo}
          totalPlantPark={parc.total}
          plantFound={parc.found}
        />
      ))}
    </div>
  );
};

export default PageProgress;
