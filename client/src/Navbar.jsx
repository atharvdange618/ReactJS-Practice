import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className='nav'>
            <Link to='/' className='home-page active'>Home</Link>
            <ul>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar