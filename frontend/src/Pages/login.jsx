import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../services/api";
import { useAuth } from "../services/authContext";
import Button from "../button.jsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'email'){
            setEmail(value);
        }
        else if(name === 'password'){
            setPassword(value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if(email.length === 0 || password.length === 0){
            alert('All fields are required');
            return;
        }
        try {
            const response = await authAPI.login(email, password);
            // console.log('Login response:', response.data);
            if (response.data && response.data.user) {
                login(response.data.user);
                // console.log('User data after login:', response.data.user);
                navigate('/');
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex m-0 p-0">
            <div className="h-screen w-full flex justify-center items-center">
                <div className="container flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center ">
                        <h3 className="text-6xl font-bold pb-4">Login to Your Account</h3>
                        <h5 className="text-2xl pb-4">Login using your Socials</h5>
                        <span className=" text-2xl">
                            <FontAwesomeIcon icon={faFacebook} className="mr-4"/>
                            <FontAwesomeIcon icon={faGoogle} className="ml-4"/>
                        </span>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 w-[55%] justify-center items-center ">
                        <div className="flex flex-col gap-2 w-[100%]">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                className=" p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-[100%]">
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                name="password"
                            />
                        </div>
                        {error && (
                            <div className="text-red-500">{error}</div>
                        )}
                        <Button 
                            children={"Login"}
                            onClick={handleLogin} 
                            className="mt-1 rounded-full"
                        />
                    </div>
                    <div className="md:hidden text-center mb-4">
                        <p className="text-lg">
                            Create new Account?{' '}
                            <span
                                className="text-blue-600 underline cursor-pointer"
                                onClick={() => navigate('/signup')}
                            >
                                Signup
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="right hidden md:flex h-screen w-[35vw] px-[5%] bg-gradient-to-br from-[#2C3E50] to-[#16A085] flex flex-col justify-center items-center">
                <h3 className="text-6xl font-bold pb-4 text-white ">New Here?</h3>
                <h5 className="text-lg text-white text-center">
                    Sign up and discover a great amount of new opportunities!</h5>
                <Button 
                    children={"Sign Up"} 
                    onClick={()=>{navigate('/signup')}}
                    className={"rounded-full mt-4 text-black font-semibold "}
                />
            </div>
            <Button 
                children={<FontAwesomeIcon icon={faXmark} />} 
                onClick={()=>{navigate('/')}}
                className={"absolute top-4 right-4 rounded-full text-2xl cursor-pointer"}
            />
        </div>
    );
};

export default Login;
