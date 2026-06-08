import { create } from 'zustand';

export const useAdminStore = create((set) => ({
  isLoggedIn: localStorage.getItem('adminLoggedIn') === 'true',
  setLoggedIn: (value) => {
    localStorage.setItem('adminLoggedIn', value);
    set({ isLoggedIn: value });
  },
  
  portfolioData: {
    projects: [],
    blogs: [],
    cv: null,
    workProcess: [],
    services: [],
    faqs: [],
    contacts: [],
    happyClients: [],
    socialMedia: [],
  },
  
  setPortfolioData: (data) => set({ portfolioData: data }),
  updateProjects: (projects) => set((state) => ({
    portfolioData: { ...state.portfolioData, projects }
  })),
  updateBlogs: (blogs) => set((state) => ({
    portfolioData: { ...state.portfolioData, blogs }
  })),
  updateServices: (services) => set((state) => ({
    portfolioData: { ...state.portfolioData, services }
  })),
  updateFAQs: (faqs) => set((state) => ({
    portfolioData: { ...state.portfolioData, faqs }
  })),
  updateSocialMedia: (socialMedia) => set((state) => ({
    portfolioData: { ...state.portfolioData, socialMedia }
  })),
}));
