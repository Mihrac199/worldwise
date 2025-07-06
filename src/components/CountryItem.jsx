import styles from "./CountryItem.module.css"

export default function CountryItem({ country }) {

  const [emoji, countryName] = country;

  return (

    <li className={styles.countryItem}>

      <span>{emoji}</span>
      <span>{countryName}</span>

    </li>

  )

}