import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "tachyons";
import * as L from "leaflet";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

function App() {

  const IconStyleOne = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png'
});
  const IconStyleTwo = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
});


  const [spot, setSpot] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] =useState([]);
  const [cls, setCls] = useState('btn btn-warning');
  const [buttonText, setButtonText] = useState("Add me to favorite!")
  // const [marker, setMarker] = useState([45.9432, 24.9668]);
  const [icon, setIcon] = useState(IconStyleTwo);



  useEffect(()=>{
    async function fetchData() {
      const kiteSpots = await axios.get('https://62376095b08c39a3af7fdb55.mockapi.io/spot')
        .then(response => {
          setSpot(response.data)
          }).catch((err) => {
            console.log(err)
          })
        
      const favorites = await axios.get('https://62376095b08c39a3af7fdb55.mockapi.io/favourites')
        .then(response => {
          setFavorite(response.data)
          }).catch((err) => {
            console.log(err)
          })
        }
      fetchData();
    },[]);


    const handleChange = event => {
      setSearchTerm(event.target.value);
    };

    // const addMarker = event => {
    //   console.log('click');
     
    // }

    React.useEffect(() => {
      const results = spot.filter(spot => {
        return spot.country.toLowerCase().includes(searchTerm)
      });
      setSearchResults(results);
    }, [searchTerm]);


    const addToFavorite = id => {
      if (!favorite.includes(id)) setFavorite(favorite.concat(id));
      };
      
      let findfavorite = spot.filter(spot => favorite.includes(spot.id));
      console.log(findfavorite);


    const removeFavorite = id => {
      let index = favorite.indexOf(id);
      console.log(index);
      let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
      setFavorite(temp);
    };
    

    const changeIconColor = (icon) => {
      if (icon.iconUrl === 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png') {
        setIcon(IconStyleTwo);
      } else {
        setIcon(IconStyleOne);
      }
    };



 return (

  <div>
 

    <div className ='dropdown'>

      
        <DropdownButton variant='warning'id="dropdown-basic-button" title="Favorites" >
        {findfavorite.map(spot => <Dropdown.Item key = {spot.id}>{spot.name} <button onClick={() =>{removeFavorite(spot.id)}}>Remove</button></Dropdown.Item>)}
        </DropdownButton>
    </div>

    


    <MapContainer center={[45.9432, 24.9668]}  zoom={3} scrollWheelZoom={true}>
     <TileLayer
    attribution='&copy; <a href="https://www.opensteetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {spot.map(spot => (
    <Marker key = {spot.id} position={[Number(spot.lat), Number(spot.long)]} icon={icon} >
      <Popup position={[Number(spot.lat), Number(spot.long)]}>
        <div>
            <h1>Country: {spot.country}</h1>
            <h1>Wind: {spot.probability}</h1>
            <h1>Best Month: {spot.month}</h1> 
            
            <button className={cls} 
              onClick ={ () => {
                addToFavorite(spot.id); 
                changeIconColor(icon);
                setCls((cls) => (cls === 'btn btn-warning' ? 'btn btn-danger' : 'btn btn-warning'));
                setButtonText(text => (text === "Add me to favorite!" ? "Remove from favorites" : "Add me to favorite!"));}}> {buttonText}
            </button>
        </div>
      </Popup>
    </Marker>
  ))}

</MapContainer>
    
      
    
    <div className="table-responsive-md">
    <h2>Locations</h2>
  <p>Type something in the input field to search the table for country:</p> 
  <input className="form-control" id="myInput" type="text" placeholder="Search.."
  value={searchTerm} onChange={handleChange} /> 
        <table className="table table-bordered table-striped">
            <thead>
                <tr className="col-md-10 padding-0 text-center">
                    <th>Name</th>
                    <th>Country</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Wind.Prob.</th>
                    <th>Best time to go</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {spot && searchResults.map(spot => (
                <tr key={spot.id}>
                <td>{spot.name}</td>
                <td>{spot.country}</td>
                <td>{spot.lat}</td>
                <td>{spot.long}</td>
                <td>{spot.probability}</td>
                <td>{spot.month}</td>
                </tr>
                ))}
                </tbody>
        </table>
    </div>
</div>
  );
}

export default App;