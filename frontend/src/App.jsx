// import React from 'react';
// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions.jsx';
import Analytics from './pages/Analytics.jsx';
import Upload from './pages/Upload.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  const { user, loading } = useAuth();

  const toastStyles = {
    position: "top-right",
    toastOptions: {
      duration: 4000,
      style: {
        background: '#e0f2fe', // light blue-gray
        color: '#1e3a8a', // dark blue text
        fontWeight: '500',
        fontSize: '14px',
      },
      success: {
        duration: 3000,
        style: {
          background: '#d1fae5', // soft green
          color: '#065f46',
        },
        iconTheme: {
          primary: '#10b981', // emerald green
          secondary: '#ffffff',
        },
      },
      error: {
        duration: 5000,
        style: {
          background: '#fee2e2', // light red
          color: '#991b1b',
        },
        iconTheme: {
          primary: '#dc2626', // red
          secondary: '#ffffff',
        },
      },
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster {...toastStyles} />
      </>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<Transactions isNew={true} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster {...toastStyles} />
    </div>
  );
}

export default App;
