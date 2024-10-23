import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons from lucide-react

// Initialize Supabase client
const supabase = createClient(
  'https://ccpdvtijzzrrraojwgsb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcGR2dGlqenpycnJhb2p3Z3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDA0ODIsImV4cCI6MjA0NTI3NjQ4Mn0.-BmtrLLYoxusKsUAdFZYiCIKR7ER6qr8Ri1dlGgSroA' // Replace this with your actual API key
);

const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const navigate = useNavigate(); // For navigation after login
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true); // Show loader on form submit
  
      // Sign in with Supabase
      const { error, data } = await supabase.auth.signInWithPassword({
        email: loginData.username,
        password: loginData.password,
      });
  
      if (error) {
        alert('Login error: ' + error.message); // Handle login errors
        setIsLoading(false); // Hide loader if login fails
      } else {
        navigate('/account'); // Redirect to the account page after successful login
      }
    };
  
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
    const sigupbtn =() =>{
        navigate('/register')
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4 max-w-4xl">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800">Login to Your Account</h2>

          <div className="mt-6 border-t border-gray-300"></div>

          <form onSubmit={handleLoginSubmit} className="mt-6">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-600">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full mt-6 p-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Signup Section */}
        <div className="w-1/2 bg-gradient-to-tr from-teal-400 to-green-500 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-semibold">New Here?</h2>
          <p className="mt-2 text-center">
            Sign up and discover a great amount of new opportunities!
          </p>
          <button onClick={sigupbtn} className="mt-6 bg-white text-teal-500 px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

