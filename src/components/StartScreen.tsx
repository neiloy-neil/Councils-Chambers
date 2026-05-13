/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { User, UserCircle, Shield, Settings } from 'lucide-react';

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
      onStart(name.trim(), avatar);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-parchment overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-parliament to-gold" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-parliament/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full bg-white p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(26,42,68,0.1)] border border-slate-100 relative z-10"
      >
        <div className="flex justify-between items-start mb-12">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="bg-parliament p-4 rounded-2xl shadow-xl shadow-parliament/20"
          >
            <Shield className="text-gold w-8 h-8" />
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={onAdmin}
            className="p-3 text-slate-300 hover:text-parliament transition-colors bg-slate-50 rounded-xl"
            title="Admin Panel"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-serif font-black mb-6 tracking-tight text-parliament leading-[0.9]">
            Council <br />
            <span className="text-gold">Chambers</span>
          </h1>
          <p className="text-slate-500 mb-12 text-lg font-medium leading-relaxed max-w-sm">
            Elected by the people. Guided by duty. Your term begins in the historic halls of governance.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3 ml-1">
              Designated Identity
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Johnson"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-parliament/5 focus:bg-white focus:border-gold transition-all text-lg font-semibold text-parliament placeholder:text-slate-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3 ml-1">
              Portrait Selection
            </label>
            <div className="grid grid-cols-2 gap-6">
              <motion.button
                type="button"
                whileHover={{ y: -5 }}
                onClick={() => setAvatar('male')}
                className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all relative overflow-hidden group ${
                  avatar === 'male' ? 'border-parliament bg-parliament shadow-2xl shadow-parliament/20' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className={`p-4 rounded-full mb-3 z-10 transition-colors ${avatar === 'male' ? 'bg-gold text-parliament' : 'bg-slate-100 text-slate-400 group-hover:text-parliament'}`}>
                  <User className="w-10 h-10" />
                </div>
                <span className={`text-sm font-bold tracking-wide z-10 ${avatar === 'male' ? 'text-white' : 'text-slate-500'}`}>Honorable Male</span>
                {avatar === 'male' && (
                  <motion.div 
                    layoutId="avatar-glow"
                    className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent pointer-events-none"
                  />
                )}
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -5 }}
                onClick={() => setAvatar('female')}
                className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all relative overflow-hidden group ${
                  avatar === 'female' ? 'border-parliament bg-parliament shadow-2xl shadow-parliament/20' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className={`p-4 rounded-full mb-3 z-10 transition-colors ${avatar === 'female' ? 'bg-gold text-parliament' : 'bg-slate-100 text-slate-400 group-hover:text-parliament'}`}>
                  <UserCircle className="w-10 h-10" />
                </div>
                <span className={`text-sm font-bold tracking-wide z-10 ${avatar === 'female' ? 'text-white' : 'text-slate-500'}`}>Honorable Female</span>
                {avatar === 'female' && (
                  <motion.div 
                    layoutId="avatar-glow"
                    className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent pointer-events-none"
                  />
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, backgroundColor: "#c5a059" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-parliament text-white py-5 rounded-[2rem] font-bold text-xl transition-all shadow-2xl shadow-parliament/30 hover:shadow-gold/30 flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[12px]"
          >
            Accept Appointment
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
