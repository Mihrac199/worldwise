import { createContext, useContext, useState, useEffect } from "react"
import { BASE_URL, URL_ROUTE } from "../components/_config"


const CitiesContext = createContext();


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


     async function createCity(newCity) {

          try {

               setİsLoading(true);
               const res = await fetch(`${BASE_URL}/${URL_ROUTE}`, {
                    method: "POST",
                    body: JSON.stringify(newCity),
                    headers: {
                         "Content-Type": "application/json"
                    }
               });
               const data = await res.json();
               setCities(cities => [...cities, data]);

          } catch {

               alert("There was a creating error.");

          } finally {

               setİsLoading(false);

          }



     }


     async function deleteCity(id) {

          try {

               setİsLoading(true);
               await fetch(`${BASE_URL}/${URL_ROUTE}/${id}`, {
                    method: "DELETE"
               });
               setCities(cities => cities.filter(city => city.id !== id));

          } catch {

               alert("There was a deleting error.");

          } finally {

               setİsLoading(false);

          }



     }


     return (

          <CitiesContext.Provider value={{
               cities,
               isLoading,
               getCity,
               currentCity,
               createCity,
               deleteCity
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