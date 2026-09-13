import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiCreditCard, FiSmartphone, FiTruck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  const address = location.state?.address;

  const [method, setMethod] = useState('Card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal > 999 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  if (!address) {
    navigate('/checkout');
    return null;
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      // simulate payment gateway delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const items = cartItems.map((item) => ({ product: item._id, qty: item.qty }));
      const { data } = await api.post('/orders', {
        items,
        shippingAddress: address,
        paymentMethod: method
      });

      clearCart();
      toast.success('Payment successful! Order placed 🎉');
      navigate(`/order/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold gradient-text mb-8">Payment</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 card p-6">
          <div className="flex gap-3 mb-6">
            {[
              { id: 'Card', label: 'Card', icon: <FiCreditCard /> },
              { id: 'UPI', label: 'UPI', icon: <FiSmartphone /> },
              { id: 'COD', label: 'Cash on Delivery', icon: <FiTruck /> }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMethod(opt.id)}
                className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                  method === opt.id ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-500'
                }`}
              >
                {opt.icon}
                <span className="text-sm font-semibold">{opt.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            {method === 'Card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input required maxLength={16} pattern="[0-9]{16}" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="input-field" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                    <input required value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="input-field" placeholder="12/28" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input required maxLength={3} pattern="[0-9]{3}" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} className="input-field" placeholder="123" />
                  </div>
                </div>
              </>
            )}

            {method === 'UPI' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                <input required value={upiId} onChange={(e) => setUpiId(e.target.value)} className="input-field" placeholder="yourname@upi" />
              </div>
            )}

            {method === 'COD' && (
              <p className="text-gray-600 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
                Pay ₹{total.toLocaleString('en-IN')} in cash when your order is delivered.
              </p>
            )}

            <button type="submit" disabled={processing} className="btn-primary w-full mt-4">
              {processing ? 'Processing Payment...' : `Pay ₹${total.toLocaleString('en-IN')}`}
            </button>
          </form>
        </div>

        <div className="card p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping To</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {address.fullName}<br />
            {address.street}, {address.city}<br />
            {address.state} - {address.pincode}<br />
            📞 {address.phone}
          </p>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
