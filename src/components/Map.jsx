import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import { useUrlPosition } from '../hooks/useUrlPosition'
import Button from "./Button"
import styles from './Map.module.css'


export default function Map() {

     const [mapPosition, setMapPosition] = useState([40, 0]);
     const { cities } = useCities();
     const {
          isLoading: isLoadingPosition,
          position: geolocationPosition,
          getPosition,
     } = useGeolocation();
     const [mapLat, mapLng] = useUrlPosition();


     useEffect(function () {
          if (mapLat && mapLng) {
               setMapPosition([mapLat, mapLng])
          }
     }, [mapLat, mapLng])


     useEffect(function () {
          if (geolocationPosition) {
               setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
          }
     }, [geolocationPosition])


     return (

          <div className={styles.mapContainer}>

               {!geolocationPosition && <Button
                    type="position"
                    onClick={getPosition} >
                    {isLoadingPosition ? "Loading..." : "Use Your Position"}
               </Button>}

               <MapContainer
                    className={styles.map}
                    center={mapPosition}
                    zoom={12}
                    scrollWheelZoom={true}>

                    <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />

                    {cities.map(city => (
                         <Marker position={[city.position.lat, city.position.lng]}
                              key={city.id}>
                              <Popup>
                                   <span>{city.emoji}</span>
                                   <span>{city.cityName}</span>
                              </Popup>
                         </Marker>
                    ))}

                    <ChangeCenter position={mapPosition} />
                    <DetectClick />
               </MapContainer>

          </div>

     )

}


function ChangeCenter({ position }) {
     const map = useMap();
     map.setView(position);
     return null;
}


function DetectClick() {
     const navigate = useNavigate();
     useMapEvent({
          click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
     })
}