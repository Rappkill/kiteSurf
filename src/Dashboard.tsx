import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import * as L from "leaflet";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "tachyons";
import { UserType } from './App';
import React from 'react';
import AddNewMarker from './Addmarker'


const API_URL = 'https://62376095b08c39a3af7fdb55.mockapi.io';

const IconStyleOne = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png'
});
const IconStyleTwo = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
});


const Dashboard = ({ user }: { user: UserType }) => {
  const [searchResults, setSearchResults] = useState<any>([]);
  const [cls] = useState('btn btn-warning');
  const [buttonText] = useState("Add me to favorite!")
  const [spot, setSpot] = useState<any>([]);
  const [favorite, setFavorite] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [icon] = useState(IconStyleTwo);
  

  useEffect(() => {
    /**
     * Fetch only if have user
     */
    if (user) {
      async function fetchData() {
        await axios.get(`${API_URL}/spot`)
          .then(response => {
            setSpot(response.data)
          }).catch((err) => {
            console.log(err)
          })

        await axios.get(`${API_URL}/favourites`)
          .then(response => {
            setFavorite(response.data)
          }).catch((err) => {
            console.log(err)
          })
      }
      fetchData();
    }
  }, [user]);


 const handleLogout = () => {
    localStorage.clear();
    window.location.href='./Login'
 };

 const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = spot.filter((spot: any) => {
      if (searchTerm) {
        return (spot.name.toUpperCase()).includes(searchTerm) 
          || (spot.name.toLowerCase()).includes(searchTerm) 
          || (spot.country.toLowerCase()).includes(searchTerm)
          || (spot.country.toUpperCase()).includes(searchTerm)
      } else {
        return spot.country || spot.name
      }
    });
     setSearchResults(results);
  }, [searchTerm, spot]);


 const addToFavorite = (id: any) => {
    if (!favorite.includes(id)) {
      setFavorite(favorite.concat(id));
    }};
    let findfavorite = spot.filter((spot: any) => favorite.includes(spot.id));


  const removeFavorite = (id: any) => {
    let index = favorite.indexOf(id);
    let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
      setFavorite(temp);
  };

  return (
    <div style={{ margin: 'auto', width: '80%' }}>

      <div className='dropdown'>
          <DropdownButton variant='warning' id="dropdown-basic-button" title="Favorites List">
              {findfavorite.map((spot: any) => 
                <Dropdown.Item key={spot.id}>{spot.name} 
                  <button onClick={() => {removeFavorite(spot.id)}}>Remove</button>
                </Dropdown.Item>
              )}
          </DropdownButton>
        <button style={{background:"grey"}} onClick={handleLogout}>Logout</button>
      </div>

      <MapContainer style={{ width: '100%', cursor:'pointer' }} center={[45.9432, 24.9668]} zoom={2} scrollWheelZoom={true} >
        <TileLayer
          attribution='&copy; <a href="https://www.opensteetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <div>
              {findfavorite.map((favorite : any)=> (
                <Marker key={favorite.id} position={[Number(favorite.lat), Number(favorite.long)]} icon={IconStyleOne} >
                  <Popup position={[Number(favorite.lat), Number(favorite.long)]}>
                      <h1>Country: {favorite.country}</h1>
                      <h1>Wind: {favorite.probability}km/h</h1>
                      <h1>Best Month: {favorite.month}</h1>
                      <button className='btn btn-danger' onClick ={() => {removeFavorite(favorite.id)}}>Remove from favorites</button>
                  </Popup>
                </Marker>
              ))};
            </div> 

            <div>
              {spot.map((spot: any) => (
                <Marker key={spot.id} position={[Number(spot.lat), Number(spot.long)]} icon={icon} >
                  <Popup position={[Number(spot.lat), Number(spot.long)]}>
                    <div>
                      <h1>Country: {spot.country}</h1>
                      <h1>Wind: {spot.probability}km/h</h1>
                      <h1>Best Month: {spot.month}</h1>
                      <button className={cls} onClick={() => {addToFavorite(spot.id)}}>{buttonText}</button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </div>
          <AddNewMarker />
        </MapContainer>

      <div className="table-responsive-md">
        <p>User has logged in as userId:{user.userId}</p>
          <h2>Locations</h2>
            <p>Type something in the input field to search the table for Country or Name:</p>
              <input className="form-control" id="myInput" type="text" placeholder="Search.." value={searchTerm} onChange={handleChange} />
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="col-md-5 padding-0 text-center">
              <th>Name</th>
              <th>Country</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Wind.Prob.</th>
              <th>Best time to go</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((spot: any) => (
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

export default Dashboard;