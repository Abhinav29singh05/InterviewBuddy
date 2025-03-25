import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecordingComponent from './recordingComponent';
import axios from 'axios';

const Questions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processedQuestions, setProcessedQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordings, setRecordings] = useState({}); // Store recordings for each question
  const [isComplete, setIsComplete] = useState(false); // Track if all questions are answered
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  // Process questions when they are received
  useEffect(() => {
    const rawQuestions = location.state?.questions || [];
    let processed = [];
    
    if (Array.isArray(rawQuestions)) {
      processed = rawQuestions.map(q => {
        if (typeof q === 'string' && q.trim().startsWith('[') && q.trim().endsWith(']')) {
          try {
            const parsed = JSON.parse(q);
            if (Array.isArray(parsed)) {
              return parsed;
            }
          } catch (e) {
            // If parsing fails, just use the string as is
          }
        }
        return q;
      });
      
      processed = processed.flat();
    } else if (typeof rawQuestions === 'string') {
      if (rawQuestions.trim().startsWith('[') && rawQuestions.trim().endsWith(']')) {
        try {
          const parsed = JSON.parse(rawQuestions);
          if (Array.isArray(parsed)) {
            processed = parsed;
          } else {
            processed = [rawQuestions];
          }
        } catch (e) {
          processed = [rawQuestions];
        }
      } else {
        processed = [rawQuestions];
      }
    }
    
    setProcessedQuestions(processed);
  }, [location.state]);

  // Handle recording completion for a question
  const handleRecordingComplete = (questionIndex, recordingData) => {
    setRecordings(prev => ({
      ...prev,
      [questionIndex]: recordingData
    }));
    
    // Check if all questions have recordings
    const updatedRecordings = {
      ...recordings,
      [questionIndex]: recordingData
    };
    
    // Check if all questions have been answered
    const allQuestionsAnswered = processedQuestions.every((_, index) => 
      updatedRecordings[index] !== undefined && updatedRecordings[index] !== null
    );
    
    setIsComplete(allQuestionsAnswered);
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentIndex < processedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to handle interview completion and send recordings for analysis
  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      // Format recordings data properly
      const formattedRecordings = Object.keys(recordings).map(index => ({
        questionIndex: parseInt(index),
        question: processedQuestions[parseInt(index)],
        transcript: recordings[index].transcript || '',
        timestamp: recordings[index].timestamp
      }));

      // Get job description from location state
      // Get job description from location state which should be passed from jobDescriptionUpload.jsx
      // when navigating to this page. If not found, try to get it from the questions array
      const jobDescription = location.state?.jobDescription || location.state?.questions?.jobDescription;
      if (!jobDescription) {
        console.warn('No job description found in location state');
      }

      // Prepare data for analysis
      const interviewData = {
        questions: processedQuestions.map((q, index) => ({
          text: q,
          index: index
        })),
        recordings: formattedRecordings,
        jobDescription: jobDescription // Include job description in interviewData
      };
      
      // Log the data that will be sent for analysis
      // console.log('Interview data for analysis:', interviewData);
      
      // Navigate to analytics page with interview data
      navigate('/analytics', { 
        state: { 
          interviewData,
          questions: processedQuestions,
          jobDescription: jobDescription || "Please provide a job description" // More informative default
        } 
      });
      
    } catch (error) {
      console.error('Error submitting interview data:', error);
      alert('Failed to submit interview data. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Technical Interview Questions</h1>
        
        {processedQuestions.length > 0 ? (
          <>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentIndex + 1} of {processedQuestions.length}</span>
                <span>{Math.round(((currentIndex + 1) / processedQuestions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / processedQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question card */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl text-gray-800 font-medium mb-4">
                {processedQuestions[currentIndex]}
              </h2>
              
              {/* Recording status */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  recordings[currentIndex] 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {recordings[currentIndex] ? 'Answer Recorded' : 'Waiting for Answer'}
                </span>
              </div>
              
              {/* Recording Component - Pass the current recording if it exists */}
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <RecordingComponent
                  questionIndex={currentIndex}
                  onRecordingComplete={handleRecordingComplete}
                  initialRecording={recordings[currentIndex]}
                />
              </div>
            </div>

            {/* Navigation and completion controls */}
            <div className="flex justify-between items-center gap-4">
              <button 
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
                  ${currentIndex === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'}`}
                onClick={prevQuestion}
                disabled={currentIndex === 0}
              >
                ← Previous
              </button>

              {currentIndex === processedQuestions.length - 1 ? (
                <button 
                  className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
                    ${!isComplete 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : isSubmitting
                        ? 'bg-green-400 text-white cursor-wait'
                        : 'bg-green-600 text-white hover:bg-green-700'}`}
                  onClick={handleComplete}
                  disabled={!isComplete || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Analysis'}
                </button>
              ) : (
                <button 
                  className="px-6 py-2 rounded-lg font-medium transition-colors duration-200
                    bg-blue-600 text-white hover:bg-blue-700"
                  onClick={nextQuestion}
                >
                  Next →
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">
            No questions available. Please go back and submit a job description.
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
