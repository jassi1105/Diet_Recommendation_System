import React, { useState } from 'react';
import './LoadingSpinner.css';
import { useEffect } from 'react';
import DietResultPage from './DietResultPage'
import { useNavigate } from 'react-router-dom';

const LoadingSpinner = (props) => {
  const navigate =useNavigate()
  const [result, setResult] = useState(null);

   const handledata = async () => {
    // Prevent the default form submission behavior

    // The data you want to send to the backend
    const dataToSend = props.data

    try {
      // Make the POST request to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server we're sending JSON
        },
        body: JSON.stringify(dataToSend), // Convert the JS object to a JSON string
      });

      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.json(); // Parse the JSON response from the server
        console.log('Success:', responseData);
        setResult(responseData)
        navigate("/result", { state: { responseData } })
        

        // alert(responseData.jassiage); // Show success message from the server
      } else {
        console.error('Server error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }




useEffect(()=>{
  handledata()

},[])









  return (
    <div className="spinner-overlay">
      <div className="loading-spinner"></div>
      {/* <h2>{props.data.goal}</h2> */}
    
    </div>
  );
};

export default LoadingSpinner;

