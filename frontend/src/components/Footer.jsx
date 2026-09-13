import React from 'react';

const Footer = () => (
  <footer className="gradient-bg text-white mt-16">
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-2xl font-extrabold mb-2">🛍️ ShopVerse</h3>
        <p className="text-white/80 text-sm">Your one-stop shop for electronics, fashion, home essentials and more — all at prices you'll love.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Quick Links</h4>
        <ul className="text-white/80 text-sm space-y-1">
          <li>About Us</li>
          <li>Contact</li>
          <li>Track Order</li>
          <li>Return Policy</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Get in Touch</h4>
        <p className="text-white/80 text-sm">support@shopverse.com</p>
        <p className="text-white/80 text-sm">+91 98765 43210</p>
      </div>
    </div>
    <div className="text-center text-white/70 text-xs pb-4">
      © {new Date().getFullYear()} ShopVerse. Built for learning purposes — a full-stack demo project.
    </div>
  </footer>
);

export default Footer;
