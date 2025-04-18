import React from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar
} from 'recharts';

const data = [
  { name: 'Jan', sales: 240 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 200 },
  { name: 'Apr', sales: 350 },
  { name: 'May', sales: 400 },
  { name: 'Jun', sales: 420 },
  { name: 'Jul', sales: 600 },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h3>Total Orders</h3>
          <p className="text-2xl font-bold">128</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3>Confirmed Orders</h3>
          <p className="text-2xl font-bold">96</p>
        </div>
        <div className="bg-orange-400 text-white p-4 rounded shadow">
          <h3>Pending Orders</h3>
          <p className="text-2xl font-bold">32</p>
        </div>
        <div className="bg-teal-500 text-white p-4 rounded shadow">
          <h3>Total Sales</h3>
          <p className="text-2xl font-bold">$12,540</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="mb-2 font-bold">Sales Overview</h4>
          <LineChart width={400} height={200} data={data}>
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="mb-2 font-bold">Top Selling Products</h4>
          <BarChart width={400} height={200} data={data}>
            <Bar dataKey="sales" fill="#10b981" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
