import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import Navbar from "../navbar";
import Footer from "../footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        {
            icon: faPhone,
            title: "Phone",
            details: "+1 (555) 123-4567",
            description: "Monday to Friday, 9am to 6pm"
        },
        {
            icon: faEnvelope,
            title: "Email",
            details: "support@interviewbuddy.com",
            description: "We'll respond within 24 hours"
        },
        {
            icon: faLocationDot,
            title: "Office",
            details: "HazratGanj, Lucknow",
            description: "Uttar Pradesh, India"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2C3E50]/5 to-[#16A085]/5">
            <Navbar />
            
            {/* Contact Header */}
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold text-center text-[#2C3E50] mb-6">Contact Us</h1>
                <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you. Send us a message
                    and we'll respond as soon as possible.
                </p>
            </div>

            <div className="container mx-auto px-4 pb-16">
                <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="bg-gradient-to-br from-[#2C3E50] to-[#16A085] rounded-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                        <div className="space-y-8">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="mt-1">
                                        <FontAwesomeIcon icon={info.icon} size="lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{info.title}</h3>
                                        <p className="text-white/90">{info.details}</p>
                                        <p className="text-white/70 text-sm">{info.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-4">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
                                    required
                                ></textarea>
                            </div>
                            <Button 
                                children="Send Message"
                                type="submit"
                                className="w-full rounded-lg"
                            />
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;