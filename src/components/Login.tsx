import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../lib/storage';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleLogin = () => {
    if (password === '4080') {
      storage.setUser({
        uid: 'dev-user-123',
        displayName: 'User Novo',
        email: 'admin@sitepro.io'
      });
      window.location.reload();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] -ml-48 -mb-48"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-zinc-900 p-12 rounded-[2.5rem] border border-zinc-800 shadow-2xl text-center space-y-10 relative z-10"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter text-zinc-100 uppercase leading-tight">
            APPZ<span className="text-indigo-500">HUB</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Arquitetura de alta performance</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="DIGITE A CHAVE DE ACESSO"
                className={`w-full p-5 bg-zinc-950 border ${error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-zinc-800 focus:border-indigo-600'} rounded-2xl text-white outline-none transition-all font-black text-center text-xs tracking-[0.3em] placeholder:text-zinc-800`}
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-[8px] font-black uppercase tracking-widest mt-2"
                >
                  Chave Inválida. Tente novamente.
                </motion.p>
              )}
            </div>

            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center space-x-4 bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.25em] text-[10px] hover:bg-indigo-700 transition-all shadow-xl active:scale-[0.98]"
            >
              <LogIn size={16} />
              <span>Acessar Núcleo</span>
            </button>
          </div>

          <div className="p-8 bg-zinc-950/50 border border-zinc-800 rounded-3xl text-left space-y-4">
            <div className="flex items-center space-x-4 group">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Arquitetura de Ativos Únicos</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
          Protocolo de segurança APPZHUB v2.4.0 ativo
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
