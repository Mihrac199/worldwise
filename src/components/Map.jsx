import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { useCities } from "../contexts/CitiesContext"
import { useGeolocation } from "../hooks/useGeoLocation"
import { useUrlPosition } from "../hooks/useUrlPosition"
import Button from "./Button"
import styles from "./Map.module.css"

export default function Map() {

     const { cities } = useCities();

     const {
          isLoading: isLoadingPosition,
          position: geoLocationPosition,
          getPosition
     } = useGeolocation();

     const [mapLat, mapLng] = useUrlPosition();

     const [mapPosition, setMapPosition] = useState([39.1667, 35.6667]);

     useEffect(function () {
          if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
     }, [mapLat, mapLng])

     useEffect(function () {
          if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
     }, [geoLocationPosition])

     return (

          <div className={styles.mapContainer} >

               {!geoLocationPosition &&
                    <Button type="position" onClick={getPosition} >
                         {isLoadingPosition ? "Loading..." : "Use Your Position"}
                    </Button>
               }

               <MapContainer
                    className={styles.map}
                    center={mapPosition}
                    zoom={6}
                    scrollWheelZoom={true}>

                    <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />

                    {cities.map(city => (

                         <Marker
                              position={[city.position.lat, city.position.lng]}
                              key={city.id}>

                              <Popup>

                                   <span>{city.emoji}</span>
                                   <span>{city.cityName}</span>

                              </Popup>

                         </Marker>

                    ))}

                    <ChangeCenter position={mapPosition} />
                    <DeteckClick />

               </MapContainer>

          </ div>

     )

}

function ChangeCenter({ position }) {

     const map = useMap();
     map.setView(position);
     return null;

}

function DeteckClick() {

     const navigate = useNavigate();

     useMapEvents({
          click: e => {
               navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
          }
     })

}