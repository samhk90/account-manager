import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // For the eye icon
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { createClient } from '@supabase/supabase-js'; // Importing Supabase
const supabase = createClient(
    'https://ccpdvtijzzrrraojwgsb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcGR2dGlqenpycnJhb2p3Z3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDA0ODIsImV4cCI6MjA0NTI3NjQ4Mn0.-BmtrLLYoxusKsUAdFZYiCIKR7ER6qr8Ri1dlGgSroA' // Replace this with your actual API key
  );
const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // For navigation after successful registration

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader on form submit

    // Register user with Supabase
    const { error, data } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: {
          first_name: registerData.firstname,
          last_name: registerData.lastname,
          dob: registerData.dob,
        },
      },
    });

    if (error) {
      alert('Registration error: ' + error.message); // Handle registration errors
      setIsLoading(false); // Hide loader if registration fails
    } else {
      // Insert additional data into the userinfo table
      const { error: insertError } = await supabase.from('userinfo').insert({
        first_name: registerData.firstname,
        last_name: registerData.lastname,
        dob: registerData.dob,
        email: registerData.email, // Storing the email as well
      });

      if (insertError) {
        alert('Error saving user info: ' + insertError.message);
        setIsLoading(false); // Hide loader if insert fails
      } else {
        navigate('/account'); // Redirect to the account page after successful registration
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-3/4 max-w-4xl">
        {/* Left Side - Registration Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800">Create an Account</h2>

          <div className="mt-6 border-t border-gray-300"></div>

          <form onSubmit={handleRegisterSubmit} className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                  value={registerData.firstname}
                  onChange={(e) => setRegisterData({ ...registerData, firstname: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                  value={registerData.lastname}
                  onChange={(e) => setRegisterData({ ...registerData, lastname: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </div>

            <div className="mt-4 relative">
              <label className="block text-gray-600">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
              </span>
            </div>

            <div className="mt-4">
              <label className="block text-gray-600">Date of Birth</label>
              <input
                type="date"
                className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                value={registerData.dob}
                onChange={(e) => setRegisterData({ ...registerData, dob: e.target.value })}
                required
              />
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
                'Sign Up'
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Login Section */}
        <div className="w-1/2 bg-gradient-to-tr from-teal-400 to-green-500 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-semibold">Already Have an Account?</h2>
          <p className="mt-2 text-center">
            Login and explore your personalized dashboard!
          </p>
          <button
            className="mt-6 bg-white text-teal-500 px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300"
            onClick={() => navigate('/')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
