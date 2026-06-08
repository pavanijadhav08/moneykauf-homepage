import React, { useState } from "react";
import "./NavBar.css";
import { HelpCircle, Settings, Banknote, LogIn, X } from "lucide-react";
import { Users } from "lucide-react";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="#">Moneykauf</a>
          </div>

          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Sliding Menu */}
      <div className={`side-menu ${isOpen ? "open" : ""}`}>

        {/* Slider Heading */}
        <div className="slider-header">
          <h2>Moneykauf</h2>

          <X
            size={22}
            className="close-icon"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <ul className="menu-links">
          <li>
            <a href="#">
              <Settings size={20} />
              <span>How It Works</span>
            </a>
          </li>

          <li>
            <a href="#">
            <Banknote size={20} className="menu-icon" />
            <span>Pricing</span> 
            </a>
          </li>

          <li>

            <a href="#">
            <HelpCircle size={20} className="menu-icon" />
            <span>FAQ</span>
            </a>
          </li>
          <li>
            <a href="#">
            <Users size={20} />
           <span> AboutUs</span>
            </a>
          </li>

          <li>
            <a href="#">
            <LogIn size={20} className="menu-icon" />
             <span>Log In</span>
            </a>
          </li>

          <li>
            <button className="cta-btn">Get Started</button>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default NavBar;
