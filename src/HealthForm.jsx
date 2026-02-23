import React, { useState } from 'react';
import './HealthForm.css';
import LoadingSpinner from './LoadingSpinner';

const HealthForm = () => {

  // State to hold all form data in a single object
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Female',
    height: '',
    weight: '',
    activity_level: 'Sedentary',
    goal: 'Lose Weight',
  });


  const [x,setx]=useState(false)

  // A single handler to update the state for any input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    console.log('Form Submitted!', formData);
    setx(true)
    // {<LoadingSpinner data={formData}/>}

    // Here you would typically send the data to a server or process it further
  };

  return (
    <div>
      {!x && <div className="form-container">
      <h2>Fill Your Details📋</h2>
      <form onSubmit={handleSubmit}>
        {/* Age Input */}
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g., 25"
            required
          />
        </div>

        {/* Gender Select */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Height Input */}
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="e.g., 170"
            required
          />
        </div>

        {/* Weight Input */}
        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="e.g., 65"
            required
          />
        </div>

        {/* Activity Level Select */}
        <div className="form-group">
          <label htmlFor="activityLevel">Activity Level</label>
          <select
            id="activityLevel"
            name="activity_level"
            value={formData.activity_level}
            onChange={handleChange}
          >
            <option value="Sedentary">Sedentary (little or no exercise)</option>
            <option value="Lightly Active">Lightly Active (light exercise/sports 1-3 days/week)</option>
            <option value="Moderately Active">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
            <option value="Very Active">Very Active (hard exercise/sports 6-7 days a week)</option>
            
          </select>
        </div>

        {/* Goal Select */}
        <div className="form-group">
          <label htmlFor="goal">Your Goal</label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >
            <option value="Lose Weight">Lose Weight</option>
            <option value="Maintain Weight">Maintain Weight</option>
            <option value="Gain Weight">Gain Weight</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Generate
        </button>
        
        

        
      </form>
      </div> }

    
      {x && <LoadingSpinner data={formData}/>}
    
    
    </div>
  );
};

export default HealthForm;