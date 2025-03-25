import React, { useEffect, useState } from "react";
import Button from "./button.jsx"
import { useNavigate } from "react-router-dom";

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
        <div className="relative flex flex-col items-center justify-center h-[70vh] w-full overflow-hidden bg-gradient-to-br from-[#2C3E50]/90 via-[#16A085]/70 to-[#2C3E50]/90 px-6">
            {/* Animated background elements */}
            <div className="absolute w-full h-full">
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute bg-white/20 rounded-full blur-xl"
                        style={{
                            width: `${Math.random() * 200 + 100}px`,
                            height: `${Math.random() * 200 + 100}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2,
                            animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* 3D floating elements */}
            <div className="absolute w-full h-full pointer-events-none">
                <div 
                    className="absolute w-24 h-24 bg-[#34495E]/50 rounded-lg backdrop-blur-sm rotate-12 transition-all duration-300 ease-out border border-white/20"
                    style={{ 
                        top: '25%', 
                        left: '15%',
                        animation: 'float 15s ease-in-out infinite',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-out'
                    }}
                />
                <div 
                    className="absolute w-16 h-16 bg-[#16A085]/60 rounded-full backdrop-blur-sm transition-all duration-300 ease-out border border-white/20"
                    style={{ 
                        top: '60%', 
                        left: '20%',
                        animation: 'float 20s ease-in-out infinite',
                        animationDelay: '2s',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.8s ease-out'
                    }}
                />
                <div 
                    className="absolute w-20 h-20 bg-[#16A085]/50 rounded-lg backdrop-blur-sm -rotate-12 transition-all duration-300 ease-out border border-white/20"
                    style={{ 
                        top: '30%', 
                        right: '15%',
                        animation: 'float 18s ease-in-out infinite',
                        animationDelay: '1s',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.7s ease-out'
                    }}
                />
                <div 
                    className="absolute w-12 h-12 bg-[#34495E]/60 rounded-full backdrop-blur-sm transition-all duration-300 ease-out border border-white/20"
                    style={{ 
                        top: '70%', 
                        right: '25%',
                        animation: 'float 25s ease-in-out infinite',
                        animationDelay: '3s',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.9s ease-out'
                    }}
                />
            </div>
            
            {/* Content */}
            <div 
                className="relative z-10 flex flex-col items-center text-center"
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 1s ease-out, transform 1s ease-out'
                }}
            >
                <h1 className="text-5xl font-bold text-center text-white mb-2" style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
                    AI-Powered Interview Simulator
                </h1>
                <div className="w-32 h-1 bg-[#16A085] rounded-full my-4 shadow-lg"></div>
                <p className="text-xl text-center mt-4 max-w-2xl text-white font-medium" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)' }}>
                    Practice your technical and behavioral interviews with AI-driven insights.
                    Get real-time feedback and ace your next job interview!
                </p>
                <div className="mt-10 relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#16A085] to-[#34495E] rounded-lg blur opacity-80 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <Button 
                        children={"Start Practicing for Free"} 
                        onClick={scrollToJobDescription}
                        className={"relative px-10 py-3 text-white text-lg font-bold rounded-lg z-10 bg-gradient-to-r from-[#34495E] to-[#16A085] hover:from-[#16A085] hover:to-[#34495E] transition-all duration-300 shadow-xl"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero;
