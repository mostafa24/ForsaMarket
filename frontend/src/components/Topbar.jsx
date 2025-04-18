import React from 'react';

const Topbar = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-2 rounded w-1/3"
      />
      <div className="flex items-center space-x-4">
        <span className="text-lg">🔔</span>
        <span className="font-bold">Admin</span>
      </div>
    </header>
  );
};

export default Topbar;
