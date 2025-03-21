import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState }  from 'react';

import HomePage from '../pages/HomePage.jsx';
import Projects from '../pages/Projects.jsx';
import Skills from '../pages/Skills.jsx';
import About from '../pages/About.jsx';
import NavBar from './NavBar.jsx';
import Footer from '../pages/Footer.jsx';
import Contact from '../pages/Contact.jsx';


//import '../../output.css';



const MyRoutes = () => {
  return (
    <>
    <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />      
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Footer" element={<Footer/>} />
            </Routes>
    </Router>
    </>
  );
};

export default MyRoutes;