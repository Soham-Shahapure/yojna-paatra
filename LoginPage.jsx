import React from 'react';
import { Leaf, Phone, User } from 'lucide-react'; 

// 1. We accept the "onLogin" prop here so the button can talk to App.js
const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      
      {/* Main Container - The "Split" */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT SIDE: The Art & Hook */}
        <div className="flex flex-col space-y-6 md:pr-12">
          {/* Logo */}
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-brand-green/10 rounded-lg">
                <Leaf className="w-8 h-8 text-brand-green" />
             </div>
             <span className="text-2xl font-bold text-brand-green tracking-tight">
               Yojna-Paatra
             </span>
          </div>

          {/* Hero Image - Replace this URL with your uploaded farmer image later if you want! */}
          <img 
            src="/api/placeholder/600/400" 
            alt="Farmers" 
            className="w-full max-w-md drop-shadow-xl rounded-lg"
          />

          {/* The Big Tagline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find Government Schemes You Deserve in <span className="text-brand-orange">60 Seconds.</span>
          </h1>
          
          <p className="text-lg text-gray-600">
            No Login. No Data Stored. 100% Free.
          </p>
        </div>

        {/* RIGHT SIDE: The Magic White Card */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-500">Enter your details to access schemes.</p>
            </div>

            <form className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Ramesh Patil"
                    className="w-full pl-11 pr-4 py-3 bg-brand-light border-none rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-brand-green focus:bg-white transition-all duration-200 font-medium"
                  />
                </div>
              </div>

              {/* Mobile Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="98765 43210"
                    className="w-full pl-11 pr-4 py-3 bg-brand-light border-none rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-brand-green focus:bg-white transition-all duration-200 font-medium"
                  />
                </div>
              </div>

              {/* 2. The Updated Button with onClick functionality */}
              <button 
                type="button" 
                onClick={onLogin} // This triggers the switch to the Dashboard
                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Login with OTP &rarr;
              </button>

            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;