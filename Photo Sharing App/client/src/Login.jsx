import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [passErr, setPassErr] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                const { username, userType, users } = responseData;
                navigate('/profile', { state: { username, userType, users } });
            } else {
                const errorData = await response.json();
                setPassErr(errorData.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="bg-gray-100 h-screen py-4 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input autoComplete="off" spellCheck="false" id="username" name="username" type="text" value={formData.username} onChange={handleInputChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Username:" />
                                        <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                                    </div>
                                    <div className="relative">
                                        <input autoComplete="off" id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className='mb-3 mt-5 text-red-500 font-bold'>
                                        <h4>{passErr}</h4>
                                    </div>
                                    <div className="relative">
                                        <button className="bg-green-500 text-white rounded-md px-2 py-1" type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;