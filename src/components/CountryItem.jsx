/* eslint-disable react/prop-types */
import styles from "./CountryItem.module.css";


// eslint-disable-next-line react/prop-types
export default function CountryItem({ country }) {

  const [emoji, flag] = country;

  return (

    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{flag}</span>
    </li>

  )

}