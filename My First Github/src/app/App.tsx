import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <Dashboard />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
