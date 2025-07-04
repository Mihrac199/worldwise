import { NavLink } from "react-router-dom"
import PageNav from "../components/PageNav"
import AppNav from "../components/AppNav"

export default function Homepage() {

     return (

          <div>
               Homepage
               <PageNav />
               <AppNav />
               <NavLink to="/app">Go To The App</NavLink>
          </div>

     )

}