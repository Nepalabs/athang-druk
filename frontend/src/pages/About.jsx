import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
 <div>
     <nav className="navbar">
        <div className="logo">Druk Food Recipe</div>
        <div className="nav-right">
           <Link to="/login" className="logout-button">
           Login
          </Link>
        </div>
      </nav>
    <div className="about-container">
        
      <h1>About Druk Food Recipe</h1>
      <p>
        Druk Food Recipe is your go-to platform for exploring authentic Bhutanese cuisine. 
        Our goal is to preserve and share traditional recipes passed down through generations, 
        while also embracing modern culinary twists.
      </p>
      <p>
        Whether you're a seasoned cook or just getting started, our curated recipes, tips, 
        and community support will help you on your culinary journey.
      </p>
    </div>
    </div>
  );
  
};


export default About;
