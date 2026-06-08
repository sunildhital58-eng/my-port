import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="bg-img">
        <img src="/bg.png" alt="background" />
      </div>
      
      <div className="hero-top container">
        <div className="content">
          <div className="info">
            <h1>Hi, I am</h1>
            <h2>Your Name</h2>
            <h6>Full Stack Developer</h6>
          </div>
          
          <div className="contact-me">
            <a href="https://api.whatsapp.com/send/?phone=YOUR_NUMBER" target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        
        <div className="person-img">
          <img src="/person.png" alt="person" />
        </div>
      </div>
    </section>
  );
}
