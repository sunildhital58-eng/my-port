import React, { useState, useEffect } from 'react';
import { getContacts } from '../services/firebaseService';
import { Trash2, Mail } from 'lucide-react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsApp = (contact) => {
    const message = `Name: ${contact.name}%0AEmail: ${contact.email}%0ALocation: ${contact.location || 'N/A'}%0ABudget: ${contact.budget || 'N/A'}%0ASubject: ${contact.subject}%0A%0AMessage:%0A${contact.message}`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Requests</h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-blue-700 text-sm">
          Total requests: <span className="font-bold">{contacts.length}</span>
        </p>
      </div>

      {/* Contacts List */}
      <div className="grid gap-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-600">No contact requests yet.</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-800">{contact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{contact.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg font-semibold text-gray-800">{contact.location || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="text-lg font-semibold text-gray-800">{contact.budget || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="text-base font-semibold text-gray-800 mb-2">{contact.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Message</p>
                <p className="text-gray-600 bg-gray-50 p-3 rounded mt-2">{contact.message}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => sendWhatsApp(contact)}
                  className="flex-1 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Send via WhatsApp
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
