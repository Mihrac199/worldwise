import styles from "./CountryItem.module.css"


export default function CountryItem({ country }) {

  const [emoji, flag] = country;

  return (

    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{flag}</span>
    </li>

  )

}