import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faXmark, faCode, faEnvelope, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";
import AnuragImg from "../assets/Anurag.jpg";
import AbhinavImg from "../assets/Abhinav.jpg";

const About = () => {
    const navigate = useNavigate();
    const [copiedEmails, setCopiedEmails] = useState({});

    const copyEmailToClipboard = (email, memberId) => {
        navigator.clipboard.writeText(email)
            .then(() => {
                // Set this specific email as copied
                setCopiedEmails({
                    ...copiedEmails,
                    [memberId]: true
                });
                
                // Reset the copied state after 2 seconds
                setTimeout(() => {
                    setCopiedEmails({
                        ...copiedEmails,
                        [memberId]: false
                    });
                }, 2000);
            })
            .catch(err => {
                console.error('Could not copy email: ', err);
                alert('Failed to copy email. Please try again.');
            });
    };

    const teamMembers = [
        {
            id: 1,
            name: "Anurag Kumar",
            role: "Developer",
            image: AnuragImg,
            email: "anurag1892000@gmail.com",
            linkedin: "https://www.linkedin.com/in/kumar--anurag/",
            github: "https://github.com/AnuragKumar007",
            leetcode: "https://leetcode.com/AnuragKumar007/" 
        },
        {
            id: 2,
            name: "Abhinav Singh",
            role: "Developer",
            image: AbhinavImg,
            email: "abhinav09singh08@gmail.com",
            linkedin: "http://www.linkedin.com/in/abhinav-singh29",
            github: "https://github.com/Abhinav29singh05",
            leetcode: "https://leetcode.com/u/Abhinav4229/"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2C3E50]/5 to-[#16A085]/5">
            <Navbar />
            
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-5xl font-bold text-center text-[#2C3E50] mb-6">About Us</h1>
                <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
                    We're on a mission to revolutionize interview preparation using artificial intelligence.
                    Our platform helps candidates practice and improve their interview skills with real-time feedback.
                </p>
            </div>

            

            {/* Team Section */}
            <div className="container mx-auto px-4 ">
                <h2 className="text-3xl font-bold text-center text-[#2C3E50] mb-12">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105">
                            <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{member.name}</h3>
                            <p className="text-gray-600 mb-4">{member.role}</p>
                            <div className="flex justify-center space-x-4">
                                <a href={member.linkedin} className="text-[#2C3E50] hover:text-[#16A085]" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                                </a>
                                <a href={member.github} className="text-[#2C3E50] hover:text-[#16A085]" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} size="lg" />
                                </a>
                                <a href={member.leetcode} className="text-[#2C3E50] hover:text-[#16A085]" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faCode} size="lg"/>
                                </a>
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        copyEmailToClipboard(member.email, member.id);
                                    }}
                                    className="text-[#2C3E50] hover:text-[#16A085] cursor-pointer border-none bg-transparent p-0"
                                    title={copiedEmails[member.id] ? "Email copied!" : `Copy ${member.name}'s email`}
                                >
                                    <FontAwesomeIcon 
                                        icon={copiedEmails[member.id] ? faCheck : faEnvelope} 
                                        size="lg"
                                        className={copiedEmails[member.id] ? "text-green-500" : ""}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="mx-auto bg-white/10 shadow-black/35 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-6">
                            We believe everyone deserves a fair chance at their dream job. Our AI-powered
                            interview simulator provides personalized feedback and helps candidates build
                            confidence through practice.
                        </p>
                        <p className="text-gray-600">
                            By leveraging cutting-edge AI technology, we're making professional interview
                            preparation accessible to everyone, regardless of their background or experience.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;