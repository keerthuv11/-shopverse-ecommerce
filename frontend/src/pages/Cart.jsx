import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <FiShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold gradient-text mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="card flex items-center gap-4 p-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-primary-600 font-bold">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center border border-gray-300 rounded-full">
                <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-3 py-1 font-bold">-</button>
                <span className="px-3">{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-3 py-1 font-bold">+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 p-2">
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span>{subtotal > 999 ? 'FREE' : '₹49'}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-4">
            <span>Tax (5%)</span>
            <span>₹{Math.round(subtotal * 0.05).toLocaleString('en-IN')}</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
            <span>Total</span>
            <span>₹{(subtotal + (subtotal > 999 ? 0 : 49) + Math.round(subtotal * 0.05)).toLocaleString('en-IN')}</span>
          </div>
          <button onClick={handleCheckout} className="btn-primary w-full">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
