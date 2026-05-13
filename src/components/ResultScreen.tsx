/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, animate } from 'motion/react';
import { Scores, getResultTitle, getResultDescription, calculateTotalScore } from '../utils/scoring';
import { User, UserCircle, RotateCcw, Trophy, TrendingUp, DollarSign, Heart, ShieldCheck, Footprints } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface ResultScreenProps {
  playerName: string;
  avatar: 'male' | 'female';
  scores: Scores;
  onRestart: () => void;
}

function Counter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplayValue(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue}</span>;
}

export default function ResultScreen({ playerName, avatar, scores, onRestart }: ResultScreenProps) {
  useEffect(() => {
    audioManager.play('success');
  }, []);

  const totalScore = calculateTotalScore(scores);
  const title = getResultTitle(totalScore);
  const description = getResultDescription(totalScore);

  const handleRestart = () => {
    audioManager.play('click');
    onRestart();
  };

  const stats = [
    { label: 'Community Trust', value: scores.trust, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Budget Health', value: scores.budget, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Ethical Stand', value: scores.ethics, icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Long-Term Impact', value: scores.impact, icon: Footprints, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Political Support', value: scores.support, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-parchment text-slate-900 font-sans lg:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-parliament rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[4rem] shadow-[0_80px_160px_-16px_rgba(26,42,68,0.25)] border border-slate-100 overflow-hidden"
        >
          <div className="bg-parliament px-16 py-24 text-white text-center relative overflow-hidden">
            <motion.div 
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: 12 }}
               transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
               className="absolute -bottom-12 -right-12 opacity-20 pointer-events-none"
            >
              <Trophy className="w-96 h-96 text-gold" />
            </motion.div>
            
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-gold via-white/30 to-gold" />

            <div className="relative z-10">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className="inline-flex items-center justify-center bg-white/5 p-8 rounded-[3rem] mb-10 backdrop-blur-xl border border-white/10 ring-12 ring-white/5"
              >
                {avatar === 'male' ? <User className="w-20 h-20 text-gold" /> : <UserCircle className="w-20 h-20 text-gold" />}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gold font-black uppercase tracking-[0.5em] text-[13px] mb-6">Legislative Archival Record • {playerName}</p>
                <h1 className="text-7xl font-serif font-black mb-8 leading-[0.9] tracking-tight">{title}</h1>
                <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed italic opacity-85">
                  "{description}"
                </p>
              </motion.div>
            </div>
          </div>

          <div className="p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20 pb-20 border-b border-slate-100">
               <div>
                 <p className="text-[12px] uppercase tracking-[0.4em] text-slate-400 font-black mb-4">Tenure Impact Rating</p>
                 <div className="flex items-baseline gap-4">
                   <span className="text-9xl font-serif font-black text-parliament">
                     <Counter value={totalScore} />
                   </span>
                   <span className="text-4xl font-bold text-gold opacity-50">/ 100</span>
                 </div>
               </div>
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 1 }}
                 className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 relative group overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ShieldCheck className="w-24 h-24" />
                  </div>
                  <p className="text-lg text-slate-500 leading-relaxed font-serif italic relative z-10">
                    "History will judge your decisions by the balance you maintained between the scales of progress and the weights of tradition."
                  </p>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + (i * 0.1) }}
                  whileHover={{ 
                    y: -12, 
                    boxShadow: "0 40px 80px -20px rgba(0,0,0,0.1)",
                    borderColor: i % 2 === 0 ? "#121d2f" : "#d4af37"
                  }}
                  className="flex flex-col gap-6 p-10 rounded-[3rem] bg-white border-2 border-slate-50 shadow-sm transition-all group"
                >
                  <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                      <span className={`text-2xl font-black ${stat.color}`}>
                        <Counter value={stat.value} />%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 border border-slate-200">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ delay: 1.8 + (i * 0.1), duration: 2, ease: "circOut" }}
                        className={`h-full rounded-full bg-current ${stat.color} shadow-[0_0_15px_rgba(0,0,0,0.1)]`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              whileHover={{ scale: 1.02, y: -4, gap: "2.5rem" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRestart}
              className="group w-full bg-parliament text-white py-8 rounded-[3rem] font-black flex items-center justify-center gap-6 hover:shadow-[0_32px_64px_-16px_rgba(212,175,55,0.4)] transition-all uppercase tracking-[0.6em] text-[13px] border-t-4 border-gold"
            >
              <RotateCcw className="w-6 h-6 text-gold group-hover:rotate-180 transition-transform duration-700" />
              Relinquish Power
            </motion.button>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5 }}
          className="mt-16 text-center text-slate-400 text-[11px] font-black uppercase tracking-[1.5em]"
        >
          ARCHIVED AT CITY HALL • PERMANENT RECORD
        </motion.p>
      </div>
    </div>
  );
}
