import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import "tachyons";
import List from "./searchBox";

function App() {
  const [data, setData] = useState([]);


  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  useEffect(()=>{
    async function fetchData() {
      const kiteSpots = await axios.get('https://62376095b08c39a3af7fdb55.mockapi.io/spot');
        setData(kiteSpots.data)
      }
      fetchData();
    },[]);

  
 return (

  <div>
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
            <button className='btn btn-warning'>Add me to favourites</button>
        </div>
      </Popup>
    </Marker>
  ))}

</MapContainer>
    
      
    <div className='pa3 search'>
      <h3>Location</h3>
      <div>
		  <input className ='pa2 ba b--yellow bg-lightest-yellow' type='search' placeholder= 'Search' onChange={inputHandler} />
      </div>
      <List input={inputText} />
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

