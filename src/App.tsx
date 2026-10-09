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
import { TopHeader } from './components/TopHeader';
import Dashboard from './components/Dashboard';
import SiteCreator from './components/SiteCreator';
import Approaches from './components/Approaches';
import Objections from './components/Objections';
import Extensions from './components/Extensions';
import Settings from './components/Settings';
import Login from './components/Login';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

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
        <Loader2 className="animate-spin text-red-500" size={40} />
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
      case 'approaches': return <Approaches setView={setCurrentView} />;
      case 'objections': return <Objections />;
      case 'extensions': return <Extensions setView={setCurrentView} />;
      case 'settings': return <Settings />;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans relative selection:bg-red-500/30 selection:text-red-200">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black">
        {/* Unified Top Header for Desktop & Mobile */}
        <TopHeader 
          currentView={currentView} 
          setView={setCurrentView} 
          onOpenMobileMenu={() => setIsSidebarOpen(true)} 
        />

        <main className="flex-1 p-3 sm:p-6 md:p-8 lg:p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

