import React, { useEffect, useState } from "react";
import Button from "./button.jsx"
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Hero = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // Set loaded state for animation
        setIsLoaded(true);
    }, []);
    
    const scrollToJobDescription = () => {
        // Find the job description element
        const jobDescriptionElement = document.getElementById('job-description-section');
        if (jobDescriptionElement) {
            // Smooth scroll to the element
            jobDescriptionElement.scrollIntoView({ behavior: 'smooth' });
            
            // Add a highlight effect
            jobDescriptionElement.classList.add('highlight-section');
            
            // Remove the highlight effect after animation completes
            setTimeout(() => {
                jobDescriptionElement.classList.remove('highlight-section');
            }, 1500);
        }
    };
    
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[70vh] py-12 sm:py-16 w-full overflow-hidden bg-[#ECF0F1] px-4 sm:px-6">
            {/* Content container */}
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
                {/* Left side text content */}
                <div 
                    className="max-w-lg order-2 md:order-1 text-center md:text-left"
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                    }}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-4 sm:mb-6 ">
                        AI-Powered Interview Simulator
                        
                    </h1>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2C3E50] mb-4 sm:mb-6">
                        We help you{" "}   
                        <ReactTyped
                            strings={["grow faster.", "build smarter.", "gain confidence."]}
                            typeSpeed={80}
                            backSpeed={40}
                            loop
                        />
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10">
                        
                        Practice your technical and behavioral interviews with AI-driven insights.
                        Get real-time feedback and ace your next job interview!
                    </p>
                    <Button 
                        onClick={scrollToJobDescription}
                        className="text-base sm:text-lg font-medium rounded-md"
                    >
                        Start Practicing for Free
                    </Button>
                </div>
                
                {/* Right side illustration */}
                <div 
                    className="flex items-center justify-center order-1 md:order-2"
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? 'translateX(0)' : 'translateX(20px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                    }}
                >
                    <div className="relative w-[300px] h-[220px] sm:w-[390px] sm:h-[250px] lg:w-[500px] lg:h-[350px]">
                        {/* Background shape */}
                        <div className="absolute inset-0 bg-[#E6F3FC] rounded-full"></div>
                        
                        {/* Illustration content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Table */}
                                <rect x="200" y="350" width="400" height="20" rx="2" fill="#2B4570" />
                                <rect x="210" y="370" width="10" height="100" rx="2" fill="#2B4570" />
                                <rect x="580" y="370" width="10" height="100" rx="2" fill="#2B4570" />
                                
                                {/* Left person (interviewer) */}
                                <ellipse cx="300" cy="290" rx="60" ry="70" fill="#3F88C5" />
                                <circle cx="300" cy="230" r="40" fill="#FFC857" />
                                <rect x="270" y="320" width="60" height="140" rx="20" fill="#333333" />
                                
                                {/* Right person (interviewee) */}
                                <ellipse cx="500" cy="290" rx="60" ry="70" fill="#E94F37" />
                                <circle cx="500" cy="230" r="40" fill="#FFC857" />
                                <rect x="470" y="320" width="60" height="140" rx="20" fill="#044389" />
                                
                                {/* Laptop */}
                                <rect x="250" y="320" width="100" height="60" rx="5" fill="#E63946" />
                                <rect x="280" y="340" width="40" height="20" rx="2" fill="white" />
                                
                                {/* Books/papers */}
                                <rect x="380" y="320" width="30" height="10" rx="1" fill="#F77F00" />
                                <rect x="380" y="335" width="30" height="10" rx="1" fill="#3A86FF" />
                                <rect x="380" y="350" width="30" height="10" rx="1" fill="#06D6A0" />
                                
                                {/* Plant */}
                                <rect x="150" y="420" width="30" height="40" rx="1" fill="#073B4C" />
                                <ellipse cx="165" cy="390" rx="25" ry="15" fill="#06D6A0" />
                                <ellipse cx="165" cy="375" rx="20" ry="12" fill="#06D6A0" />
                                <ellipse cx="165" cy="360" rx="15" ry="10" fill="#06D6A0" />
                                
                                {/* Clock */}
                                <circle cx="165" cy="180" r="30" fill="white" stroke="#073B4C" strokeWidth="5" />
                                <line x1="165" y1="180" x2="165" y2="160" stroke="#073B4C" strokeWidth="3" />
                                <line x1="165" y1="180" x2="180" y2="180" stroke="#073B4C" strokeWidth="3" />
                            </svg>
                        </div>
                        {/* <img 
                        src={heroImage} 
                        alt="Interview illustration" 
                        className="max-w-[550px] h-auto rounded-2xl shadow-md"
                    /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;
