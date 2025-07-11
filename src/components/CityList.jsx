import { useCities } from "../contexts/CitiesContext"
import Spinner from "./Spinner"
import Message from "./Message"
import styles from "./CityList.module.css"
import CityItem from "./CityItem"

export default function CityList() {

     const { cities, isLoading } = useCities();

     if (!cities.length) {
          return <Message message="Add Your First City By Clicking On a City On The Map." />
     }

     if (isLoading) {
          return <Spinner />
     }

     return (

          <ul className={styles.cityList}>
               {cities.map(city => <CityItem city={city} key={city.id} />)}
          </ul>

     )

}