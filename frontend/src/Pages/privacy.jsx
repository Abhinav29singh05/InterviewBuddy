import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold text-[#34495E] mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-[#34495E]">
          <p className="mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Introduction</h2>
            <p className="mb-3">
              Welcome to Interview Buddy. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website and 
              tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="mb-3">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-3">
              <li className="mb-2">Identity Data includes first name, last name, username or similar identifier.</li>
              <li className="mb-2">Contact Data includes email address and telephone numbers.</li>
              <li className="mb-2">Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li className="mb-2">Usage Data includes information about how you use our website, products and services.</li>
              <li className="mb-2">Interview Data includes any information you provide during mock interviews or assessment processes.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="mb-3">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-3">
              <li className="mb-2">To provide and maintain our service, including to monitor the usage of our service.</li>
              <li className="mb-2">To manage your account and provide you with customer support.</li>
              <li className="mb-2">To improve our interview simulation technology and personalize your experience.</li>
              <li className="mb-2">To analyze how our service is used and to develop marketing strategies.</li>
              <li className="mb-2">To process payments and prevent fraudulent transactions.</li>
              <li className="mb-2">To communicate with you about updates, security alerts, and support messages.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p className="mb-3">
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We also limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
            <p className="mb-3">
              We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Your Legal Rights</h2>
            <p className="mb-3">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-3">
              <li className="mb-2">Request access to your personal data.</li>
              <li className="mb-2">Request correction of your personal data.</li>
              <li className="mb-2">Request erasure of your personal data.</li>
              <li className="mb-2">Object to processing of your personal data.</li>
              <li className="mb-2">Request restriction of processing your personal data.</li>
              <li className="mb-2">Request transfer of your personal data.</li>
              <li className="mb-2">Right to withdraw consent.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="mb-3">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-3">
              <strong>Email:</strong> Coming soon...
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy; 