import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Contact from './components/home'
import Admin from './components/Admin'
import Hobbies from './components/Hobbies'
import Education from './components/education'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Sport from './components/sport'
import Gaming from './components/gaming'
import Travel from './components/travel'
import { API_URL } from './config'

function App() {

  const [backendMessage, setBackendMessage] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/test`, {
          headers: { 'ngrok-skip-browser-warning': '69420' }
        })
        setBackendMessage(response.data.message)
      } catch (error) {
        console.error('Error fetching data from backend:', error)
        setBackendMessage('Failed to connect to backend')
      }
    }
    fetchMessage()
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/educ" element={<Education />} />
        <Route path="/sport" element={<Sport />} />
        <Route path="/game" element={<Gaming />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
