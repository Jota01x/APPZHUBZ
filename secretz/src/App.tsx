/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { storage } from './lib/storage';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SiteCreator from './components/SiteCreator';
import Extensions from './components/Extensions';
import Settings from './components/Settings';
import Login from './components/Login';
import Referral from './components/Referral';
import NotificationWidget from './components/NotificationWidget';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Menu } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = storage.getUser();
    setUser(savedUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard setView={setCurrentView} />;
      case 'sites': return <SiteCreator setView={setCurrentView} />;
      case 'extensions': return <Extensions setView={setCurrentView} />;
      case 'referral': return <Referral />;
      case 'settings': return <Settings />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-zinc-100 font-sans relative">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="lg:hidden font-bold tracking-tight uppercase text-sm">APPZ<span className="text-indigo-500">HUB</span></span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
        
        <NotificationWidget />
      </div>
    </div>
  );
}

