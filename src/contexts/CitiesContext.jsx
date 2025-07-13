import { useContext } from "react"
import { createContext, useState, useEffect } from "react"
import { BASE_URL, ROUTE_CİTİES } from "../_config"

const CitiesContext = createContext();

export function CitiesProvider({ children }) {

     const [cities, setCities] = useState([]);
     const [isLoading, setİsLoading] = useState(false);
     const [currentCity, setCurrentCity] = useState({});

     useEffect(function () {

          async function fetchCities() {
               try {
                    setİsLoading(true);
                    const res = await fetch(`${BASE_URL}/${ROUTE_CİTİES}`);
                    const data = await res.json();
                    setCities(data);
               } catch {
                    alert("There was an error loading data...");
               } finally {
                    setİsLoading(false);
               }
          }

          fetchCities();

     }, [])

     async function getCity(id) {
          try {
               setİsLoading(true);
               const res = await fetch(`${BASE_URL}/${ROUTE_CİTİES}/${id}`);
               const data = await res.json();
               setCurrentCity(data);
          } catch {
               alert("There was an error loading data...");
          } finally {
               setİsLoading(false);
          }
     }

     async function createCity(newCity) {
          try {
               setİsLoading(true);
               const res = await fetch(`${BASE_URL}/${ROUTE_CİTİES}`, {
                    method: "POST",
                    body: JSON.stringify(newCity),
                    headers: {
                         "Content-Type": "application/json"
                    },
               });
               const data = await res.json();
               setCities(cities => [...cities, data]);
          } catch {
               alert("There was an error loading data...");
          } finally {
               setİsLoading(false);
          }
     }

     return (

          <CitiesContext.Provider value={{
               cities,
               isLoading,
               currentCity,
               getCity,
               createCity
          }}>
               {children}
          </CitiesContext.Provider>

     )

}

export function useCities() {

     const context = useContext(CitiesContext);
     if (context === undefined) throw new Error("Cities Provider The Outside.")
     return context;

}