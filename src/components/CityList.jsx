/* eslint-disable react/prop-types */
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';


// eslint-disable-next-line react/prop-types
export default function CityList({ cities, isLoading }) {

     if (isLoading) {
          return <Spinner />
     }

     if (!cities.length) {
          return <Message message={"Add Your First City By a City On The Map"} />
     }

     return (

          <ul className={styles.cityList}>
               {cities.map((city) => (<CityItem city={city} key={city.id} />
               ))}
          </ul>

     )

}