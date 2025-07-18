import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCities } from "../contexts/CitiesContext"
import { formatDateV2 } from "../_config"
import BackButton from "./BackButton"
import Spinner from "./Spinner"
import styles from "./City.module.css"

export default function City() {

  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(function () {
    getCity(id)
  }, [getCity, id]);
  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />

  return (

    <div className={styles.city}>

      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDateV2(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>

    </div>

  )

}