import React from "react";
import "./Aboutus.css";

const Aboutus = ({ isopen, setopen }) => {
  if (!isopen) return null;

  return (
    <div className="modal-overlayy">
      <div className="modal-contentt">
        {/* 🔹 Close Button */}
        <button onClick={() => setopen(false)} className="modal-close-btnn">
          X
        </button>

        {/* 🔹 Title */}
        <h1>Diet Recommendation System</h1>
        <p>
          We used <strong>K-Nearest Neighbors (KNN)</strong> model in Machine
          Learning (Scikit-learn) to suggest suitable food items or meal plans
          based on a user’s nutritional needs and preferences. The KNN algorithm
          is a similarity-based model that recommends foods by finding items in
          the dataset that are nutritionally similar to the user’s ideal nutrient
          profile (based on calorie, protein, fat, and carbohydrate requirements).
        </p>

        {/* 🔹 How it Works */}
        <h2>How it Works:</h2>
        <ul>
          <li>
            <strong>Input:</strong> User provides details such as age, weight,
            height, activity level, and dietary goal (e.g., weight loss or gain).
          </li>
          <li>
            <strong>Data Preparation:</strong> Nutritional data of various food
            items is normalized and scaled using Scikit-learn’s preprocessing tools.
          </li>
          <li>
            <strong>Model:</strong>
            <ul>
              <li>
                The KNN algorithm (from <code>sklearn.neighbors</code>) computes the
                distance between the user’s nutritional needs and food items in the
                dataset.
              </li>
              <li>
                It selects the <em>k-nearest food items</em> with the most similar
                nutritional values.
              </li>
            </ul>
          </li>
          <li>
            <strong>Output:</strong> The system recommends top food items or meals
            best suited to the user’s dietary requirements.
          </li>
        </ul>

        {/* 🔹 Technologies Used */}
        <h2>Technologies Used:</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js, HTML, CSS</li>
          <li><strong>Backend:</strong> Flask (Python)</li>
          <li><strong>Machine Learning:</strong> Python, Scikit-learn</li>
          <li><strong>Data:</strong> Nutritional databases for food items</li>
        </ul>

        {/* 🔹 Team Members */}
        <h2>Team Members:</h2>
        <ul>
          <li>
            <strong>T Jaswanth — 23L31A05N7</strong>
          </li>
          <li>S Rupa — 23L31A05K6</li>
          <li>V Sowjanya — 23L31A05P3</li>
          <li>V Tejaswani — 23L31A05NP5</li>
        </ul>
      </div>
    </div>
  );
};

export default Aboutus;