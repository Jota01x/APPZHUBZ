import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { storage } from '../lib/storage';

const NotificationWidget: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<{id: number, text: string} | null>(null);
  
  const scheduleNotifications = () => {
    if (isActive) return;
    setIsActive(true);
    
    const price = storage.getSalePrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const msgs = [
      `Venda realizada: R$ ${price} nicho Advocacia`,
      `Venda realizada: R$ ${price} nicho Estética`,
      `Venda realizada: R$ ${price} nicho Delivery`
    ];

    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    const id = Date.now();
    
    setTimeout(() => {
      setCurrentNotification({ id, text: msg });
      
      // Increment sale in dashboard
      storage.incrementSales();
      // Dispatch event for dashboard to refresh
      window.dispatchEvent(new Event('dashboard-refresh'));
      
      // Auto-remove after 7 seconds
      setTimeout(() => {
        setCurrentNotification(null);
        setIsActive(false);
      }, 7000);
    }, 10000); // 10s wait after click as requested
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
        <AnimatePresence mode="wait">
          {currentNotification && (
            <motion.div
              key={currentNotification.id}
              initial={{ opacity: 0, y: -20, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="bg-zinc-900 border border-indigo-500/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[280px] pointer-events-auto"
            >
              <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-500">
                 <ShoppingBag size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-zinc-100 uppercase tracking-tighter leading-tight">
                  {currentNotification.text}
                </p>
                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Agora mesmo</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Static Trigger Button - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-[101]">
        <button
          onClick={scheduleNotifications}
          className={`w-2 h-2 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer shadow-lg active:scale-95 ${isActive ? 'pointer-events-none opacity-20' : 'opacity-100'}`}
          title="Ativar Protocolo"
        />
      </div>
    </>
  );
};

export default NotificationWidget;
