import { useState } from "react"
import { useEffect } from "react"
import { useCities } from "../contexts/CitiesContext"
import { useUrlPosition } from "../hooks/useUrlPosition"
import { BASE_URL_2 } from "./_config"
import Message from "./Message"
import Spinner from "./Spinner"
import styles from "./Form.module.css"
import Button from "./Button"
import BackButton from "./BackButton"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom"


export function convertToEmoji(countryCode) {

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);

}


export default function Form() {

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [emoji, setEmoji] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setİsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(function () {

    async function fetchCityData() {

      try {
        setİsLoadingGeoCoding(true);

        const res = await fetch(`${BASE_URL_2}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error("That Doesn't Seem To Be a City. Click Somewhere Else...");
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

      } catch (err) {

        setGeoCodingError(err.message);

      } finally {

        setİsLoadingGeoCoding(false);

      }

    }

    fetchCityData();

  }, [lat, lng])


  if (isLoadingGeoCoding) return <Spinner />


  if (!lat && !lng) return <Message message="Start By Clicking Somewhere On The Map" />


  if (geoCodingError) return <Message message={geoCodingError} />


  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date || !notes) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }

    await createCity(newCity);
    navigate("/app/cities")
  }


  return (

    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>

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
          dateFormat="dd/MM/yyyy" />

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