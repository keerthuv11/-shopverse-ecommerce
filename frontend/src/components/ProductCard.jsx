import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const categoryColors = {
  Electronics: 'bg-indigo-100 text-indigo-700',
  Fashion: 'bg-pink-100 text-pink-700',
  'Home & Kitchen': 'bg-emerald-100 text-emerald-700',
  Books: 'bg-violet-100 text-violet-700',
  'Sports & Fitness': 'bg-red-100 text-red-700',
  Toys: 'bg-orange-100 text-orange-700',
  'Beauty & Personal Care': 'bg-rose-100 text-rose-700'
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card overflow-hidden flex flex-col group">
      <Link to={`/product/${product._id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${categoryColors[product.category] || 'bg-gray-100 text-gray-700'}`}>
          {product.category}
        </span>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 text-sm text-yellow-500">
          <FiStar className="fill-yellow-400" />
          <span className="text-gray-600">{product.rating} ({product.numReviews})</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white p-2.5 rounded-full shadow transition-colors"
            title="Add to cart"
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
        {product.stock === 0 && (
          <span className="text-red-500 text-xs font-semibold mt-1">Out of stock</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
