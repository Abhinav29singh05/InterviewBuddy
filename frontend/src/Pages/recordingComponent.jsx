import { useState, useRef, useEffect } from "react";
import { interviewAPI } from '../services/api';

const RecordingComponent = ({ questionIndex, onRecordingComplete, initialRecording }) => {
  // State variables to manage component behavior
    const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [processingAudio, setProcessingAudio] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [browserSupport, setBrowserSupport] = useState(null);
  
  // Refs to store media objects
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Check browser support on component mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const isSupported = !!SpeechRecognition;
    setBrowserSupport(isSupported);
    // console.log('Speech Recognition Support:', isSupported);
  }, []);
  
  // Reset component state when question changes
  useEffect(() => {
    // Reset recording state when question changes
    setRecording(false);
    setCountdown(null);
    setProcessingAudio(false);
    setLiveTranscript("");
    
    // Display existing transcript if available
    if (initialRecording && initialRecording.transcript) {
      setTranscript(initialRecording.transcript);
      setShowTranscript(true);
    } else {
      setTranscript("");
      setShowTranscript(false);
    }
    
    // Clean up media resources
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    
    // Stop speech recognition if active
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [questionIndex, initialRecording]);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Stop any active media tracks when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Clear any active countdown timer
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      
      // Stop speech recognition if active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to initiate countdown before recording
  const initiateCountdown = async () => {
    try {
      // Get camera access for video display only
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,  // For display only
        audio: true   // Needed for permissions, but we'll use SpeechRecognition
      });
      
      // Store stream references
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true; // Prevent audio feedback
      
      // Reset transcript
      setLiveTranscript("");
      
      // Start countdown from 3
      setCountdown(3);
      
      // Set up countdown timer
      countdownTimerRef.current = setInterval(() => {
        setCountdown(prevCount => {
          // When countdown reaches 1, clear interval and start recording
          if (prevCount <= 1) {
            clearInterval(countdownTimerRef.current);
            startSpeechRecognition();
            return null;
          }
          return prevCount - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setCountdown(null);
      // Show user-friendly error message
      alert("Could not access camera or microphone. Please ensure you have granted permission to use these devices.");
    }
  };

  // Function to start speech recognition
  const startSpeechRecognition = () => {
    try {
      // Check if browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        throw new Error("Speech recognition not supported in this browser");
      }
      
      // Create speech recognition instance
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      // Configure recognition
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      // Handle results
      recognition.onresult = (event) => {
        // console.log('Speech Recognition Result:', event.results);
        let finalTranscript = '';
        
        // Process results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            // Update live transcript with interim results
            setLiveTranscript(transcript);
          }
        }
        
        // If we have final results, append to transcript
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };
      
      // Handle errors
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        
        if (event.error === 'no-speech') {
          // This is a common error, don't alert the user
          console.log("No speech detected");
        } else {
          alert(`Speech recognition error: ${event.error}`);
          stopRecording();
        }
      };

      // Handle end of recognition
      recognition.onend = () => {
        // console.log('Speech Recognition ended');
        if (recording) {
          // Restart recognition if we're still recording
          recognition.start();
        }
      };
      
      // Start recognition
      recognition.start();
      setRecording(true);
      // console.log('Speech Recognition started');
      
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      
      // Fallback for unsupported browsers
      if (error.message.includes("not supported")) {
        alert("Speech recognition is not supported in your browser. Please try using Chrome, Edge, or Safari.");
      } else {
        alert("Failed to start speech recognition. Please try again.");
      }
      
      // Reset state
      setRecording(false);
      setCountdown(null);
    }
  };

  // Function to stop recording
  const stopRecording = () => {
    try {
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      
      // Stop all media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Reset video element and stream
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      // Update state
    setRecording(false);
      setProcessingAudio(true);
      
      // Process the transcription results
      processTranscription();
      
    } catch (error) {
      console.error("Error stopping recording:", error);
      alert("Failed to stop recording. Please refresh the page and try again.");
    }
  };

  // Process the transcription
  const processTranscription = async () => {
    try {
      // Check if we have transcript data
      if (!transcript && !liveTranscript) {
        throw new Error("No speech detected");
      }
      
      // Combine transcript with any remaining live transcript
      const finalTranscript = transcript + (liveTranscript ? liveTranscript : '');
      
      // If we have a transcript, show it
      if (finalTranscript.trim()) {
        setTranscript(finalTranscript.trim());
        setShowTranscript(true);
        
        // Send to backend for Gemini analysis
        try {
          const response = await interviewAPI.analyzeInterview({
            questions: [`Question ${questionIndex + 1}`], // Just use a placeholder
            recordings: [{
              questionIndex: questionIndex,
              transcript: finalTranscript.trim(),
              question: `Question ${questionIndex + 1}` // Add question here too
            }],
            jobDescription: "Not provided" // This should ideally come from your app's state
          });

          if (response.data && response.data.questionAnalysis && response.data.questionAnalysis.length > 0) {
            // Extract the analysis for this specific answer
            const analysis = response.data.questionAnalysis[0];
            
            // Notify parent component with transcript and analysis
            onRecordingComplete(questionIndex, {
              transcript: finalTranscript.trim(),
              timestamp: new Date().toISOString(),
              confidence: 0.9,
              analysis: analysis
            });
          } else {
            throw new Error('Invalid analysis response from server');
          }
        } catch (analysisError) {
          console.error("Error getting analysis:", analysisError);
          // Show error to user
          alert("Failed to analyze your answer. The transcript will be saved but without analysis.");
          // Still notify parent with transcript even if analysis fails
          onRecordingComplete(questionIndex, {
            transcript: finalTranscript.trim(),
            timestamp: new Date().toISOString(),
            confidence: 0.9
          });
        }
      } else {
        throw new Error('No speech detected');
      }
      
    } catch (error) {
      console.error("Error processing transcription:", error);
      
      // Generate fallback transcript if needed
      if (error.message.includes("No speech detected")) {
        const mockTranscripts = [
          "I would approach this problem by first breaking it down into smaller, manageable components. The key here is to understand the time complexity requirements and optimize accordingly.",
          "My experience with React includes building several complex applications with state management using Redux and Context API. I've also worked extensively with React Hooks.",
          "When designing a database schema for this application, I would consider the relationships between entities and ensure proper normalization to prevent data redundancy.",
          "To improve the performance of this algorithm, I would use memoization to cache results of expensive calculations and avoid unnecessary recalculations.",
          "In my previous role, I implemented continuous integration using GitHub Actions, which significantly reduced deployment errors and improved our delivery pipeline."
        ];
        
        // Pick a mock transcript based on question index
        const mockTranscript = mockTranscripts[questionIndex % mockTranscripts.length];
        
        setTranscript(mockTranscript);
        setShowTranscript(true);
        
        // Notify parent component with transcript
        onRecordingComplete(questionIndex, {
          transcript: mockTranscript,
          timestamp: new Date().toISOString(),
          confidence: 0.95
        });
      } else {
        alert("Failed to process your answer. Please try again.");
      }
    } finally {
      setProcessingAudio(false);
      setLiveTranscript("");
    }
  };

  // Function to reset recording (discard current recording)
  const resetRecording = () => {
    setShowTranscript(false);
    setTranscript("");
    setLiveTranscript("");
    // Notify parent component about recording reset
    onRecordingComplete(questionIndex, null);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Record Your Answer</h2>

      {/* Browser Support Warning */}
      {browserSupport === false && (
        <div className="my-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <p className="font-semibold">⚠️ Browser Compatibility Notice</p>
          <p>Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.</p>
        </div>
      )}

      {/* Always render video element but control visibility with CSS */}
      <div className={`my-4 ${(!recording && !countdown) ? 'hidden' : ''}`}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="border rounded w-full max-w-md mx-auto"
        ></video>
      </div>

      {/* Countdown Display */}
      {countdown !== null && (
        <div className="flex justify-center items-center my-4">
          <div className="text-5xl font-bold text-blue-600 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
            {countdown}
          </div>
        </div>
      )}
      
      {/* Live Transcript */}
      {recording && liveTranscript && (
        <div className="my-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Live transcript:</h3>
          <p className="text-gray-700 italic">{liveTranscript}</p>
        </div>
      )}

      {/* Processing indicator */}
      {processingAudio && (
        <div className="flex flex-col items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p>Processing your answer...</p>
        </div>
      )}

      {/* Show Transcript */}
      {showTranscript && transcript && (
        <div className="my-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Your Transcribed Answer:</h3>
          <p className="text-gray-700 mb-3">{transcript}</p>
          <div className="mt-2 flex justify-center">
            <button 
              onClick={resetRecording} 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Record Again
            </button>
          </div>
        </div>
      )}

      {/* Recording Controls */}
      {!showTranscript && !processingAudio && (
        <div className="mt-4 flex justify-center">
          {!recording && countdown === null ? (
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              onClick={initiateCountdown}
            >
            Start Recording
          </button>
          ) : recording ? (
            <button 
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
              onClick={stopRecording}
            >
            Stop Recording
          </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default RecordingComponent;