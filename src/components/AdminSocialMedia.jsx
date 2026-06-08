import React, { useState, useEffect } from 'react';
import { getSocialMedia, addSocialMedia, updateSocialMedia, deleteSocialMedia } from '../services/firebaseService';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function AdminSocialMedia() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: '',
  });

  useEffect(() => {
    loadSocialMedia();
  }, []);

  const loadSocialMedia = async () => {
    try {
      setLoading(true);
      const data = await getSocialMedia();
      setSocials(data);
    } catch (error) {
      console.error('Error loading social media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) {
      alert('Name and URL are required');
      return;
    }

    try {
      if (editingId) {
        await updateSocialMedia(editingId, formData);
        setEditingId(null);
      } else {
        await addSocialMedia(formData);
      }
      setFormData({ name: '', url: '', icon: '' });
      loadSocialMedia();
    } catch (error) {
      console.error('Error saving social media:', error);
      alert('Error saving social media');
    }
  };

  const handleEdit = (social) => {
    setFormData({
      name: social.name,
      url: social.url,
      icon: social.icon || '',
    });
    setEditingId(social.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this social media link?')) {
      try {
        await deleteSocialMedia(id);
        loadSocialMedia();
      } catch (error) {
        console.error('Error deleting social media:', error);
        alert('Error deleting social media');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Social Media</h2>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          {editingId ? 'Edit Social Media' : 'Add New Social Media'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Platform Name (Facebook, Twitter, etc.)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="url"
              placeholder="URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <input
            type="text"
            placeholder="Icon (emoji or icon name)"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', url: '', icon: '' });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Social Media List */}
      <div className="grid gap-4 md:grid-cols-2">
        {loading ? (
          <p className="text-center text-gray-600">Loading social media...</p>
        ) : socials.length === 0 ? (
          <p className="text-center text-gray-600">No social media links yet. Add one to get started!</p>
        ) : (
          socials.map((social) => (
            <div key={social.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {social.icon && <span className="text-2xl">{social.icon}</span>}
                    <h3 className="text-lg font-semibold text-gray-800">{social.name}</h3>
                  </div>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                    {social.url}
                  </a>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(social)}
                  className="flex-1 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                >
                  <Edit2 size={16} className="inline mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(social.id)}
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
