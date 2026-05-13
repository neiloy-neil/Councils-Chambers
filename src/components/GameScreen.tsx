/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Scenario, DecisionOption } from '../data/scenarios';
import { Building2, Landmark, HelpCircle, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface GameScreenProps {
  scenario: Scenario;
  meetingNumber: number;
  totalMeetings: number;
  onDecision: (option: DecisionOption) => void;
  onHome: () => void;
}

export default function GameScreen({ scenario, meetingNumber, totalMeetings, onDecision, onHome }: GameScreenProps) {
  const handleDecision = (option: DecisionOption) => {
    audioManager.play('gavel');
    onDecision(option);
  };

  const handleHome = () => {
    if (confirm("Abandon legislative session and return to headquarters? Progress will be lost.")) {
      audioManager.play('click');
      onHome();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-parchment text-slate-900 font-sans relative overflow-hidden">
      {/* Return Home Button */}
      <div className="absolute top-4 left-4 z-50">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHome}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-md text-slate-500 hover:text-parliament transition-all"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Return</span>
        </motion.button>
      </div>
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Landmark className="w-48 h-48 text-parliament" />
      </div>

      <div className="max-w-4xl w-full py-8 relative z-10">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 bg-white/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-white shadow-lg">
          <div className="flex items-center gap-6">
            <motion.div 
               whileHover={{ scale: 1.1, backgroundColor: "#d4af37", color: "#121d2f" }}
               className="bg-parliament text-gold p-4 rounded-2xl shadow-xl transition-colors"
            >
              <Landmark className="w-8 h-8" />
            </motion.div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-black mb-1">Legislative Session</p>
              <h2 className="text-3xl font-serif font-black text-parliament">Meeting {meetingNumber} <span className="text-slate-300 font-light text-xl ml-1">/ {totalMeetings}</span></h2>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black">Progression</p>
            <div className="flex gap-2 bg-slate-100/50 p-1.5 rounded-full border border-slate-200">
              {Array.from({ length: totalMeetings }).map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={false}
                  animate={{ 
                    backgroundColor: i < meetingNumber ? '#d4af37' : '#121d2f10',
                    width: i === meetingNumber - 1 ? 48 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="h-3 rounded-full relative"
                />
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative"
          >
            <div className="relative h-60 bg-parliament flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>
              
              <div className="relative z-10 px-12 py-8 w-full text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold font-black text-[9px] uppercase tracking-[0.3em] mb-4 border border-gold/30 backdrop-blur-md">
                    Priority Agenda
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight max-w-2xl">
                    {scenario.title}
                  </h3>
                </motion.div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="p-10 -mt-10 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-parchment/50 border-l-4 border-gold rounded-2xl p-8 mb-10 shadow-inner italic"
              >
                <p className="text-slate-600 text-xl font-serif leading-relaxed">
                  "{scenario.description}"
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenario.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    whileHover={{ 
                      y: -8, 
                      borderColor: "#d4af37", 
                      backgroundColor: "#fff",
                      boxShadow: "0 24px 48px -12px rgba(212, 175, 55, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDecision(option)}
                    className="group relative flex flex-col items-start gap-4 p-8 rounded-[2.5rem] border-2 border-slate-50 bg-slate-50/50 transition-all text-left"
                  >
                    <div className="bg-white group-hover:bg-parliament group-hover:text-gold p-3 rounded-2xl shadow-sm transition-all border border-slate-100 group-hover:border-parliament">
                      <HelpCircle className="w-6 h-6 text-parliament group-hover:text-gold transition-colors" />
                    </div>
                    <span className="font-serif font-black text-xl text-parliament leading-tight">
                      {option.text}
                    </span>
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-10 transition-all transform translate-x-2 group-hover:translate-x-0">
                       <ArrowRight className="w-8 h-8 text-gold" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
