import React from 'react'
import { FileUploader } from './Components/FileUploader'

export const App = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1 className='app-title'>File Uploader</h1>
        <p className='app-subtitle'>Simple, fast, and secure</p>
      </header>
      <FileUploader/>
    </div>
  )
}