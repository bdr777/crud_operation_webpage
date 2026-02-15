import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {getApi} from "./api/PostApi.jsx"
import Posts from './components/Posts.jsx'

function App() {

  return (
    <>
    <section className='main-section'>
      <Posts/>
    </section>
     
    </>
  )
}

export default App
