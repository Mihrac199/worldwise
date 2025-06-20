/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem"
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from "../contexts/CitiesContext"


// eslint-disable-next-line react/prop-types
export default function CountryList() {

     const { cities, isLoading } = useCities();

     if (isLoading) {
          return <Spinner />
     }

     if (!cities.length) {
          return <Message message={"Add Your First City By a City On The Map"} />
     }


     const seen = new Set();
     for (const city of cities) {

          const key = `${city.emoji} ${city.country}`;

          if (!seen.has(key)) {
               seen.add(key);
          }

     }
     const setCountries = [...seen];
     const countries = [];
     const parsedData = setCountries.map(data => {
          const [emoji, country] = data.split(" ");
          countries.push([emoji, country]);
     })


     return (

          <ul className={styles.countryList}>
               {countries.map((country) => (<CountryItem country={country} key={country} />
               ))}
          </ul>

     )

}