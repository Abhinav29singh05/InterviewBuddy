import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewAPI } from './services/api';

import './jobDescriptionUpload.css';

const JobDescriptionUpload = ({ setQuestions }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setJobDescription(value);
    setCharCount(value.length);
  };

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description!');
      return;
    }

    try {
      setUploadStatus('Submitting...');
      const response = await interviewAPI.generateQuestions(jobDescription);
      
      if (!response.data || !response.data.questions) {
        throw new Error('Invalid response format - missing questions');
      }
      
      let processedQuestions = response.data.questions;
      
      if (processedQuestions.length === 1 && 
          typeof processedQuestions[0] === 'string' && 
          processedQuestions[0].trim().startsWith('[') && 
          processedQuestions[0].trim().endsWith(']')) {
        try {
          const parsed = JSON.parse(processedQuestions[0]);
          if (Array.isArray(parsed)) {
            processedQuestions = parsed;
          }
        } catch (e) {
          console.error('Failed to parse question JSON:', e);
        }
      }
      
      setUploadStatus('Submission successful!');
      navigate('/questions', {
        state: {
          questions: processedQuestions,
          jobDescription: jobDescription.toUpperCase()
        }
      });
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setUploadStatus('Submission failed.');
      alert('Failed to generate questions. Please try again.');
    }
  };

  const sampleDescriptions = [
    "Full Stack Developer with 3+ years experience in React and Node.js",
    "UX Designer proficient in Figma and Adobe Creative Suite",
    "Data Scientist with expertise in machine learning and Python"
  ];

  const selectSampleDescription = (sample) => {
    setJobDescription(sample);
    setCharCount(sample.length);
  };
  
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  return (
    <div id="job-description-section" className="max-w-3xl my-8 mx-auto px-6 py-10 bg-[#d9e7e3] rounded-xl shadow-lg scroll-mt-16 transition-all duration-300">
      <div className="relative mb-6">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#16A085] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-center text-[#2C3E50] mb-4">Customize Your Interview</h1>
      
      <p className="text-center text-gray-600 mb-6">
        Enter your job description or skills to generate tailored interview questions
      </p>
      
      <div className="mb-6 mx-auto">
        <textarea
          value={jobDescription}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085] min-h-[12rem]"
          placeholder="Enter job description here..."
        />
        
        <div className="flex justify-between mt-2 text-sm">
          <button 
            onClick={toggleTips} 
            className="text-[#16A085] hover:text-[#2C3E50] transition-colors"
          >
            Show tips
          </button>
          <span className="text-gray-500">{charCount} characters</span>
        </div>
        
        {showTips && (
          <div className="mt-2 p-3 bg-[#f0f9f6] rounded-lg text-sm text-gray-700">
            <p>Tips for better results:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Include specific technical skills required</li>
              <li>Mention years of experience if relevant</li>
              <li>Add information about industry or company type</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <p className="text-gray-600 mb-2">Or select a sample job description:</p>
        <div className="flex flex-wrap gap-2">
          {sampleDescriptions.map((desc, index) => (
            <button
              key={index}
              onClick={() => selectSampleDescription(desc)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 truncate"
            >
              {desc.length > 40 ? desc.substring(0, 37) + '...' : desc}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-[#1abc9c] to-[#2980b9] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
        >
          Generate Interview Questions
        </button>
      </div>
      
      {uploadStatus && (
        <p className="mt-4 text-center text-sm font-medium text-gray-600">{uploadStatus}</p>
      )}
    </div>
  );
};

export default JobDescriptionUpload;