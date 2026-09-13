import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-24 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center py-24 text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-600 font-medium mb-6 hover:underline">
        <FiArrowLeft /> Back
      </button>
      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-card p-6 md:p-10">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-2xl" />
        <div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-100 text-primary-700">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-3">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            <FiStar className="fill-yellow-400" />
            <span className="text-gray-600 text-sm">{product.rating} rating ({product.numReviews} reviews)</span>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <div className="text-4xl font-extrabold gradient-text mt-6">₹{product.price.toLocaleString('en-IN')}</div>
          <p className={`mt-2 text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold">-</button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="px-4 py-2 text-lg font-bold">+</button>
            </div>
            <button
              onClick={() => addToCart(product, qty)}
              disabled={product.stock === 0}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <FiShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
