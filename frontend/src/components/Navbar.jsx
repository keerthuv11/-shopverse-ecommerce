import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiPackage, FiGrid, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemsCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 gradient-bg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tight">
            🛍️ ShopVerse
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-white font-medium">
            <Link to="/" className="hover:text-yellow-200 transition-colors">Home</Link>
            {user && !isAdmin && (
              <Link to="/orders" className="hover:text-yellow-200 transition-colors flex items-center gap-1">
                <FiPackage /> My Orders
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="hover:text-yellow-200 transition-colors flex items-center gap-1">
                <FiGrid /> Admin Panel
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            {!isAdmin && (
              <Link to="/cart" className="relative text-white hover:text-yellow-200 transition-colors">
                <FiShoppingCart size={22} />
                {itemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemsCount}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3 text-white">
                <span className="flex items-center gap-1 font-medium">
                  <FiUser /> {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-sm transition-colors"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-white text-purple-700 font-semibold px-4 py-1.5 rounded-full hover:bg-yellow-100 transition-colors">
                Login
              </Link>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3 text-white font-medium">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            {!isAdmin && (
              <Link to="/cart" onClick={() => setOpen(false)}>Cart ({itemsCount})</Link>
            )}
            {user && !isAdmin && <Link to="/orders" onClick={() => setOpen(false)}>My Orders</Link>}
            {isAdmin && <Link to="/admin" onClick={() => setOpen(false)}>Admin Panel</Link>}
            {user ? (
              <button onClick={() => { handleLogout(); setOpen(false); }} className="text-left">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
