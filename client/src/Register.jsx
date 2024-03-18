import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cnfPassword: '',
        userType: ''
    });
    const [match, setMatch] = useState('');

    const [userCnf, setUserCnf] = useState("");

    const passwordStrength = function (password) {
        let i = 0;
        if (password.length > 7) {
            i++;
        }
        if (password.length >= 10) {
            i++;
        }

        if (/[A-Z]/.test(password)) {
            i++;
        }

        if (/[0-9]/.test(password)) {
            i++;
        }

        if (/[A-Za-z0-8]/.test(password)) {
            i++;
        }

        return i;
    }

    const strengthChecker = function (password) {
        let strength = passwordStrength(password);
        let passStren;
        if (strength <= 2) {
            passStren = "Weak Password";
        } else if (strength >= 2 && strength <= 4) {
            passStren = "Moderate Password";
        } else {
            passStren = "Strong Password";
        }
        return passStren;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.cnfPassword) {
            console.error('Passwords do not match');
            setMatch("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    userType: formData.userType
                })
            });
            if (response.status === 201) { // User created successfully
                setUserCnf("User created successfully");
            } else if (!response.ok) {
                const userReg = await response.json();
                setUserCnf(userReg.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
        // Clear form data after submission
        setFormData({
            username: '',
            email: '',
            password: '',
            cnfPassword: '',
            userType: ''
        });
        setMatch('');
        setUserCnf('');
    };

    return (
        <div className="bg-gray-100 py-2 h-screen flex flex-col justify-center sm:py-12">
            <div className="relative py-2 sm:max-w-md sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
                <div className="relative px-4 py-6 bg-white shadow-lg sm:rounded-lg sm:p-8">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h2 className="text-lg font-semibold text-center text-gray-800">Register</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="mt-2">
                                <label htmlFor="username" className="text-gray-800">Username:</label>
                                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="border-2 rounded-md px-2 py-1 w-full mt-1" />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="email" className="text-gray-800">Email:</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-2 rounded-md px-2 py-1 w-full mt-1" />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="user" className="text-gray-800">User Type:</label>
                                <select className="mt-2 rounded-md px-1 py-1" name="userType" value={formData.userType} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="password" className="text-gray-800">Password:</label>
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="border-2 rounded-md px-2 py-1 w-full mt-1" />
                                <h4 className="text-sm text-red-500 font-bold mt-1">{strengthChecker(formData.password)}</h4>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="cnfPassword" className="text-gray-800">Confirm password:</label>
                                <input type="password" id="cnfPassword" name="cnfPassword" value={formData.cnfPassword} onChange={handleChange} className="border-2 rounded-md px-2 py-1 w-full mt-1" />
                            </div>
                            { <p className="text-sm text-red-900">{match}</p>}
                            { <p className="text-sm text-red-900">{userCnf}</p>}
                            <br />
                            <button className="bg-green-500 rounded-md px-2 py-1 text-white" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;
