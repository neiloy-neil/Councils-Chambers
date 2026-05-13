/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Scores, getResultTitle, getResultDescription, calculateTotalScore } from '../utils/scoring';
import { User, UserCircle, RotateCcw, Trophy, TrendingUp, DollarSign, Heart, ShieldCheck, Footprints } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface ResultScreenProps {
  playerName: string;
  avatar: 'male' | 'female';
  scores: Scores;
  onRestart: () => void;
}

export default function ResultScreen({ playerName, avatar, scores, onRestart }: ResultScreenProps) {
  useEffect(() => {
    // Play thematic success sound on conclusion
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
    { label: 'Ethics', value: scores.ethics, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Long-Term Impact', value: scores.impact, icon: Footprints, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Political Support', value: scores.support, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-parchment text-slate-900 font-sans lg:py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[3.5rem] shadow-[0_64px_128px_-16px_rgba(26,42,68,0.15)] border border-slate-100 overflow-hidden"
        >
          <div className="bg-parliament px-12 py-20 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Trophy className="w-96 h-96 absolute -bottom-24 -right-24 transform rotate-12 text-gold" />
            </div>
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-white/20 to-gold" />

            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative z-10"
            >
              <div className="inline-flex items-center justify-center bg-white/5 p-6 rounded-[2.5rem] mb-8 backdrop-blur-md border border-white/10 ring-8 ring-white/5 group transition-all hover:ring-gold/20">
                {avatar === 'male' ? <User className="w-16 h-16 text-gold" /> : <UserCircle className="w-16 h-16 text-gold" />}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gold font-black uppercase tracking-[0.4em] text-[12px] mb-4">Official Term Summary for {playerName}</p>
                <h1 className="text-6xl font-serif font-black mb-6 leading-tight">{title}</h1>
                <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed italic opacity-80">
                  "{description}"
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 pb-16 border-b border-slate-100">
               <div>
                 <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-2">Aggregate Civic Performance</p>
                 <div className="flex items-baseline gap-2">
                   <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-8xl font-serif font-black text-parliament"
                   >
                     {totalScore}
                   </motion.span>
                   <span className="text-2xl font-bold text-gold">/ 100</span>
                 </div>
               </div>
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    "This score reflects the complex balance of economic stability, public trust, and ethical governance achieved during your landmark tenure."
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                  className="flex flex-col gap-4 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 group"
                >
                  <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-current/5 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <span className={`text-lg font-black ${stat.color}`}>{stat.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ delay: 1.5 + (i * 0.1), duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full bg-current ${stat.color}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRestart}
              className="w-full bg-parliament text-white py-6 rounded-[2rem] font-black flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-parliament/20 transition-all uppercase tracking-[0.4em] text-xs"
            >
              <RotateCcw className="w-5 h-5 text-gold" />
              Retire from Public Service
            </motion.button>
          </div>
        </motion.div>

        <p className="mt-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-[1em] opacity-40">
          ARCHIVED AT CITY HALL • PERMANENT RECORD
        </p>
      </div>
    </div>
  );
}
