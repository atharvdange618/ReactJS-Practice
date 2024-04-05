import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
];

function Navbar({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-6">
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <span className="font-semibold text-xl tracking-tight"><Link to='/'>SnapScape</Link></span>
            </div>
            {/* Menu bar button */}
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-white hover:border-white"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                    aria-expanded={isOpen}
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={classnames('w-full', { 'block': isOpen, 'hidden': !isOpen }, 'block flex-grow lg:flex lg:items-center lg:w-auto')}>
                <div className="text-sm lg:flex-grow">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4"
                            onClick={toggleMenu}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div>
                    {!isLoggedIn ? (
                        <>
                            <AuthLink to="/register" text="Sign Up" />
                            <AuthLink to="/login" text="Login" />
                        </>
                    ) : (
                        <AuthLink to="/profile" text="Profile" />
                    )}
                </div>
            </div>
        </nav>
    );
}

const AuthLink = ({ to, text }) => (
    <Link
        to={to}
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-black mt-4 lg:mt-0"
    >
        {text}
    </Link>
);

export default Navbar;
