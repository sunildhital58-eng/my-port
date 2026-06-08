import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

const COLLECTIONS = {
  PROJECTS: 'projects',
  BLOGS: 'blogs',
  SERVICES: 'services',
  FAQS: 'faqs',
  SOCIAL_MEDIA: 'socialMedia',
  CONTACTS: 'contacts',
  HAPPY_CLIENTS: 'happyClients',
};

// Projects
export const addProject = async (projectData) => {
  return await addDoc(collection(db, COLLECTIONS.PROJECTS), {
    ...projectData,
    createdAt: new Date(),
  });
};

export const updateProject = async (id, projectData) => {
  return await updateDoc(doc(db, COLLECTIONS.PROJECTS, id), projectData);
};

export const deleteProject = async (id) => {
  return await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
};

export const getProjects = async () => {
  const q = query(collection(db, COLLECTIONS.PROJECTS), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Blogs
export const addBlog = async (blogData) => {
  return await addDoc(collection(db, COLLECTIONS.BLOGS), {
    ...blogData,
    createdAt: new Date(),
  });
};

export const updateBlog = async (id, blogData) => {
  return await updateDoc(doc(db, COLLECTIONS.BLOGS, id), blogData);
};

export const deleteBlog = async (id) => {
  return await deleteDoc(doc(db, COLLECTIONS.BLOGS, id));
};

export const getBlogs = async () => {
  const q = query(collection(db, COLLECTIONS.BLOGS), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Services
export const addService = async (serviceData) => {
  return await addDoc(collection(db, COLLECTIONS.SERVICES), serviceData);
};

export const updateService = async (id, serviceData) => {
  return await updateDoc(doc(db, COLLECTIONS.SERVICES, id), serviceData);
};

export const deleteService = async (id) => {
  return await deleteDoc(doc(db, COLLECTIONS.SERVICES, id));
};

export const getServices = async () => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.SERVICES));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// FAQs
export const addFAQ = async (faqData) => {
  return await addDoc(collection(db, COLLECTIONS.FAQS), faqData);
};

export const updateFAQ = async (id, faqData) => {
  return await updateDoc(doc(db, COLLECTIONS.FAQS, id), faqData);
};

export const deleteFAQ = async (id) => {
  return await deleteDoc(doc(db, COLLECTIONS.FAQS, id));
};

export const getFAQs = async () => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.FAQS));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Social Media
export const addSocialMedia = async (socialData) => {
  return await addDoc(collection(db, COLLECTIONS.SOCIAL_MEDIA), socialData);
};

export const updateSocialMedia = async (id, socialData) => {
  return await updateDoc(doc(db, COLLECTIONS.SOCIAL_MEDIA, id), socialData);
};

export const deleteSocialMedia = async (id) => {
  return await deleteDoc(doc(db, COLLECTIONS.SOCIAL_MEDIA, id));
};

export const getSocialMedia = async () => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.SOCIAL_MEDIA));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Contacts
export const addContact = async (contactData) => {
  return await addDoc(collection(db, COLLECTIONS.CONTACTS), {
    ...contactData,
    createdAt: new Date(),
  });
};

export const getContacts = async () => {
  const q = query(collection(db, COLLECTIONS.CONTACTS), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Happy Clients
export const addHappyClient = async (clientData) => {
  return await addDoc(collection(db, COLLECTIONS.HAPPY_CLIENTS), clientData);
};

export const updateHappyClient = async (id, clientData) => {
  return await updateDoc(doc(db, COLLECTIONS.HAPPY_CLIENTS, id), clientData);
};

export const deleteHappyClient = async (id) => {
  return await deleteDoc(doc(db, COLLECTIONS.HAPPY_CLIENTS, id));
};

export const getHappyClients = async () => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.HAPPY_CLIENTS));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Real-time listeners
export const subscribeToProjects = (callback) => {
  const q = query(collection(db, COLLECTIONS.PROJECTS), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(projects);
  });
};

export const subscribeToBlogs = (callback) => {
  const q = query(collection(db, COLLECTIONS.BLOGS), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(blogs);
  });
};
