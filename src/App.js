// import '../node_modules/leaflet/dist/leaflet.css'
// import '../node_modules/leaflet/dist/leaflet'
import './App.css';
import { MapContainer, Marker, Popup, useMapEvent, useMapEvents } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import CustMarker from './Marker/Marker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import InputSelect from './InputSelect/InputSelect';
import Button from './Button/Button';
import haversineDistance from 'haversine-distance';
import { LatLng, LatLngBounds } from 'leaflet';


function App() {

  const originalCenter = [51.505, -0.09];
  const padding = [50, 50]

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


  const extraLocation = {
    id: 4,
    name: 'collège des Bernardins',
    description: `Résidence des moines cisterciens étudiants à l'université de Paris du XIIIe siècle à la Révolution Française`,
    position: [48.84886516046273, 2.3520445289133405],
    isVisited: true
  }

 
  // const [currentMarkers, setCurrentMarkers] = useState([]);

 
  const [arrayOfLocations1, setArrayofLocations1] = useState(objectCollection1.slice());
  const [arrayOfLocations2, setArrayofLocations2] = useState(objectCollection2.slice());
  const [currentLocationList, setCurrentLocationList] = useState(arrayOfLocations1);
  const [currentBounds, setCurrentBounds] = useState(null);
  const [currentMapCenter, setCurrentMapCenter] = useState(null);
  const [menuValue, setMenuValue] = useState(0);



useEffect(() => {
  setMenuValue('1')
  setCurrentLocationList(arrayOfLocations1);
  setCurrentBounds(setBounds(arrayOfLocations1))
  setCurrentMapCenter(setCenter(arrayOfLocations1));
}, [])

useEffect(() => {
  switch (menuValue){
    case '1':
      setCurrentLocationList(arrayOfLocations1.slice());
      
      break;
    case '2':
      setCurrentLocationList(arrayOfLocations2.slice());
      break;
    default:
      break;
  }
}, [menuValue])

useEffect(() => {
  setCurrentBounds(setBounds(currentLocationList));
  setCurrentMapCenter(setCenter(currentLocationList));
}, [currentLocationList])
  //calculs de l'harversine
  // const a = objectCollection1[0].position;
  // const b = objectCollection1[1].position;
  // console.log(haversineDistance(a, b));  //OK

  //trouver les 2 points les plus éloignés parmi les 3



  function setBounds(anyCollection) {
    let corner1 = ''
    let corner2 = ''
    let maxDistance = 0;
    for (let index = 0; index < anyCollection.length; index++) {
      const a = anyCollection[index];
      for (let index = 0; index < anyCollection.length; index++) {
        const b = anyCollection[index];
        let distance = haversineDistance(a.position, b.position);
        if (distance >= maxDistance) {
          maxDistance = distance;
          corner1 = a.position;
          corner2 = b.position;
        }
      }
    }
    // console.log(maxDistance);
    const bounds = new LatLngBounds(corner1, corner2)
    // console.log(bounds);
    return bounds;

  }


  //calcul OK (enfin!!!)
  // setBounds(objectCollection1);
  // setBounds(objectCollection2);



  //obtenir le point central d'une collection d'objet
  function setCenter(anyCollection) {
    if (!anyCollection || anyCollection.length === 0) {
      return new LatLng(originalCenter);
    }
    else {
      const boundsObject = setBounds(anyCollection);
      const center = boundsObject.getCenter();
      return center;
    }
  }


  // function FlyToBounds(anyCollection) {
  //   const map = useMap();
  //   if (anyCollection.length === 0) {
  //     map.flyToBounds(setBounds(objectCollection1));
  //   }
  //   else {
  //     map.flyToBounds(setBounds(anyCollection));
  //   }
  //   return;

  // }

  function FlyTo() {
    const map = useMap();
    if (currentMapCenter == null) {
      map.flyTo(setCenter(arrayOfLocations1));
    }
    else {
      map.flyTo(setCenter(currentLocationList));
      return;
    }
  }
 
  function FlyToBounds() {
    const map = useMap();
    
    if(currentBounds == null){
      map.flyToBounds(setBounds(arrayOfLocations1), {padding : [20, 20], maxZoom : 15});
    }
    else{
      map.flyToBounds(currentBounds, {padding : [20, 20], maxZoom : 15});

    }



  }

  // function getLocationListCenter(locationArray) {
  //   if (locationArray.length === 0) {
  //     return;
  //   }
  //   else {
  //     const center = locationArray.find(elt => elt.id === 1).position;
  //     return center;
  //   }
  // }

  function MapLocationsArray() {
    if (!currentLocationList || currentLocationList.length === 0) {
      return;

    }
    else {
      const mappedArray = currentLocationList.map(elt => <CustMarker key={elt.id} name={elt.name} position={elt.position} description={elt.description} isVisited={elt.isVisited}></CustMarker>);
      return (mappedArray);
    }

  }


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





  function handleValueChange(e) {
    console.log(`current locationlist id = ${e.target.value}`);
    setMenuValue(e.target.value)



    setCurrentBounds(setBounds(currentLocationList));

  }
  //ajoute ou retire la colonne de la déesse comme objet visité

  function visitMonument(e) {
    const copyOf1 = arrayOfLocations1.slice();
    copyOf1.find(elt => elt.id == e.target.id).isVisited = !copyOf1.find(elt => elt.id == e.target.id).isVisited;
    setArrayofLocations1(copyOf1);
    setCurrentLocationList(arrayOfLocations1);
    setMenuValue('1');

  }

  //ajoute ou retire le lieu supp de la deuxieme liste 

  function addOrRemoveLocation() {
    
    
    const index = arrayOfLocations2.indexOf(arrayOfLocations2.find(elt => elt.id === extraLocation.id));
    if (index === -1) {
      arrayOfLocations2.push(extraLocation);
      setArrayofLocations2(arrayOfLocations2);
    }
    else {
      arrayOfLocations2.splice(index, 1);
      setArrayofLocations2(arrayOfLocations2);
    }
    setCurrentLocationList(arrayOfLocations2);
    setMenuValue('2');


  }

  return (
    <div className="App">
      <InputSelect handleValueChange={handleValueChange} defaultValue={menuValue}/>
      <span><Button onClick={visitMonument} id={1} texte='ajout colonne dans visités' /></span>
      <span><Button onClick={addOrRemoveLocation} texte='ajout lieu bonus dans liste 2' /></span>
      <MapContainer center={currentMapCenter}  scrollWheelZoom={false} className='leaflet-wrapper' bounds={currentBounds ? currentBounds : setBounds(arrayOfLocations1)} boundsOptions = {{padding : [20, 20], maxZoom : 9}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        
        <LocationMarker />
        <MapLocationsArray locationArray = {currentLocationList}/>
       <FlyToBounds/>
      </MapContainer>



    </div>
  );
}

export default App;
