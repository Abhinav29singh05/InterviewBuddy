// Import necessary dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Signup = () => {
    const navigate = useNavigate();
    // State management for username availability checking
    const [username, setUsername] = useState(''); // Store username input
    const [isChecking, setIsChecking] = useState(false); // Loading state for availability check
    const [isAvailable, setIsAvailable] = useState(null); // null = not checked, true = available, false = taken
    const [timeoutId, setTimeoutId] = useState(null); // For debouncing API calls
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    /**
     * Simulates an API call to check username availability
     * Replace this with actual API integration
     * @param {string} username - The username to check
     * @returns {Promise<boolean>} - Returns true if username is available
     */
    const checkUsernameAvailability = (username) => {
        // This is a placeholder function. Replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // For demo, usernames containing 'test' are considered taken
                resolve(!username.toLowerCase().includes('test'));
            }, 500);
        });
    };

    /**
     * Handles username input changes and triggers availability check
     * Implements debouncing to prevent too many API calls
     * @param {Event} e - Input change event
     */
    const handleUsernameChange = async (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        console.log(e, e.target);
        
        // Clear previous timeout to implement debouncing
        if (timeoutId) clearTimeout(timeoutId);

        // Reset states if username is too short
        if (newUsername.length < 3) {
            setIsAvailable(null);
            setIsChecking(false);
            return;
        }

        setIsChecking(true);
        
        // Debounce the availability check by waiting 500ms
        const newTimeoutId = setTimeout(async () => {
            const available = await checkUsernameAvailability(newUsername);
            setIsAvailable(available);
            setIsChecking(false);
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    /**
     * Handles changes to the form data (email, password, confirmPassword)
     * Updates the state with the new values
     * @param {Event} e - Input change event
     * 
     * Example:
     * If the input field is <input name="email" value="user@example.com" />,
     * then the state will be updated with { email: 'user@example.com' }
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // If username is being changed, trigger availability check
        if (name === 'username') {
            handleUsernameChange(e);
        }
    };

    /**
     * Handles form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form data
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Send signup data to backend
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password
            };
            const response = await authAPI.signup(userData);

            // Handle successful signup
            console.log('Signup successful:', response.data);
            navigate('/'); // Redirect to login page after successful signup
        } catch (error) {
            // Handle signup error
            console.error('Signup error:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Signup failed');
        }
    };  

    return (
        <div className="flex m-0 p-0">
            <Button children={<FontAwesomeIcon icon={faXmark} />} 
            onClick={()=>{navigate('/')}}
            className={"absolute top-4 left-4 rounded-full text-2xl cursor-pointer"}/>
            {/* Left Section - Login CTA */}
            <div className="left h-screen  px-[5%] bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex flex-col justify-center items-center">
                <h3 className="text-6xl font-bold pb-4 text-white">Welcome Back!</h3>
                <h5 className="text-lg text-white text-center">
                    Already have an account? Login to continue your journey!</h5>
                <Button 
                children={"Login"} 
                className={"rounded-full mt-4 bg-white text-[black] hover:bg-white"}
                onClick={()=>{navigate('/login')}}/>
            </div>

            {/* Right Section - Sign Up Form */}
            <div className="h-screen w-[65vw] flex justify-center items-center">
                <div className="container flex flex-col justify-center items-center">
                    {/* Header Section */}
                    <div className="flex flex-col justify-center items-center ">
                        <h3 className="text-6xl font-bold pb-4">Create Account</h3>
                        <h5 className="text-2xl pb-4">Sign up using your Socials</h5>
                        {/* Social Media Icons */}
                        <span className="text-2xl">
                            <FontAwesomeIcon icon={faFacebook} className="mr-4"/>
                            <FontAwesomeIcon icon={faGoogle} className="ml-4"/>
                        </span>
                    </div>

                    {/* Sign Up Form */}
                    <div className="mt-8 flex flex-col gap-4 w-[55%] justify-center items-center ">
                        {/* Username Field with Availability Check */}
                        <div className="flex flex-col gap-2 w-[100%]">
                            <label htmlFor="username" className="text-lg">Username</label>
                            <div className="relative w-full">
                                <input 
                                    type="text" 
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    placeholder="Choose a username"
                                />
                                {/* Availability Status Indicator */}
                                {formData.username.length >= 3 && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        {isChecking ? (
                                            <span className="text-gray-500">Checking...</span>
                                        ) : isAvailable === true ? (
                                            <span className="text-green-500">Available!</span>
                                        ) : isAvailable === false ? (
                                            <span className="text-red-500">Already taken</span>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-2 w-[100%]">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2 w-[100%]">
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex flex-col gap-2 w-[100%]">
                            <label htmlFor="confirmPassword" className="text-lg">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500">{error}</div>
                        )}

                        {/* Submit Button */}
                        <Button 
                            children={"Sign Up"} 
                            onClick={handleSubmit} 
                            className="mt-1 rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;