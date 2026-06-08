import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAdminStore } from './store/adminStore';
import Header from './components/Header';
import Hero from './components/Hero';
import BerriesSection from './components/BerriesSection';
import Services from './components/Services';
import PortfolioProjects from './components/PortfolioProjects';
import Blogs from './components/Blogs';
import HappyClients from './components/HappyClients';
import FAQSection from './components/FAQSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);

  return (
    <Router>
      <Routes>
        {/* Portfolio Website */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <BerriesSection />
              <Services />
              <PortfolioProjects />
              <Blogs />
              <HappyClients />
              <FAQSection />
              <ContactForm />
              <Footer />
            </>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminDashboard /> : <AdminLogin />}
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
