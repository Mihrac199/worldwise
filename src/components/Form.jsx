import { useState, useEffect } from "react"
import { useCities } from "../contexts/CitiesContext"
import { useUrlPosition } from "../hooks/useUrlPosition"
import { BASE_URL_GEOCODİNG, convertToEmoji } from "../_config"
import Button from "./Button"
import BackButton from "./BackButton"
import Message from "./Message"
import Spinner from "./Spinner"
import styles from "./Form.module.css"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function Form() {

  const [lat, lng] = useUrlPosition();

  const { createCity } = useCities();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setİsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocoddingError] = useState("");

  useEffect(function () {

    if (!lat && !lng) return;

    async function fetchCityData() {

      try {
        setİsLoadingGeocoding(true);
        setGeocoddingError("");

        const res = await fetch(`${BASE_URL_GEOCODİNG}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("That Doesn't Seem To Be a City. Click Somewhere Else...");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

      } catch (err) {

        setGeocoddingError(err.message);

      } finally {

        setİsLoadingGeocoding(false);

      }

    }

    fetchCityData();

  }, [lat, lng])

  if (!lat && !lng) return <Message message="Start By Clicking Somewhere On The Map." />

  if (isLoadingGeocoding) return <Spinner />

  if (geocodingError) return <Message message={geocodingError} />

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date || !notes) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    };

    createCity(newCity);

  }

  return (

    <form className={styles.form} onSubmit={handleSubmit}>

      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={date => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>

    </form>

  )

}