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
    <footer>
      <div className="container footer-info">
        <div className="scroll-up">
          <a href="#"><i className="fas fa-angle-up"></i></a>
          <h6>BACK TO TOP</h6>
        </div>
        
        <div className="social">
          {socialMedia && socialMedia.length > 0 ? (
            socialMedia.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
              >
                <i className={`fab fa-${social.platform || social.name.toLowerCase()}`}></i>
              </a>
            ))
          ) : (
            <>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </>
          )}
        </div>
        
        <p>&copy; {currentYear} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
