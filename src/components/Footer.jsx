import React, { useState, useEffect } from 'react';
import { getSocialMedia } from '../services/firebaseService';

export default function Footer() {
  const [socialMedia, setSocialMedia] = useState([]);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const loadSocialMedia = async () => {
      try {
        const data = await getSocialMedia();
        setSocialMedia(data);
      } catch (error) {
        console.error('Error loading social media:', error);
      }
    };

    loadSocialMedia();
  }, []);

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Me</h3>
            <p className="text-blue-100">
              I am a passionate developer creating amazing web experiences for clients worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#portfolio" className="text-blue-100 hover:text-white transition">Portfolio</a></li>
              <li><a href="#services" className="text-blue-100 hover:text-white transition">Services</a></li>
              <li><a href="#blogs" className="text-blue-100 hover:text-white transition">Blogs</a></li>
              <li><a href="#contact" className="text-blue-100 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              {socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-blue-200 transition"
                  title={social.name}
                >
                  {social.icon || '🔗'}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100">
              &copy; {currentYear} My Portfolio. All rights reserved.
            </p>
            <p className="text-blue-100 text-sm mt-4 md:mt-0">
              Built with <span className="text-red-400">❤</span> by Me
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
