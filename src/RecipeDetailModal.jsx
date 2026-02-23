import React from 'react';
import './RecipeDetailModal.css'; // We'll create this CSS file next

const RecipeDetailModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) {
    return null;
  }

  const { recipe, type } = content;

  // Helper to parse preparation instructions, which might be a string or an array
  const getPreparationSteps = () => {
    const instructions = recipe.RecipeInstructions;
    if (!instructions) return [];
    if (Array.isArray(instructions)) return instructions;
    if (typeof instructions === 'string') {
      // Handles R-style string c("step1", "step2")
      if (instructions.startsWith('c(')) {
        return instructions
          .replace(/^c\(|\)$/g, '')
          .split(/",\s*"/)
          .map(item => item.replace(/"/g, ''));
      }
      // Handles a simple string with newlines
      return instructions.split('\n').filter(line => line.trim() !== '');
    }
    return [];
  };

  const preparationSteps = getPreparationSteps();

  return (
    // The overlay closes the modal when clicked
    <div className="modal-overlay" onClick={onClose}>
      {/* This prevents clicks inside the modal from closing it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {type === 'nutrition' && (
          <div>
            <h3 className='nut'>Nutritional Info for {recipe.Name}</h3>
            <ul>
              <li><strong>Calories:</strong> {recipe.Calories || 'N/A'} kcal</li>
              <li><strong>Protein:</strong> {recipe.ProteinContent || 'N/A'} g</li>
              <li><strong>Carbohydrates:</strong> {recipe.CarbohydrateContent || 'N/A'} g</li>
              <li><strong>Fat:</strong> {recipe.FatContent || 'N/A'} g</li>
              <li><strong>Sugar:</strong> {recipe.SugarContent || 'N/A'} g</li>
              <li><strong>Sodium:</strong> {recipe.SodiumContent || 'N/A'} mg</li>
              <li><strong>Saturated Fat:</strong> {recipe.SaturatedFatContent || 'N/A'} g</li>
              <li><strong>Cholesterol:</strong> {recipe.CholesterolContent || 'N/A'} mg</li>
            <li><strong>Fiber:</strong> {recipe.FiberContent || 'N/A'} g</li>
            </ul>
          </div>
        )}

        {type === 'preparation' && (
          <div>
            <h3 className='prep'>Preparation for {recipe.Name}</h3>
            {preparationSteps.length > 0 ? (
              <ol>
                {preparationSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>Preparation instructions are not available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailModal;