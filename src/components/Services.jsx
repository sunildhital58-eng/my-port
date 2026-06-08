import React, { useState, useEffect } from 'react';
import { getServices } from '../services/firebaseService';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <section className="aboutme container" id="services">
      <div className="header-info">
        <h4>ABOUT ME</h4>
        <p>What I can do for your business and projects. I offer professional development and maintenance services tailored to your needs.</p>
        <h6>EXPLORE</h6>
        <img src="/separator.png" alt="separator" />
      </div>

      {loading ? (
        <p className="text-center">Loading services...</p>
      ) : services.length === 0 ? (
        <div className="grid-about">
          <div className="columns">
            <h6>DEVELOPMENT</h6>
            <p>I can design the site based on your needs and suggestions. I can also design the site from scratch and consult you during the job.</p>
          </div>
          <div className="columns">
            <h6>MAINTENANCE</h6>
            <p>I can design the site based on your needs and suggestions. I can also design the site from scratch and consult you during the job.</p>
          </div>
        </div>
      ) : (
        <div className="grid-about">
          {services.map((service) => (
            <div key={service.id} className="columns">
              <h6>{service.title}</h6>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      )}
      
      <img src="/separator.png" alt="separator" />
    </section>
  );
}
