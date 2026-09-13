import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiShoppingBag, FiDollarSign, FiUsers } from 'react-icons/fi';
import api from '../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders')
        ]);
        const revenue = ordersRes.data.reduce((acc, o) => acc + o.totalPrice, 0);
        setStats({ products: productsRes.data.length, orders: ordersRes.data.length, revenue });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Products', value: stats.products, icon: <FiBox />, color: 'from-indigo-500 to-purple-500', link: '/admin/products' },
    { label: 'Total Orders', value: stats.orders, icon: <FiShoppingBag />, color: 'from-pink-500 to-rose-500', link: '/admin/orders' },
    { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: <FiDollarSign />, color: 'from-emerald-500 to-teal-500', link: '/admin/orders' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold gradient-text mb-8">Admin Dashboard</h1>
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading stats...</div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {cards.map((card) => (
            <Link key={card.label} to={card.link} className={`card p-6 bg-gradient-to-br ${card.color} text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{card.label}</p>
                  <p className="text-3xl font-extrabold mt-1">{card.value}</p>
                </div>
                <div className="text-3xl opacity-80">{card.icon}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <Link to="/admin/products" className="card p-8 text-center hover:shadow-xl">
          <FiBox size={32} className="mx-auto text-primary-500 mb-3" />
          <h2 className="text-xl font-bold text-gray-800">Manage Products</h2>
          <p className="text-gray-500 text-sm mt-1">Add, edit or remove products from the catalog</p>
        </Link>
        <Link to="/admin/orders" className="card p-8 text-center hover:shadow-xl">
          <FiShoppingBag size={32} className="mx-auto text-accent-500 mb-3" />
          <h2 className="text-xl font-bold text-gray-800">Manage Orders</h2>
          <p className="text-gray-500 text-sm mt-1">View orders and update their delivery status</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
