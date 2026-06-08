import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhQwXqZXQnZXQnZXQnZXQnZXQnZXQ",
  authDomain: "portfliomm.firebaseapp.com",
  projectId: "portfliomm",
  storageBucket: "portfliomm.firebasestorage.app",
  messagingSenderId: "59623212807",
  appId: "1:59623212807:web:c79429bc4036e86263a7a2",
  measurementId: "G-FS5J24KTVZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
