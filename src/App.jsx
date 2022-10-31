import './App.css'
import Weathermap from './components/weathermap'
import climatime from './components/video/climatime.mp4.mp4'
import { useEffect, useState } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <div className="App">
      {
        loading? 
        
        <PropagateLoader
        color={"#8c00c1"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
       />
        :
        <>
        <video autoPlay loop muted>
          <source src={climatime} type="video/mp4"/>
        </video>
        <Weathermap/>
        </>
      }
    </div>
  )
}

export default App
