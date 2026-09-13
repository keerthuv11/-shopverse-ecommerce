import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import api from '../api/axios';

const emptyForm = { name: '', description: '', price: '', image: '', category: '', stock: '', brand: '' };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await api.get('/products');
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setForm({
      name: product.name, description: product.description, price: product.price,
      image: product.image, category: product.category, stock: product.stock, brand: product.brand
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product created');
      }
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold gradient-text">Manage Products</h1>
        <button onClick={openAddForm} className="btn-primary flex items-center gap-2">
          <FiPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading products...</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-4"><img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" /></td>
                  <td className="p-4 font-medium text-gray-800">{p.name}</td>
                  <td className="p-4 text-gray-500">{p.category}</td>
                  <td className="p-4 font-semibold">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => openEditForm(p)} className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200"><FiEdit2 size={14} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><FiTrash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <FiX size={22} />
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" required placeholder="Product Name" value={form.name} onChange={handleChange} className="input-field" />
              <textarea name="description" required placeholder="Description" value={form.description} onChange={handleChange} className="input-field" rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <input name="price" type="number" required placeholder="Price (₹)" value={form.price} onChange={handleChange} className="input-field" />
                <input name="stock" type="number" required placeholder="Stock Qty" value={form.stock} onChange={handleChange} className="input-field" />
              </div>
              <input name="category" required placeholder="Category" value={form.category} onChange={handleChange} className="input-field" />
              <input name="image" required placeholder="Image URL" value={form.image} onChange={handleChange} className="input-field" />
              <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="input-field" />
              <button type="submit" className="btn-primary w-full mt-2">{editingId ? 'Update Product' : 'Create Product'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
