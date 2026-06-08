import React, { useState, useEffect } from 'react';
import { getHappyClients, addHappyClient, updateHappyClient, deleteHappyClient } from '../services/firebaseService';
import { Trash2, Edit2, Plus, Star } from 'lucide-react';

export default function AdminHappyClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    testimonial: '',
    rating: 5,
    image: '',
    company: '',
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await getHappyClients();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.testimonial) {
      alert('Name and testimonial are required');
      return;
    }

    try {
      if (editingId) {
        await updateHappyClient(editingId, {
          ...formData,
          rating: parseInt(formData.rating),
        });
        setEditingId(null);
      } else {
        await addHappyClient({
          ...formData,
          rating: parseInt(formData.rating),
        });
      }
      setFormData({ name: '', testimonial: '', rating: 5, image: '', company: '' });
      loadClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Error saving client');
    }
  };

  const handleEdit = (client) => {
    setFormData({
      name: client.name,
      testimonial: client.testimonial,
      rating: client.rating || 5,
      image: client.image || '',
      company: client.company || '',
    });
    setEditingId(client.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client testimonial?')) {
      try {
        await deleteHappyClient(id);
        loadClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Error deleting client');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Happy Clients</h2>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder="Company (optional)"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <textarea
            placeholder="Testimonial"
            value={formData.testimonial}
            onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars</option>
              <option value="3">⭐⭐⭐ 3 Stars</option>
              <option value="2">⭐⭐ 2 Stars</option>
              <option value="1">⭐ 1 Star</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              {editingId ? 'Update Testimonial' : 'Add Testimonial'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', testimonial: '', rating: 5, image: '', company: '' });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Clients List */}
      <div className="grid gap-4 md:grid-cols-2">
        {loading ? (
          <p className="text-center text-gray-600">Loading clients...</p>
        ) : clients.length === 0 ? (
          <p className="text-center text-gray-600">No testimonials yet. Add one to get started!</p>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
                  {client.company && <p className="text-sm text-gray-600">{client.company}</p>}
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < client.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4">{client.testimonial}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="flex-1 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                >
                  <Edit2 size={16} className="inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  <Trash2 size={16} className="inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
