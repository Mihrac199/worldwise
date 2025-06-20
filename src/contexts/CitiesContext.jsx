import { createContext, useContext, useState, useEffect } from "react"
import { BASE_URL, URL_ROUTE } from "../components/_config"


const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
export function CitiesProvider({ children }) {

     const [cities, setCities] = useState([]);
     const [isLoading, setİsLoading] = useState(false);
     const [currentCity, setCurrentCity] = useState({});

     useEffect(function () {

          async function fetchCities() {

               try {

                    setİsLoading(true);
                    const res = await fetch(`${BASE_URL}/${URL_ROUTE}`);
                    const data = await res.json();
                    setCities(data);

               } catch {

                    alert("There was a API error.");

               } finally {

                    setİsLoading(false);

               }

          }

          fetchCities();

     }, [])


     async function getCity(id) {

          try {

               setİsLoading(true);
               const res = await fetch(`${BASE_URL}/${URL_ROUTE}/${id}`);
               const data = await res.json();
               setCurrentCity(data);

          } catch {

               alert("There was a API error.");

          } finally {

               setİsLoading(false);

          }



     }


     return (

          <CitiesContext.Provider value={{
               cities,
               isLoading,
               getCity,
               currentCity
          }}>{children}</CitiesContext.Provider>

     )

}


export function useCities() {
     const context = useContext(CitiesContext);
     if (context === undefined) {
          throw new Error("Outside the Provider");
     }
     return context;
}