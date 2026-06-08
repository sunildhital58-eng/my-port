import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/firebaseService';

export default function PortfolioProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="portfolio" id="portfolio">
      <div className="header-img"></div>
      
      <div className="grid-header">
        <div className="info">
          <p>ALL</p>
          <p>CODED</p>
          <p>DESIGNED</p>
        </div>
      </div>

      {loading ? (
        <div className="grid-port">
          <p className="text-center">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="grid-port">
          <div className="grid-col col1"></div>
          <div className="grid-col col2"></div>
          <div className="grid-col col3"></div>
          <div className="grid-col col4"></div>
          <div className="grid-col col5"></div>
          <div className="grid-col col6"></div>
        </div>
      ) : (
        <div className="grid-port">
          {projects.slice(0, 6).map((project, idx) => (
            <div
              key={project.id}
              className="grid-col"
              style={{
                backgroundImage: project.image ? `url(${project.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#c0c0c0',
              }}
              title={project.title}
            ></div>
          ))}
        </div>
      )}

      <div className="grid-header">
        <p>And many more to come!</p>
      </div>
    </section>
  );
}
