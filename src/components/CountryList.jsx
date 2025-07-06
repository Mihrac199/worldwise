import Spinner from "./Spinner"
import Message from "./Message"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem"

export default function CountryList({ cities, isLoading }) {

     const countriesSet = new Set();
     const result = [...countriesSet];
     for (const city of cities) {
          const key = `${city.emoji} ${city.country}`;
          if (!countriesSet.has(key)) countriesSet.add(key);
     }
     console.log(result);

     if (!cities.length) {
          return <Message message="Add Your First City By Clicking On a City On The Map." />
     }

     if (isLoading) {
          return <Spinner />
     }

     return (

          <ul className={styles.countryList}>
               {result.map(country => <CountryItem country={country} key={country.id} />)}
          </ul>

     )

}