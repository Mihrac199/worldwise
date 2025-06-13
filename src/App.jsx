import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import { BASE_URL, URL_ROUTE } from "./components/_config";
import CountryList from "./components/CountryList";
import City from "./components/City";


export default function App() {

  const [cities, setCities] = useState([]);
  const [isLoading, setİsLoading] = useState(false);

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

  return (

    <BrowserRouter>

      <Routes>

        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />

        <Route path="app" element={<AppLayout />}>

          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities/:id' element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<p>Form</p>} />

        </Route>

        <Route path="*" element={<PageNotFound />} />

      </Routes>

    </BrowserRouter >

  )

}