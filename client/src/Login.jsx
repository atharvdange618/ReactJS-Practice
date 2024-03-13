import React from 'react'

function Login() {
    return (
        <div className='border-2 bg-blue-500 rounded-lg w-96 h-80 px-4 py-4 mx-auto flex flex-col justify-center items-center mt-2'>
            <h2 className='text-center text-white'>Login</h2>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='mt-2'>
                    <label htmlFor="username" className='text-white'>Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password" className='text-white'>Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <br />
                <button className='bg-green-500 rounded-md px-2 py-1 text-white' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login