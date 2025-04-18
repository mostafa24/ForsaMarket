import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-blue-900 text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">ForsaMarket</h1>
      <nav className="space-y-3">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-blue-800">Dashboard</Link>
        <Link to="/orders" className="block p-2 rounded hover:bg-blue-800">Orders</Link>
        <Link to="/confirmation" className="block p-2 rounded hover:bg-blue-800">Confirmation</Link>
        <Link to="/reports" className="block p-2 rounded hover:bg-blue-800">Reports</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
