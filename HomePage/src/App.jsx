import { useState } from 'react'
import "./App.css" 
import MarketingFooter from "./components/MarketingFooter.jsx"
import NavBar from './components/NavBar.jsx'
import Home from "./components/Home.jsx";
function App() {

  return (
    <div className="app-wrapper">

      <NavBar />

      <Home /> 

      <MarketingFooter />

    </div>
  );
}

export default App;
