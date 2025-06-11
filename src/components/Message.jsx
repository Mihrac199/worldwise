import styles from "./Message.module.css";


// eslint-disable-next-line react/prop-types
export default function Message({ message }) {

  return (

    <p className={styles.message}>
      <span role="img">👋</span>  {message}
    </p>

  )

}