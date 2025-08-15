import React from 'react'
import { Hello } from './Components/Hello'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import ProductDetails from './Components/ProductDetails'
import ProductListing from './Components/ProductListing'
import Breadcrumbs from './Components/Breadcrumbs'
import './index.css'

export const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">🛒 RoadsideStore.com</h1>
          <p className="app-subtitle">Demonstrating Dynamic Breadcrumb Navigation</p>
        </header>
        {/* <Hello/> */}
        <Breadcrumbs/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2025 Build with React - By <a href="https://github.com/sh1v-max" target="_blank">Shiv</a></p>
        </footer>
      </div>
    </BrowserRouter>
  )
}