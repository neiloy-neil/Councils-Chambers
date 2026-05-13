/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { User, UserCircle, Shield, Settings, Landmark, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface StartScreenProps {
  onStart: (name: string, avatar: 'male' | 'female') => void;
  onAdmin: () => void;
}

export default function StartScreen({ onStart, onAdmin }: StartScreenProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<'male' | 'female'>('male');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      audioManager.play('paper');
      onStart(name.trim(), avatar);
    }
  };

  const selectAvatar = (av: 'male' | 'female') => {
    setAvatar(av);
    audioManager.play('click');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-parchment overflow-hidden relative selection:bg-gold/20">
      {/* Dynamic Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-parliament/5 rounded-full blur-[150px]" />
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-parliament to-gold opacity-50" />
      
      {/* Decorative Ornaments */}
      <div className="absolute top-12 left-12 opacity-10 hidden lg:block">
        <Landmark className="w-32 h-32 text-parliament" />
      </div>
      <div className="absolute bottom-12 right-12 opacity-10 hidden lg:block">
        <Shield className="w-32 h-32 text-gold" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full bg-white/80 backdrop-blur-xl p-12 rounded-[4rem] shadow-[0_64px_128px_-16px_rgba(26,42,68,0.15)] border border-white relative z-10"
      >
        <div className="flex justify-between items-start mb-16">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="bg-parliament p-5 rounded-3xl shadow-2xl shadow-parliament/20"
          >
            <Shield className="text-gold w-10 h-10" />
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={onAdmin}
            className="p-4 text-slate-300 hover:text-parliament transition-colors bg-white rounded-2xl border border-slate-100 shadow-sm"
            title="Admin Panel"
          >
            <Settings className="w-6 h-6" />
          </motion.button>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
        >
          <h1 className="text-6xl font-serif font-black mb-6 tracking-tight text-parliament leading-[0.85]">
            Council <br />
            <span className="text-gold-gradient bg-gradient-to-r from-gold to-[#b08d48] bg-clip-text text-transparent">Chambers</span>
          </h1>
          <p className="text-slate-500 mb-12 text-xl font-medium leading-relaxed max-w-sm">
            Elected by the people. Guided by duty. Your term begins in the historic halls of governance.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gold mb-4 ml-1">
              Designated Identity
            </label>
            <div className="relative group">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-8 py-5 rounded-[2rem] bg-slate-50/50 border-2 border-slate-100 focus:outline-none focus:ring-8 focus:ring-parliament/5 focus:bg-white focus:border-gold transition-all text-xl font-bold text-parliament placeholder:text-slate-300 shadow-inner"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-[11px] font-black uppercase tracking-[0.3em] text-gold mb-4 ml-1">
              Portrait Selection
            </label>
            <div className="grid grid-cols-2 gap-8">
              <motion.button
                type="button"
                whileHover={{ y: -8 }}
                onClick={() => selectAvatar('male')}
                className={`group flex flex-col items-center justify-center p-8 rounded-[3rem] border-2 transition-all relative overflow-hidden ${
                  avatar === 'male' ? 'border-parliament bg-parliament shadow-[0_32px_64px_-16px_rgba(26,42,68,0.3)]' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className={`p-5 rounded-full mb-4 z-10 transition-all ${avatar === 'male' ? 'bg-gold text-parliament scale-110' : 'bg-slate-50 text-slate-400 group-hover:text-parliament group-hover:scale-105'}`}>
                  <User className="w-12 h-12" />
                </div>
                <span className={`text-sm font-black tracking-widest z-10 uppercase ${avatar === 'male' ? 'text-white' : 'text-slate-400'}`}>The Statesman</span>
                {avatar === 'male' && (
                  <motion.div 
                    layoutId="avatar-glow"
                    className="absolute inset-0 bg-gradient-to-t from-gold/30 to-transparent pointer-events-none"
                  />
                )}
              </motion.button>
              
              <motion.button
                type="button"
                whileHover={{ y: -8 }}
                onClick={() => selectAvatar('female')}
                className={`group flex flex-col items-center justify-center p-8 rounded-[3rem] border-2 transition-all relative overflow-hidden ${
                  avatar === 'female' ? 'border-parliament bg-parliament shadow-[0_32px_64px_-16px_rgba(26,42,68,0.3)]' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className={`p-5 rounded-full mb-4 z-10 transition-all ${avatar === 'female' ? 'bg-gold text-parliament scale-110' : 'bg-slate-50 text-slate-400 group-hover:text-parliament group-hover:scale-105'}`}>
                  <UserCircle className="w-12 h-12" />
                </div>
                <span className={`text-sm font-black tracking-widest z-10 uppercase ${avatar === 'female' ? 'text-white' : 'text-slate-400'}`}>The Matriarch</span>
                {avatar === 'female' && (
                  <motion.div 
                    layoutId="avatar-glow"
                    className="absolute inset-0 bg-gradient-to-t from-gold/30 to-transparent pointer-events-none"
                  />
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02, y: -4, backgroundColor: "#d4af37" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-parliament text-white py-8 rounded-[3rem] font-black text-xl transition-all shadow-3xl shadow-parliament/30 hover:shadow-gold/40 flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-[13px] relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
            <span className="relative z-10">Accept Appointment</span>
            <ArrowRight className="w-5 h-5 text-gold group-hover/btn:translate-x-3 transition-transform" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
