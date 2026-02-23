import React from 'react';
import './Homepagerupa.css';

const Homepagerupa = () => {
  return (
    <div>
      <nav>
        <a href="#" className="logo">NutriFit</a>
        <div className="bro">
          <a href="index.html">Home</a>
          <a href="#">Menu</a>
          <a href="#">Cart</a>
          <a href="about.html">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-text">
          <p style={{ fontStyle: 'italic' }}>
            "Small steps, big changes — start your healthy journey today! <br />
            Because your body deserves the best care and nutrition"
          </p>
          <button
            style={{
              fontSize: '30px',
              padding: '5px 15px',
              borderRadius: '13px',
              backgroundColor: '#6cc35184',
              border: 'none',
              marginTop: '10px',
            }}
          >
            <a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>
              Start Your Journey
            </a>
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <h2>Our Personalized Diet Plans Helped People To:</h2>

      <div className="top">
        <div className="benefits">
          <img
            src="https://media.istockphoto.com/id/1175380880/photo/young-slim-woman-tape-after-a-diet-with-accessory-in-sporty-gym-as-background.jpg?s=612x612&w=0&k=20&c=gnpokIUFWMfYagFETU8BwZxP4dHHlc-G_fkNuRCRbjg="
            alt="Weight Loss"
          />
          <p>Lose Belly Fat</p>
        </div>

        <div className="benefits">
          <img
            src="https://www.news-medical.net/images/Article_Images/ImageForArticle_87_16624303270304808.jpg"
            alt="Blood Pressure"
          />
          <p>Control Blood Pressure</p>
        </div>

        <div className="benefits">
          <img
            src="https://static.toiimg.com/thumb/msid-69477385,width-1280,height-720,resizemode-4/69477385.jpg"
            alt="Diabetes Control"
          />
          <p>Control Diabetes</p>
        </div>

        <div className="benefits">
          <img
            src="https://www.shutterstock.com/image-photo/woman-home-drinking-orange-flavored-600nw-1690737631.jpg"
            alt="Immunity Boost"
          />
          <p>Boost Immunity</p>
        </div>

        <div className="benefits">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM0LUKxnln8paHCak-44Oxb36wOVaBF84Bg&s"
            alt="Glowing Skin"
          />
          <p>Glowing Skin</p>
        </div>
      </div>
    </div>
  );
};

export default Homepagerupa;