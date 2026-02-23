import React from 'react'
import Homepage from './Homepage'
import { Routes,Route } from 'react-router-dom'
import HealthForm from './HealthForm'
import LoadingSpinner from './LoadingSpinner'
import DietResultPage from './DietResultPage'
import Homepagerupa from './Homepagerupa'

function App() {
  return (
    <div >
      {/* <Homepagerupa/> */}
      
      <Routes>
        <Route path="" element={<Homepage/>}/>
        <Route path="/form" element={<HealthForm/>}/>
        <Route path="/result" element={<DietResultPage/>}/>
      </Routes>

    </div>
  )
}
export default App
