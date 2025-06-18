import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'


export default function Map() {

     const navigate = useNavigate();

     // eslint-disable-next-line no-unused-vars
     const [searchParams, setSearchParams] = useSearchParams();
     const lat = searchParams.get("lat");
     const lng = searchParams.get("lng");

     return (

          <div className={styles.mapContainer} onClick={() => navigate("form")}>
               <h1>Map</h1>
               <h1>
                    Position: lat = {lat} , lng = {lng}
               </h1>
               <button onClick={() => {
                    setSearchParams({ lat: 25, lng: 25 })
               }}>Change Position</button>
          </div>

     )

}