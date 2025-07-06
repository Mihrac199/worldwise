import Logo from "./Logo"
import AppNav from "./AppNav"
import styles from "./Sidebar.module.css"
import { Outlet } from "react-router-dom"

export default function Sidebar() {

     return (

          <div className={styles.sidebar}>

               <Logo />
               <AppNav />

               <Outlet />

               <footer className={styles.footer}>

                    <p className={styles.copyright}>
                         &copy; Copyright by <b>Mihraç Comart.</b>
                    </p>

               </footer>

          </div>

     )

}