import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-6">
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <span className="font-semibold text-xl tracking-tight"><Link to='/'>SnapScape</Link></span>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-white hover:border-white"
                    onClick={toggleMenu}
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
                <div className="text-sm lg:flex-grow">
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4" onClick={toggleMenu}>
                        About
                    </Link>
                    <Link to="/services" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white" onClick={toggleMenu}>
                        Services
                    </Link>
                </div>
                <div>
                    <Link to="/register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0" onClick={toggleMenu}>Sign Up</Link>
                </div>
                <div className='ml-2'>
                    <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0" onClick={toggleMenu}>Login</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
