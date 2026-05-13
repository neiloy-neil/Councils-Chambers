/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { User, UserCircle, Shield, Settings, Landmark, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface StartScreenProps {
  onStart: (name: string, avatar: 'male' | 'female') => void;
  onAdmin: () => void;
}

const Particles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function StartScreen({ onStart, onAdmin }: StartScreenProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<'male' | 'female'>('male');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  const translateX = useTransform(springX, [0, 1200], [15, -15]);
  const translateY = useTransform(springY, [0, 800], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
      <Particles />
      
      {/* Dynamic Background */}
      <motion.div 
        style={{ x: translateX, y: translateY }}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-parliament/10 rounded-full blur-[150px]" />
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-parliament to-gold opacity-50" />
      
      {/* Decorative Ornaments with Parallax */}
      <motion.div 
        style={{ x: useTransform(translateX, [15, -15], [-30, 30]), y: useTransform(translateY, [15, -15], [-30, 30]) }}
        className="absolute top-12 left-12 opacity-15 hidden lg:block"
      >
        <Landmark className="w-40 h-40 text-parliament/40" />
      </motion.div>
      <motion.div 
        style={{ x: useTransform(translateX, [15, -15], [40, -40]), y: useTransform(translateY, [15, -15], [40, -40]) }}
        className="absolute bottom-12 right-12 opacity-15 hidden lg:block"
      >
        <Shield className="w-48 h-48 text-gold/40" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(26,42,68,0.15)] border border-white relative z-10"
      >
        <div className="flex justify-between items-start mb-8">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="bg-parliament p-4 rounded-2xl shadow-xl shadow-parliament/10"
          >
            <Shield className="text-gold w-8 h-8" />
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={onAdmin}
            className="p-3 text-slate-300 hover:text-parliament transition-colors bg-white rounded-xl border border-slate-100 shadow-sm"
            title="Admin Panel"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-serif font-black mb-4 tracking-tight text-parliament leading-[0.9]">
            Council <br />
            <span className="text-gold-gradient bg-gradient-to-r from-gold to-[#b08d48] bg-clip-text text-transparent">Chambers</span>
          </h1>
          <p className="text-slate-500 mb-8 text-lg font-medium leading-relaxed max-w-sm">
            Elected by the people. Guided by duty. Your term begins.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-3 ml-1">
              Designated Identity
            </label>
            <div className="relative group">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-6 py-4 rounded-[1.5rem] bg-slate-50/50 border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-parliament/5 focus:bg-white focus:border-gold transition-all text-lg font-bold text-parliament placeholder:text-slate-300 shadow-inner"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-3 ml-1">
              Portrait Selection
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => selectAvatar('male')}
                className={`group flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all relative overflow-hidden ${
                  avatar === 'male' ? 'border-parliament bg-parliament shadow-lg' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className={`p-4 rounded-full mb-3 z-10 transition-all ${avatar === 'male' ? 'bg-gold text-parliament scale-110' : 'bg-slate-50 text-slate-400 group-hover:text-parliament'}`}>
                  <User className="w-8 h-8" />
                </div>
                <span className={`text-[11px] font-black tracking-widest z-10 uppercase ${avatar === 'male' ? 'text-white' : 'text-slate-400'}`}>Statesman</span>
                {avatar === 'male' && (
                  <motion.div 
                    layoutId="avatar-glow"
                    className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent pointer-events-none"
                  />
                )}
              </motion.button>
              
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => selectAvatar('female')}
                className={`group flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all relative overflow-hidden ${
                  avatar === 'female' ? 'border-parliament bg-parliament shadow-lg' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className={`p-4 rounded-full mb-3 z-10 transition-all ${avatar === 'female' ? 'bg-gold text-parliament scale-110' : 'bg-slate-50 text-slate-400 group-hover:text-parliament'}`}>
                  <UserCircle className="w-8 h-8" />
                </div>
                <span className={`text-[11px] font-black tracking-widest z-10 uppercase ${avatar === 'female' ? 'text-white' : 'text-slate-400'}`}>Matriarch</span>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, backgroundColor: "#d4af37" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-parliament text-white py-5 rounded-[1.5rem] font-black text-sm transition-all shadow-xl shadow-parliament/20 hover:shadow-gold/30 flex items-center justify-center gap-3 uppercase tracking-[0.3em] relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />
            <span className="relative z-10">Accept Appointment</span>
            <ArrowRight className="w-4 h-4 text-gold group-hover/btn:translate-x-2 transition-transform" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
