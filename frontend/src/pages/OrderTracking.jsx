import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiHome, FiXCircle } from 'react-icons/fi';
import api from '../api/axios';

const steps = ['Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

const stepIcons = {
  Placed: <FiCheckCircle />,
  Confirmed: <FiCheckCircle />,
  Shipped: <FiPackage />,
  'Out for Delivery': <FiTruck />,
  Delivered: <FiHome />
};

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center py-24 text-gray-500">Loading order...</div>;
  if (!order) return <div className="text-center py-24 text-gray-500">Order not found.</div>;

  const currentStepIndex = steps.indexOf(order.status);
  const isCancelled = order.status === 'Cancelled';

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="card p-6 md:p-8 mb-8 bg-gradient-to-r from-primary-50 to-pink-50">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Order #{order._id.slice(-8).toUpperCase()}</h1>
            <p className="text-gray-500 text-sm">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full font-semibold text-sm ${isCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Tracking Timeline */}
      {!isCancelled ? (
        <div className="card p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-8">Track Your Order</h2>
          <div className="flex justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />
            </div>
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center relative z-10 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${
                    idx <= currentStepIndex ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-300'
                  }`}
                >
                  {stepIcons[step]}
                </div>
                <span className={`text-xs mt-2 text-center font-medium ${idx <= currentStepIndex ? 'text-gray-800' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-8 mb-8 flex items-center gap-3 text-red-600">
          <FiXCircle size={24} /> <span className="font-semibold">This order has been cancelled.</span>
        </div>
      )}

      {/* Items */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Items</h2>
        {order.items.map((item) => (
          <div key={item.product} className="flex items-center gap-4 py-3 border-b last:border-0">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
            <span className="font-semibold text-gray-800">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 text-lg font-bold text-gray-800">
          <span>Total Paid</span>
          <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-gray-800 mb-2">Shipping Address</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {order.shippingAddress.fullName}<br />
            {order.shippingAddress.street}, {order.shippingAddress.city}<br />
            {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
            📞 {order.shippingAddress.phone}
          </p>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-gray-800 mb-2">Payment Info</h3>
          <p className="text-sm text-gray-600">Method: {order.paymentMethod}</p>
          <p className="text-sm text-gray-600">Status: {order.paymentStatus}</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link to="/orders" className="btn-outline">View All Orders</Link>
      </div>
    </div>
  );
};

export default OrderTracking;
