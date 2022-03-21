import React,{useState,useEffect} from 'react';
import './App.css';

function FetchSpot() {
  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('https://62376095b08c39a3af7fdb55.mockapi.io/spot'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className="App">
     {
       data && data.length>0 && data.map((item)=><p>{item.about}</p>)
     }
    </div>
  );
}

export default FetchSpot;