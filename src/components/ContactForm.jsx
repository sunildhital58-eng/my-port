import React, { useState } from 'react';
import { addContact } from '../services/firebaseService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await addContact(formData);
      
      // Send to WhatsApp
      const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone || 'N/A'}%0A%0AMessage:%0A${formData.message}`;
      window.open(`https://wa.me/?text=${message}`, '_blank');

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error submitting contact:', err);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact container" id="contact">
      <div className="header-info">
        <h4>CONTACT</h4>
        <p>Send me a message and I will get back to you as soon as possible!</p>
        <h6>EXPLORE</h6>
        <img src="/separator.png" alt="separator" />
      </div>

      {success && (
        <div style={{ textAlign: 'center', color: 'green', marginBottom: '1rem' }}>
          Thank you! Your message has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="ENTER YOUR NAME*"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="ENTER YOUR EMAIL*"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="YOUR PHONE"
        />
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          id="comment"
          placeholder="YOUR MESSAGE*"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>
    </section>
  );
}
