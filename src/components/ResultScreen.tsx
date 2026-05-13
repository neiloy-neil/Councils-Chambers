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
    { label: 'Trust', value: scores.trust, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Budget', value: scores.budget, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Ethics', value: scores.ethics, icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Impact', value: scores.impact, icon: Footprints, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Support', value: scores.support, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-parchment text-slate-900 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gold rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-parliament rounded-full blur-[80px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10 py-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden"
        >
          <div className="bg-parliament px-12 py-16 text-white text-center relative overflow-hidden">
            <motion.div 
               initial={{ scale: 0, rotate: 12 }}
               animate={{ scale: 1, rotate: 12 }}
               transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
               className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none"
            >
              <Trophy className="w-64 h-64 text-gold" />
            </motion.div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className="inline-flex items-center justify-center bg-white/5 p-5 rounded-[2rem] mb-6 backdrop-blur-xl border border-white/10 ring-8 ring-white/5"
              >
                {avatar === 'male' ? <User className="w-12 h-12 text-gold" /> : <UserCircle className="w-12 h-12 text-gold" />}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-3">Legislative Record • {playerName}</p>
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight tracking-tight">{title}</h1>
                <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed italic opacity-80">
                  "{description}"
                </p>
              </motion.div>
            </div>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10 pb-10 border-b border-slate-100">
               <div className="text-center md:text-left">
                 <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-2">Tenure Rating</p>
                 <div className="flex items-baseline justify-center md:justify-start gap-2">
                   <span className="text-6xl font-serif font-black text-parliament">
                     <Counter value={totalScore} />
                   </span>
                   <span className="text-xl font-bold text-gold opacity-50">/ 100</span>
                 </div>
               </div>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic"
               >
                  <p className="text-sm text-slate-500 leading-relaxed font-serif">
                    "History will judge your decisions by the balance you maintained between progress and tradition."
                  </p>
               </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (i * 0.08) }}
                  className="flex flex-col gap-3 p-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm transition-all group hover:border-parliament/20"
                >
                  <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center shadow-sm`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-col mb-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                      <span className={`text-lg font-black ${stat.color}`}>
                        <Counter value={stat.value} />%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ delay: 1.5 + (i * 0.08), duration: 1.5, ease: "circOut" }}
                        className={`h-full rounded-full bg-current ${stat.color}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex flex-col gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#0e1828" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRestart}
                className="group w-full bg-parliament text-white py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all uppercase tracking-[0.3em] text-[11px] border-t-2 border-gold shadow-lg"
              >
                <RotateCcw className="w-4 h-4 text-gold group-hover:rotate-180 transition-transform duration-700" />
                Relinquish Power
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
                onClick={handleRestart}
                className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-400 hover:text-parliament transition-all py-1 text-center"
              >
                Return to Headquarters
              </motion.button>
            </motion.div>
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
