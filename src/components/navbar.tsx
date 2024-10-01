import React from 'react';
import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-white text-xl font-semibold">
                        <Link to="/">
                            Currency App
                        </Link>
                    </span>
                </div>
                <Link to="/akc-all" className='font-bold'>All Currencies</Link>
            </div>
        </nav>
    );
};

export default Navbar;
