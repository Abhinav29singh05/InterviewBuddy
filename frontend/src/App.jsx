import { useState } from 'react'
import './App.css'
import Navbar from './navbar'
import Hero from './hero'
import JobDescriptionUpload from './jobDescriptionUpload'
import HowHelpful from './howHelpful'
import FirstStep from './firstStep'
import Footer from './footer'
import FeedbackPopup from './feedbackPopup'
import GetSetUpskill from './getSetUpskill'
import Login from './Pages/login'
import Signup from './Pages/signup'
import About from './Pages/about'
import Contact from './Pages/contact'
import Questions from './Pages/questions'
import Analytics from './Pages/analytics'
import Privacy from './Pages/privacy'
import Terms from './Pages/terms'
import JobRoles from './Pages/jobRoles'
import FAQ from './Pages/faq'
import ScrollToTop from './Components/ScrollToTop'
import { Routes, Route, Navigate } from 'react-router-dom';

// Home component with all landing page sections
const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <JobDescriptionUpload/>
      <HowHelpful/>
      <GetSetUpskill/>
      <FirstStep/>
      <FeedbackPopup/>
      <Footer/>
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/questions" element={<Questions/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/job-roles" element={<JobRoles/>} />
        <Route path="/faq" element={<FAQ/>} />
        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
