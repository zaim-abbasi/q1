import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdPeople, MdShoppingCart, MdLocalShipping, MdPendingActions } from 'react-icons/md';

// Hardcoded data for the sales chart
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

// Hardcoded data for deals
const dealsData = [
  {
    id: 1,
    productName: 'iPhone 13 Pro',
    location: 'New York, USA',
    dateTime: '2023-08-15 14:30',
    pieces: 5,
    amount: 5999.99,
    status: 'Delivered'
  },
  {
    id: 2,
    productName: 'MacBook Pro M1',
    location: 'London, UK',
    dateTime: '2023-08-14 09:15',
    pieces: 2,
    amount: 3999.99,
    status: 'Pending'
  },
  {
    id: 3,
    productName: 'AirPods Pro',
    location: 'Paris, France',
    dateTime: '2023-08-13 16:45',
    pieces: 10,
    amount: 2499.99,
    status: 'Processing'
  },
  {
    id: 4,
    productName: 'iPad Air',
    location: 'Berlin, Germany',
    dateTime: '2023-08-12 11:20',
    pieces: 3,
    amount: 1799.99,
    status: 'Delivered'
  },
];

function KPICard({ icon: Icon, title, value, bgColor, onClick, clickable = false }) {
  const cardClasses = `${bgColor} rounded-lg p-6 text-white shadow-md ${clickable ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`;
  
  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const handlePendingOrdersClick = () => {
    navigate('/orders?status=pending');
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          icon={MdPeople}
          title="Total Users"
          value="1,234"
          bgColor="bg-blue-500"
        />
        <KPICard
          icon={MdShoppingCart}
          title="Total Orders"
          value="856"
          bgColor="bg-green-500"
        />
        <KPICard
          icon={MdLocalShipping}
          title="Total Sales"
          value="$45,678"
          bgColor="bg-purple-500"
        />
        <KPICard
          icon={MdPendingActions}
          title="Total Pending"
          value="23"
          bgColor="bg-orange-500"
          clickable={true}
          onClick={handlePendingOrdersClick}
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Sales Overview</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#4F46E5" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deals Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Deals Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date + Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pieces
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dealsData.map((deal) => (
                <tr key={deal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleProductClick(deal.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      {deal.productName}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.dateTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.pieces}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${deal.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${deal.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        deal.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {deal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;