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
}

export default function GameScreen({ scenario, meetingNumber, totalMeetings, onDecision }: GameScreenProps) {
  const handleDecision = (option: DecisionOption) => {
    audioManager.play('gavel');
    onDecision(option);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-parchment text-slate-900 font-sans relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Landmark className="w-64 h-64 text-parliament" />
      </div>

      <div className="max-w-5xl w-full py-12 relative z-10">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 bg-white/50 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-xl shadow-parliament/5">
          <div className="flex items-center gap-8">
            <motion.div 
               whileHover={{ rotate: -10, scale: 1.1, backgroundColor: "#d4af37", color: "#121d2f" }}
               className="bg-parliament text-gold p-5 rounded-[2rem] shadow-2xl shadow-parliament/20 transition-colors"
            >
              <Landmark className="w-10 h-10" />
            </motion.div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.4em] text-gold font-black leading-tight mb-2">Legislative Session</p>
              <h2 className="text-4xl font-serif font-black text-parliament">Meeting {meetingNumber} <span className="text-slate-300 font-light text-2xl ml-2">/ {totalMeetings}</span></h2>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
            <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400 font-black leading-tight">Civic Progression</p>
            <div className="flex gap-3 bg-slate-100/50 p-2 rounded-full border border-slate-200">
              {Array.from({ length: totalMeetings }).map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={false}
                  animate={{ 
                    backgroundColor: i < meetingNumber ? '#d4af37' : '#121d2f10',
                    width: i === meetingNumber - 1 ? 64 : 12,
                    opacity: i <= meetingNumber - 1 ? 1 : 0.4
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="h-4 rounded-full relative"
                >
                   {i === meetingNumber - 1 && (
                     <motion.div 
                       layoutId="glow"
                       className="absolute inset-0 bg-gold blur-md opacity-50"
                     />
                   )}
                </motion.div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 items-start">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(26,42,68,0.2)] border border-slate-100 overflow-hidden relative"
          >
            {/* Paper Stack Effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute -top-1 -left-1 w-full h-full bg-slate-50 border border-slate-200 rounded-[4rem] -z-10" />
              <div className="absolute -top-2 -left-2 w-full h-full bg-slate-100 border border-slate-200 rounded-[4rem] -z-20 opacity-50" />
            </div>

            <div className="relative h-80 bg-parliament flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
              </div>
              <motion.div
                 initial={{ opacity: 0, scale: 1.5 }}
                 animate={{ opacity: 0.15, scale: 1.1 }}
                 transition={{ duration: 3 }}
                 className="absolute inset-0 flex items-center justify-center"
              >
                <Building2 className="w-[120%] h-[120%] text-gold transform -rotate-12" />
              </motion.div>
              
              <div className="relative z-10 px-16 py-12 w-full text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="inline-block px-5 py-2 rounded-[2rem] bg-gold/20 text-gold font-black text-[11px] uppercase tracking-[0.4em] mb-6 border border-gold/40 backdrop-blur-md">
                    Priority Agenda • Urgent
                  </span>
                  <h3 className="text-5xl font-serif font-black text-white leading-[1] max-w-3xl">
                    {scenario.title}
                  </h3>
                </motion.div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="p-16 -mt-16 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-parchment/50 border-l-8 border-gold rounded-[2rem] p-12 shadow-inner mb-16 relative overflow-hidden group"
              >
                <div className="absolute top-4 right-8 opacity-5 transition-opacity group-hover:opacity-10">
                  <Landmark className="w-24 h-24" />
                </div>
                <p className="text-slate-600 text-2xl font-serif leading-relaxed italic relative z-10">
                  "{scenario.description}"
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {scenario.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (index * 0.12) }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -12, 
                      borderColor: "#d4af37", 
                      backgroundColor: "#fff",
                      boxShadow: "0 48px 96px -16px rgba(212, 175, 55, 0.25)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDecision(option)}
                    className="group relative flex flex-col items-start gap-6 p-12 rounded-[3.5rem] border-2 border-slate-50 bg-slate-50/50 transition-all text-left"
                  >
                    <div className="bg-white group-hover:bg-parliament group-hover:text-gold p-5 rounded-3xl shadow-lg transition-all mb-4 border border-slate-100 group-hover:border-parliament">
                      <HelpCircle className="w-8 h-8 text-parliament group-hover:text-gold transition-colors" />
                    </div>
                    <span className="font-serif font-black text-2xl text-parliament leading-tight">
                      {option.text}
                    </span>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Cast your official vote for this legislative path.
                    </p>
                    <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-20 transition-all transform translate-x-4 group-hover:translate-x-0">
                       <ArrowRight className="w-12 h-12 text-gold" />
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
