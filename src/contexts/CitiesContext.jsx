import { createContext, useEffect, useReducer, useContext, useCallback } from "react"
import { BASE_URL, ROUTE_CİTİES } from "../_config"

const CitiesContext = createContext();

const initialState = {

     cities: [],
     isLoading: false,
     currentCity: {},
     error: "",

}
function reducer(state, action) {

     switch (action.type) {

          case "loading":
               return {
                    ...state,
                    isLoading: true,
               }

          case "rejected":
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload,
               }

          case "cities/loaded":
               return {
                    ...state,
                    isLoading: false,
                    cities: action.payload,
               }

          case "city/loaded":
               return {
                    ...state,
                    isLoading: false,
                    currentCity: action.payload,
               }

          case "city/created":
               return {
                    ...state,
                    isLoading: false,
                    cities: [...state.cities, action.payload],
                    currentCity: action.payload,
               }

          case "city/deleted":
               return {
                    ...state,
                    isLoading: false,
                    cities: state.cities.filter(city => city.id !== action.payload),
               }


          default: throw new Error("Unkown Action Type.");

     }

}

export function CitiesProvider({ children }) {

     const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

     useEffect(function () {

          async function fetchCities() {
               try {
                    dispatch({ type: "loading" });
                    const res = await fetch(`${BASE_URL}/${ROUTE_CİTİES}`);
                    const data = await res.json();
                    dispatch({ type: "cities/loaded", payload: data });
               } catch {
                    dispatch({ type: "rejected", payload: "There was an error loading cities..." });
               }
          }

          fetchCities();

     }, [])

     const getCity = useCallback(
          async function getCity(id) {
               try {
                    dispatch({ type: "loading" });
                    const res = await fetch(`${BASE_URL}/${ROUTE_CİTİES}/${id}`);
                    const data = await res.json();
                    dispatch({ type: "city/loaded", payload: data });
               } catch {
                    dispatch({ type: "rejected", payload: "There was an error loading city..." });
               }
          }, [])

     async function createCity(newCity) {
          try {
               dispatch({ type: "loading" });
               const res = await fetch(`${BASE_URL}/${ROUTE_CİTİES}`, {
                    method: "POST",
                    body: JSON.stringify(newCity),
                    headers: {
                         "Content-Type": "application/json"
                    },
               });
               const data = await res.json();
               dispatch({ type: "city/created", payload: data });
          } catch {
               dispatch({ type: "rejected", payload: "There was an error creating city..." });
          }
     }

     async function deleteCity(id) {
          try {
               dispatch({ type: "loading" });
               await fetch(`${BASE_URL}/${ROUTE_CİTİES}/${id}`, {
                    method: "DELETE",
               });
               dispatch({ type: "city/deleted", payload: id })
          } catch {
               dispatch({ type: "rejected", payload: "There was an error deleting city..." });
          }
     }

     return (

          <CitiesContext.Provider value={{
               cities,
               isLoading,
               currentCity,
               getCity,
               createCity,
               deleteCity
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