import React from "react";
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import * as L from "leaflet";


export default function AddNewMarker() {

    const IconStyleOne = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png'
      });

const [marker, setMarker] = useState<any|null>([])
    
 const map =  useMapEvents({
    click(e) {
      marker.push(e.latlng);
      map.flyTo(e.latlng, 6);
      setMarker((prevValue) => [...prevValue, e.latlng]);
    }
  });

    return (       
            <div>
                {marker.map((position => 
                    <Marker position={position} icon={IconStyleOne}> 
                        <Popup position={position}>
                            <button>Add new Spot</button>
                        </Popup>
                    </Marker>
                ))} 
            </div>

    );
}
