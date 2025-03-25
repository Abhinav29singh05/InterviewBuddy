import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold text-[#34495E] mb-6">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-[#34495E]">
          <p>This page contains our Terms of Service.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms; 