import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    'https://ccpdvtijzzrrraojwgsb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcGR2dGlqenpycnJhb2p3Z3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDA0ODIsImV4cCI6MjA0NTI3NjQ4Mn0.-BmtrLLYoxusKsUAdFZYiCIKR7ER6qr8Ri1dlGgSroA' // Replace this with your actual API key
);

const Account = () => {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                alert('Error fetching user data: ' + error.message);
                return;
            }
            if (user) {
                const { data: userInfo, error: userInfoError } = await supabase
                    .from('userinfo')
                    .select('*')
                    .eq('email', user.email)
                    .single();

                if (userInfoError) {
                    alert('Error fetching user info: ' + userInfoError.message);
                } else {
                    setUserData({
                        firstname: userInfo.first_name,
                        lastname: userInfo.last_name,
                        email: userInfo.email,
                        dob: userInfo.dob,
                    });
                }
            }
        };
        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsLoading(true);
        const { error } = await supabase
            .from('userinfo')
            .update({
                first_name: userData.firstname,
                last_name: userData.lastname,
                dob: userData.dob,
                email: userData.email,
            })
            .eq('email', userData.email);

        if (error) {
            alert('Error updating user info: ' + error.message);
        } else {
            setIsEditing(false);
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        const { error } = await supabase.auth.admin.deleteUser(userData.email);
        if (error) {
            alert('Error deleting account: ' + error.message);
        } else {
            navigate('/'); // Redirect to homepage after deletion
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert('Error logging out: ' + error.message);
        } else {
            navigate('/'); // Redirect to the login page after logout
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="w-3/4 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col items-center p-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mt-4">{isEditing ? 'Edit Profile' : 'Profile'}</h2>

                    <div className="mt-6 border-t border-gray-300 w-full p-5"></div>

                    {/* User Info Section */}
                    <div className="mt-6 w-full">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">First Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={userData.firstname}
                                        onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                                        className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                                        required
                                    />
                                ) : (
                                    <p className="mt-2 max-w-full p-1 border-b-2 text-gray-700">{userData.firstname}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-600">Last Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={userData.lastname}
                                        onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                                        className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                                        required
                                    />
                                ) : (
                                    <p className="mt-2 max-w-full p-1 border-b-2 text-gray-700">{userData.lastname}</p>
                                )}
                            </div>
                        </div>
<div className='grid grid-cols-2 gap-4'>
    
<div className="mt-4">
                            <label className="block text-gray-600">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    className="w-full p-3 mt-2 bg-gray-200 rounded-lg  focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                                    required
                                />
                            ) : (
                                <p className="mt-2 max-w-full p-1 border-b-2 text-gray-700">{userData.email}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-600">Date of Birth</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={userData.dob}
                                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                                    className="w-full p-3 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring focus:border-blue-400"
                                    required
                                />
                            ) : (
                                <p className="mt-2 max-w-full p-1 border-b-2 text-gray-700">{userData.dob}</p>
                            )}
                        </div>
</div>
                    </div>

                    {/* Edit, Delete, and Logout Buttons */}
                    <div className="mt-6 flex space-x-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-400 transition duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-300 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-200 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleEdit}
                                    className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-400 transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-400 transition duration-300"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-400 transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
