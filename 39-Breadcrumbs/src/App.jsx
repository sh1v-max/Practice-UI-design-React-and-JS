import React from 'react'
import { Hello } from './Components/Hello'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import ProductDetails from './Components/ProductDetails'
import ProductListing from './Components/ProductListing'
import Breadcrumbs from './Components/Breadcrumbs'

export const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <h1>Breadcrumbs Store</h1>
        {/* <Hello/> */}
        <Breadcrumbs/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
