// import '../node_modules/leaflet/dist/leaflet.css'
// import '../node_modules/leaflet/dist/leaflet'
import './App.css';
import { MapContainer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { map } from 'leaflet';
import { useEffect, useState } from 'react';
import CustMarker from './Marker/Marker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import InputSelect from './InputSelect/InputSelect';
import useStateWithCallback from 'use-state-with-callback';



function App() {
  const originalCenter = [51.505, -0.09];

  //liste des objets-lieux
  const objectCollection1 = [
    {
      id: 1,
      name: 'Colonne de la Déesse',
      position: [50.6369366517151, 3.063490037406473],
      description: 'Mémorial du siège de 1792 comportant une colonne, une statue et une fontaine sur la place centrale de Lille.',
      isVisited: false,
    },
    {
      id: 2,
      name: 'Palais Rihour',
      position: [50.63570195566506, 3.061510040608146],
      description: `Reste d'un palais du XVe siècle construit par les ducs de Valois-Bourgogne. La salle des gardes abrite actuellement l'office de tourisme de la ville de Lille.`,
      isVisited: true,
    },
    {
      id: 3,
      name: 'Citadelle de Lille',
      position: [50.64127169325102, 3.0445382402090404],
      description: `Une citadelle du XVIIe siècle conçue par l'architecte Vauban sous le règne de Louis XIV.`,
      isVisited: true,

    }]

  const objectCollection2 = [{
    id: 1,
    name: 'Maison Nicolas Flamel',
    position: [48.86359998933198, 2.353202428760771],
    description: 'La plus ancienne maison de Paris, construite en 1407',
    isVisited: true,
  },
  {
    id: 2,
    name: 'La tour Jean Sans Peur',
    position: [48.86437864249199, 2.348052369392547],
    description: `Une tour de défense bâtie entre 1409 et 1411 par le duc Jean Ier de Bourgogne, dit 'Jean Sans Peur'. `,
    isVisited: false,
  },
  {
    id: 3,
    name: 'cloître et église des Billettes',
    position: [48.85799202756769, 2.3549306294748455],
    description: `Eglise luthérienne possédant un cloître d'architecture gothique édifié en 1427.`,
    isVisited: true,
  },
  ]



  function mapLocationsArray(locationArray) {
    const mappedArray = locationArray.map(elt => <CustMarker key={elt.id} name={elt.name} position={elt.position} description={elt.description} isVisited={elt.isVisited}></CustMarker>);
    return (
      mappedArray
    );
  }



  // const [displayedMarkers, setDisplayedMarkers] = useStateWithCallback(

  //   //initial state
  //   {
  //   activeCollectionID: 1,
  //   selectedCollection : objectCollection1,
  //   showMarkers : mapLocationsArray(objectCollection1)},


  //   //callback effect
  //   displayedMarkers => {
  //     switch (displayedMarkers.activeCollectionID) {
  //       case 1:
  //         setDisplayedMarkers(prevValues => {
  //           return {...prevValues, selectedCollection : objectCollection1, showMarkers : mapLocationsArray(objectCollection1)}
  //         })
  //         break;
  //       case 2:
  //         setDisplayedMarkers(...prevValues => {
  //           return {... prevValues, selectedCollection : objectCollection2, showMarkers : mapLocationsArray(objectCollection2)}
  //         })
  //         break;
  //       default:
  //         break;
  //     }

  //   });

  const [activeCollectionID, setActiveCollectionID] = useState(1);


  const initMarkers = {
    selectedCollection: objectCollection1,
    showMarkers: mapLocationsArray(objectCollection1),
  }


  const [displayedMarkers, setDisplayedMarkers] = useState(initMarkers);

  // const [selectedCollection, setSelectedCollection] = useState(null);
  // const [showMarkers, setShowMarkers] = useState(null);

  // const [activeCollectionID, setActiveCollectionID] = useState(null);

  function handleValueChange(e) {
    setActiveCollectionID(e.target.value);
    console.log(`event triggered ${activeCollectionID}`);
  }

  useEffect(() => {
    setDisplayedMarkers( () => {
      switch (activeCollectionID) {
        case 1:
          displayedMarkers.selectedCollection = objectCollection1;
          displayedMarkers.showMarkers = mapLocationsArray(objectCollection1);
          break;
        case 2:
          displayedMarkers.selectedCollection = objectCollection2;
          displayedMarkers.showMarkers = mapLocationsArray(objectCollection2);
          break;
        default:
          break;
      }
    }
    )

  }, [activeCollectionID])



  // !! ne passer uniquement que des variables d'état (states) en dépendances de useEffect()







  const objectAsJSX = objectCollection1.map(elt => <CustMarker key={elt.id} name={elt.name} position={elt.position} description={elt.description} isVisited={elt.isVisited}></CustMarker>)


  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        let latlng = e.latlng
        setPosition(latlng);
        console.log(`${latlng}`);
      }
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Latitude = {position.lat.toFixed(5)}, Longitude = {position.lng.toFixed(5)}</Popup>
      </Marker>
    )
  }

  return (
    <div className="App">
      <InputSelect handleValueChange={handleValueChange} />
      <MapContainer center={

        displayedMarkers ? displayedMarkers.selectedCollection.find(elt => elt.id === 1).position :
          originalCenter} zoom={15} scrollWheelZoom={false} className='leaflet-wrapper'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />
        {displayedMarkers.showMarkers}
      </MapContainer>



    </div>
  );
}

export default App;
