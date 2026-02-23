import React from 'react'
import './Homepage.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineInfoCircle } from "react-icons/ai";
import Aboutus from './Aboutus';
function Homepage() {
  const [open, setopen] = useState(false);




  return (
    <div>
      <button className="about" onClick={() => {
        setopen(true);
      }}>
      <AiOutlineInfoCircle size={25} />
      </button>
    <div className="container">
      <h1 className="title">Diet Recommendation System</h1>
      <Link to="/form">
      <button className="btn" >Get Diet</button>
      </Link>
    </div>
    <Aboutus isopen={open} setopen={setopen} />

    </div>




   
  )
}

export default Homepage
