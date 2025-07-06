import Spinner from "./Spinner"
import Message from "./Message"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem"

export default function CountryList({ cities, isLoading }) {

     if (!cities.length) {
          return <Message message="Add Your First City By Clicking On a City On The Map." />
     }

     if (isLoading) {
          return <Spinner />
     }

     const countries = [];
     for (const country of cities) {
          const result = `${country.emoji} ${country.country}`;
          if (!countries.includes(result)) countries.push(result);
     }

     return (

          <ul className={styles.countryList}>
               {countries.map(country => <CountryItem country={country} key={country.split(" ")[0]} />)}
          </ul>

     )

}