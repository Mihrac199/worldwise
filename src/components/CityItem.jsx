import { formatDateV1 } from "../_config"
import styles from "./CityItem.module.css"

export default function CityItem({ city }) {
     const { cityName, emoji, date } = city;

     return (

          <li className={styles.cityItem}>
               <span className={styles.emoji}>{emoji}</span>
               <h3 className={styles.name}>{cityName}</h3>
               <time className={styles.date}>{formatDateV1(date)}</time>
               <button className={styles.deleteBtn}>&times;</button>
          </li>

     )

}