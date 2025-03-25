// npm install react-icons --save


import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import Button from "./button";

const feedbackPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(null);

  return (
    <div>
      {/* Floating Feedback Button */}
      {/* <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Feedback
      </button> */}
      <Button children={<FontAwesomeIcon icon={faFaceSmile} 
      className='text-2xl'/>} 
      onClick={() => setIsOpen(true)} 
      className={"fixed bottom-6 right-3 rounded-full z-50"}/>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-3">Rate Your Experience</h2>

            {/* Star Rating */}
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {/* Submit & Close Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => {
                  alert(`Thank you for rating: ${rating} stars!`);
                  setIsOpen(false);
                }}
              >
                Submit
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default feedbackPopup;
