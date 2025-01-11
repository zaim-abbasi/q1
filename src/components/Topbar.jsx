import React from 'react';
import { MdNotifications, MdLanguage, MdSearch } from 'react-icons/md';

function Topbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          <h1 className="text-xl font-bold text-gray-800 mr-8">Admin Dashboard</h1>
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg flex-1 max-w-xl">
            <MdSearch className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none flex-1"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MdNotifications className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MdLanguage className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;