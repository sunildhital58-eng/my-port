import React, { useState } from 'react';
import { useAdminStore } from '../store/adminStore';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setLoggedIn = useAdminStore((state) => state.setLoggedIn);

  const handleLogin = (e) => {
    e.preventDefault();
    const ADMIN_PASSWORD = '12345';

    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setPassword('');
      setError('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Admin Panel</h1>
        <p className="text-gray-600 text-center mb-6">Enter your password to continue</p>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Default password: <span className="font-mono text-gray-700">12345</span>
        </p>
      </div>
    </div>
  );
}
