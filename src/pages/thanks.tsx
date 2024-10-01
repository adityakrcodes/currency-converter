import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
const Thanks: React.FC = () => {
    return (
        <>
            <Navbar/>
                <div className="flex flex-col h-screen text-center justify-center items-center bg-slate-950">
                        <h1 className="text-blue-300 font-black text-4xl">Thank you for using the currency exchange App</h1>
                </div>
            <Footer/>
        </>
    );
};

export default Thanks;