import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "tachyons";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

function App() {
  const [data, setData] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [cls, setCls] = useState('btn btn-warning');
  const [buttonText, setButtonText] = useState("Add me to favorite!")
  

  useEffect(()=>{
    async function fetchData() {
      const kiteSpots = await axios.get('https://62376095b08c39a3af7fdb55.mockapi.io/spot')
        .then(response => {
          setData(response.data)
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

    
    // const addToFavorite = favorite.map(dat => {
    //   console.log(dat.id);
    //   // if (!fav.includes(id)) setFav(fav.concat(id));
    // });

    const addToFavorite = id => {
      if (!favorite.includes(id)) setFavorite(favorite.concat(id));
      };
    
    
    // const removeFavorite = id => {
    //   let index = favorite.indexOf(id);
    //   console.log(index);
    //   let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    //   setFavorite(temp);
    // };

    let findfavorite = data.filter(spot => favorite.includes(spot.id));
    console.log(findfavorite);

 return (

  <div>

    <div className ='dropdown'>
        <DropdownButton variant='warning'id="dropdown-basic-button" title="Favorites">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    </div>


    <MapContainer center={[45.9432, 24.9668]} zoom={3} scrollWheelZoom={true}>
     <TileLayer
    attribution='&copy; <a href="https://www.opensteetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {data.map(data => (
    <Marker key = {data.id} position={[Number(data.lat), Number(data.long)]}>
      <Popup position={[Number(data.lat), Number(data.long)]}>
        <div>
            <h2>Spot</h2>
            <h3>Country: {data.country}</h3>
            <h3>Name: {data.name}</h3>
            <h3>Best Month: {data.month}</h3> 
            
            <button className={cls} 
              onClick = {() => {
                addToFavorite(data.id); 
                setCls((cls) => (cls === 'btn btn-warning' ? 'btn btn-danger' : 'btn btn-warning'));
                setButtonText(text => (text === "Add me to favorite!" ? "Remove Favorite" : "Add me to favorite!"));}}> {buttonText}
            </button>
        </div>
      </Popup>
    </Marker>
  ))}

</MapContainer>
    
      
    <div className='pa3 search'>
      <h3>Location</h3>
      <div>
		  <input className ='pa2 ba b--yellow bg-lightest-yellow' type='search' placeholder= 'Search' />
      </div>
      </div>

    <div className="table-responsive-md">
        <table className="table table-striped">
            <thead>
                <tr className="col-md-10 padding-0">
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
                { data.map(spot => (
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