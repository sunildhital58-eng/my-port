import React, { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import AdminProjects from './AdminProjects';
import AdminBlogs from './AdminBlogs';
import AdminServices from './AdminServices';
import AdminFAQs from './AdminFAQs';
import AdminSocialMedia from './AdminSocialMedia';
import AdminContacts from './AdminContacts';
import AdminHappyClients from './AdminHappyClients';
import { LogOut, Menu, X } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const setLoggedIn = useAdminStore((state) => state.setLoggedIn);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setLoggedIn(false);
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'blogs', label: 'Blogs', icon: '📝' },
    { id: 'services', label: 'Services', icon: '💼' },
    { id: 'faqs', label: 'FAQs', icon: '❓' },
    { id: 'social', label: 'Social Media', icon: '🔗' },
    { id: 'clients', label: 'Happy Clients', icon: '😊' },
    { id: 'contacts', label: 'Contact Requests', icon: '📧' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-blue-900 text-white overflow-y-auto transition-all duration-300`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-blue-700 font-semibold'
                    : 'hover:bg-blue-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-md p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'projects' && <AdminProjects />}
          {activeTab === 'blogs' && <AdminBlogs />}
          {activeTab === 'services' && <AdminServices />}
          {activeTab === 'faqs' && <AdminFAQs />}
          {activeTab === 'social' && <AdminSocialMedia />}
          {activeTab === 'clients' && <AdminHappyClients />}
          {activeTab === 'contacts' && <AdminContacts />}
        </div>
      </div>
    </div>
  );
}
