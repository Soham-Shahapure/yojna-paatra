import React, { useState } from 'react';
import { Leaf, Search, Bell, ChevronRight, Tractor, Sprout, ShieldAlert } from 'lucide-react';

const SchemeDashboard = () => {
  // This "Mock Data" simulates your backend logic
  const schemes = [
    {
      id: 1,
      title: "PM-Kisan Samman Nidhi",
      amount: "₹6,000 / year",
      category: "Financial Aid",
      icon: <Tractor className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
      tags: ["Direct Transfer", "Small Farmers"]
    },
    {
      id: 2,
      title: "Magel Tyala Shettale",
      amount: "100% Subsidy",
      category: "Irrigation",
      icon: <Sprout className="w-6 h-6 text-white" />,
      color: "bg-green-500",
      tags: ["Water Storage", "Drought Relief"]
    },
    {
      id: 3,
      title: "PMFBY Crop Insurance",
      amount: "Crop Protection",
      category: "Insurance",
      icon: <ShieldAlert className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
      tags: ["Risk Cover", "Low Premium"]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream font-sans">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="bg-white px-6 py-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <Leaf className="text-brand-green w-6 h-6" />
          <span className="text-xl font-bold text-brand-green">Yojna-Paatra</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hidden md:block text-gray-600 font-medium">Hello, Ramesh Patil</span>
          <div className="bg-gray-100 p-2 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </div>
          <div className="h-10 w-10 bg-brand-green text-white rounded-full flex items-center justify-center font-bold">
            R
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Personalization Hook) */}
      <div className="px-6 py-8 md:px-12">
        <div className="bg-brand-green rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">Good Morning, Ramesh! 🌾</h1>
            <p className="text-green-100 text-lg mb-6">
              Based on your profile <span className="bg-white/20 px-2 py-1 rounded text-sm">(2 Hectares • ₹90k Income)</span>, 
              you are eligible for <span className="font-bold text-brand-orange">3 New Schemes</span> today.
            </p>
            
            {/* Search Bar */}
            <div className="flex bg-white rounded-xl p-2 shadow-lg max-w-lg">
              <Search className="text-gray-400 w-6 h-6 ml-2 self-center" />
              <input 
                type="text" 
                placeholder="Search for tractors, seeds, loans..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 px-4 py-2"
              />
              <button className="bg-brand-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                Search
              </button>
            </div>
          </div>
          
          {/* Decorative Circle in Background */}
          <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* 3. SCHEME CARDS GRID */}
      <div className="px-6 md:px-12 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended for You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className={`${scheme.color} p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform`}>
                  {scheme.icon}
                </div>
                <span className="bg-green-50 text-brand-green text-xs font-bold px-3 py-1 rounded-full border border-green-100">
                  Eligible
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-1">{scheme.title}</h3>
              <p className="text-brand-orange font-bold text-lg mb-4">{scheme.amount}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {scheme.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full py-3 rounded-xl border-2 border-brand-green text-brand-green font-bold hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center gap-2">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchemeDashboard;