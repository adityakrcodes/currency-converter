import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-white text-xl font-semibold">Currency Exchange System</span>
                </div>
                <p className='text-white font-bold'>
                    Made by <Link to={"https://adityakrcodes.com"} className='text-black'>&lt;AdityaKrCodes/&gt;</Link>
                </p>
            </div>
        </nav>
    );
};

export default Footer;
