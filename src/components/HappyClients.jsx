import React, { useState, useEffect } from 'react';
import { getHappyClients } from '../services/firebaseService';
import { Star } from 'lucide-react';

export default function HappyClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await getHappyClients();
        setClients(data);
      } catch (error) {
        console.error('Error loading clients:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  return (
    <section id="clients" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Happy Clients</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading testimonials...</p>
        ) : clients.length === 0 ? (
          <p className="text-center text-gray-600">No testimonials yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center mb-4">
                  {client.image && (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-600">{client.company}</p>
                    )}
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

                <p className="text-gray-600 italic">"{client.testimonial}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
