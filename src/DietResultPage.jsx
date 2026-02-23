import React, { useState } from 'react'; // 👈 1. Import useState
import './DietResultPage.css';
import { useLocation, Link } from "react-router-dom";
import RecipeDetailModal from './RecipeDetailModal'; // 👈 2. Import the new modal component

const DietResultPage = () => {
  const location = useLocation();
  const { responseData } = location.state || {};
  const recipes = responseData ? responseData.slice(0, 5) : [];

  // 👇 3. Add state to manage the modal
  const [modalContent, setModalContent] = useState(null); // This will store { recipe, type }
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal with specific content
  const handleShowDetails = (recipe, type) => {
    setModalContent({ recipe, type });
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="diet-container">
      <h1 className="main-heading">Your Personalized Diet Plan</h1>

      <div className="sections-wrapper">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => {
            // ... (your ingredient parsing logic remains the same)
            let ingredientsArray = [];
            if (Array.isArray(recipe.RecipeIngredientParts)) {
              ingredientsArray = recipe.RecipeIngredientParts;
            } else if (typeof recipe.RecipeIngredientParts === "string") {
              ingredientsArray = recipe.RecipeIngredientParts
                .replace(/^c\(|\)$/g, '')
                .split(/,\s*/)
                .map(item => item.replace(/"/g, ''));
            }

            return (
              <div key={recipe.RecipeId || index} className="diet-section">
                <h2>{recipe.Name || `Food ${index + 1}`}</h2>
                {/* ... other details like Category, Cook Time, Ingredients */}
                <p><strong>Recipe Category:</strong> {recipe.RecipeCategory || 'N/A'}</p>

                <p><strong>Cook Time:</strong> {recipe.CookTime ? recipe.CookTime.slice(2) : 'N/A'}</p>
                <div>
                  <h4>Ingredients:</h4>
                  <ul>
                    {ingredientsArray.length > 0 ? (
                      ingredientsArray.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))
                    ) : (
                      <li>Not available</li>
                    )}
                  </ul>
                </div>
                <p><strong>Calories:</strong> {recipe.Calories || 'N/A'} kcal</p>

                {/* 👇 4. Update buttons with onClick handlers */}
                <div className="button-group">
                  <button 
                    className="btn nutrition-btn" 
                    onClick={() => handleShowDetails(recipe, 'nutrition')}
                  >
                    <strong>Nutritional Values</strong>
                  </button>
                  <button 
                    className="btn prep-btn" 
                    onClick={() => handleShowDetails(recipe, 'preparation')}
                  >
                    <strong>Preparation</strong>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No recipes available.</p>
        )}
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="reset-btn">Start Over</button>
      </Link>

      {/* 👇 5. Render the modal component conditionally */}
      <RecipeDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={modalContent}
      />
    </div>
  );
};

export default DietResultPage;