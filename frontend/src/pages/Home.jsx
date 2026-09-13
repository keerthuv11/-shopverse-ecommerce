import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports & Fitness', 'Toys', 'Beauty & Personal Care'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [keyword, setKeyword] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (keyword) params.keyword = keyword;
      const { data } = await api.get('/products', { params });
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, keyword]);

  return (
    <div>
      {/* Hero Banner */}
      <section className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Shop Everything You Love ✨</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Electronics, fashion, home essentials & more — great prices, fast delivery, easy tracking.
          </p>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-full py-3 pl-12 pr-4 text-gray-800 focus:outline-none shadow-lg"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              category === cat
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
