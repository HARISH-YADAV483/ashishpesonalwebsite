import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  const [backendMessage, setBackendMessage] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5005'
        const response = await axios.get(`${apiUrl}/api/test`)
        setBackendMessage(response.data.message)
      } catch (error) {
        console.error('Error fetching data from backend:', error)
        setBackendMessage('Failed to connect to  to backend')
      }
    }
    fetchMessage()
  }, [])


  //   useEffect(() => {
  //   const fetchMessage = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/test');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setBackendMessage(data.message);

  //     } catch (error) {
  //       console.error('Error fetching data from backend:', error);
  //       setBackendMessage('Failed to connect to backend');
  //     }
  //   };

  //   fetchMessage();
  // }, []);

  return (
    <>



      <p>Backend Status: <strong>{backendMessage}</strong></p>


    </>
  )
}

export default App
