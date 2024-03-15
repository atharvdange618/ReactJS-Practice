import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
        setFormData({
            username: "",
            password: ""
        });
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) // Pass formData as the body
            });
            if (response.ok) {
                // Retrieve the session token from the response headers
                const sessionToken = response.headers.get('set-cookie');
                // Store the session token in the browser's cookies
                console.log(sessionToken);
                document.cookie = sessionToken;
                // Redirect to the profile page
                navigate('/profile');
            } else {
                const errorData = await response.json();
                setPassErr(errorData.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='border-2 bg-blue-500 rounded-lg w-80 h-80 px-4 py-4 mx-auto flex flex-col justify-center items-center mt-2'>
            <h2 className='text-center text-white font-bold text-lg'>Login</h2>
            <form className='flex flex-col' onSubmit={handleSubmit} >
                <div className='mt-2'>
                    <label htmlFor="username" className='text-white'>Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password" className='text-white'>Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <br />
                <div className='mb-3'>
                    <h4>{passErr}</h4>
                </div>
                <button className='bg-green-500 rounded-md px-2 py-1 text-white' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;