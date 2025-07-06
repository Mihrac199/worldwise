import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { BASE_URL, ROUTE_CİTİES } from "./_config"
import Homepage from "./pages/Homepage"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"

export default function App() {

  const [cities, setCities] = useState([]);
  const [isLoading, setİsLoading] = useState(false);

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

  return (

    <BrowserRouter>
      <Routes>

        <Route index element={<Homepage />} />

        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />

        <Route path="app" element={<AppLayout />} >

          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<p>List of Form</p>} />

        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>

  )

}