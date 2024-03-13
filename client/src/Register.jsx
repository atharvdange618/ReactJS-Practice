import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cnfPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            username: '',
            email: '',
            password: '',
            cnfPassword: ''
        })
    };

    return (
        <div className='border-2 bg-blue-500 rounded-lg w-96 h-96 px-4 py-4 mx-auto flex flex-col justify-center items-center'>
            <h2 className='text-center text-white'>Register</h2>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='mt-2'>
                    <label htmlFor="username" className='text-white'>Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="email" className='text-white'>Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password" className='text-white'>Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="cnfPassword" className='text-white'>Confirm password:</label>
                    <input type="password" id="cnfPassword" name="cnfPassword" value={formData.cnfPassword} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <br />
                <button className='bg-green-500 rounded-md px-2 py-1 mb-4 text-white' type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Register;
