import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is Interview Buddy?",
      answer: "Interview Buddy is an AI-powered platform designed to help you practice and improve your interview skills. Our service simulates real interview scenarios, provides instant feedback, and helps you build confidence for your job interviews."
    },
    {
      question: "How does the interview simulation work?",
      answer: "Our platform uses AI to create personalized interview scenarios based on the job description you provide. You'll be asked relevant questions that match the role you're applying for, and you can respond either by typing or speaking. The system then analyzes your responses and provides feedback on your answers, communication style, and overall performance."
    },
    {
      question: "Is Interview Buddy free to use?",
      answer: "Right now, it is free to use. We are working on adding more features and making it more useful for you."
    },
    {
      question: "Can I upload my resume or job description?",
      answer: "Not now, but we are working on it."
    },
    {
      question: "What types of interviews can I practice?",
      answer: "Our platform supports multiple interview formats including behavioral interviews, technical interviews for various roles, case interviews, and competency-based interviews. You can give the job description according to your needs."
    },
    {
      question: "How accurate is the AI feedback?",
      answer: "Our AI system has been trained on thousands of real interview scenarios and industry best practices. While no AI can perfectly replicate human judgment, our feedback system provides valuable insights on key aspects of your responses including relevance, clarity, structure, and content quality."
    },
    {
      question: "Can I review my past interview sessions?",
      answer: "Yes, all your practice sessions are saved in your profile. You can go back and review your responses, see your progress over time, and continue working on areas that need improvement."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. We take data privacy very seriously. Your interview responses, personal information, and account details are encrypted and securely stored. We do not share your information with third parties without your consent. Please see our Privacy Policy for more details."
    },
    {
      question: "How can I get help if I'm having technical issues?",
      answer: "You can reach our support team through the Contact Us page or by emailing support@interviewbuddy.com. We typically respond within 24 hours to all inquiries."
    },
    {
      question: "Can I use Interview Buddy on my mobile device?",
      answer: "Yes, our platform is fully responsive and works on desktops, laptops, tablets, and smartphones. Practice your interview skills anytime, anywhere!"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#34495E] mb-8 text-center">Frequently Asked Questions</h1>
        <p className="text-[#34495E] mb-10 text-center">
          Find answers to common questions about our interview preparation platform.
        </p>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="font-semibold text-[#34495E]">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-[#34495E] transform ${openItem === index ? "rotate-180" : ""} transition-transform duration-200`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItem === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-[#34495E]">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-[#34495E] mb-4">
            Still have questions? We're here to help!
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-[#34495E] hover:bg-[#2C3E50] text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ; 