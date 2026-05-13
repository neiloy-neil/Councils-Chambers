/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Scenario, DecisionOption } from '../data/scenarios';
import { Building2, Landmark, HelpCircle } from 'lucide-react';
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
    <div className="flex flex-col items-center min-h-screen p-4 bg-parchment text-slate-900 font-sans">
      <div className="max-w-4xl w-full py-12">
        <header className="mb-12 flex justify-between items-end">
          <div className="flex items-center gap-6">
            <motion.div 
               whileHover={{ rotate: -5, scale: 1.05 }}
               className="bg-parliament text-gold p-4 rounded-3xl shadow-xl shadow-parliament/20"
            >
              <Landmark className="w-8 h-8" />
            </motion.div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-black leading-tight mb-2">Legislative Session</p>
              <h2 className="text-3xl font-serif font-black text-parliament">Meeting {meetingNumber} of {totalMeetings}</h2>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black leading-tight">Civic Progression</p>
            <div className="flex gap-2">
              {Array.from({ length: totalMeetings }).map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={false}
                  animate={{ 
                    backgroundColor: i < meetingNumber ? '#c5a059' : '#1a2a4410',
                    width: i === meetingNumber - 1 ? 48 : 12,
                    opacity: i <= meetingNumber - 1 ? 1 : 0.3
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="h-3 rounded-full" 
                />
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-12 bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(26,42,68,0.1)] border border-slate-100 overflow-hidden"
          >
            <div className="relative h-64 bg-parliament flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>
              <motion.div
                 initial={{ opacity: 0, scale: 1.2 }}
                 animate={{ opacity: 0.1, scale: 1 }}
                 transition={{ duration: 2 }}
                 className="absolute inset-0"
              >
                <Building2 className="w-[120%] h-[120%] text-gold absolute -bottom-24 -left-24 transform -rotate-12" />
              </motion.div>
              
              <div className="relative z-10 px-12 py-8 w-full">
                <motion.span 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4 border border-gold/30 backdrop-blur-sm"
                >
                  Priority Agenda
                </motion.span>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-serif font-black text-white leading-[1.1] max-w-2xl"
                >
                  {scenario.title}
                </motion.h3>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
            </div>

            <div className="p-12 -mt-12 relative z-10">
              <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-slate-50 mb-12">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-slate-600 text-xl font-medium leading-relaxed italic"
                >
                  "{scenario.description}"
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenario.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    whileHover={{ scale: 1.02, y: -5, borderColor: "#c5a059", backgroundColor: "#fdfaf3" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDecision(option)}
                    className="group relative flex flex-col items-start gap-4 p-8 rounded-3xl border-2 border-slate-50 bg-slate-50/50 hover:shadow-2xl hover:shadow-gold/10 transition-all text-left"
                  >
                    <div className="bg-white group-hover:bg-parliament group-hover:text-gold p-4 rounded-2xl shadow-sm transition-all mb-2">
                      <HelpCircle className="w-6 h-6 text-parliament group-hover:text-gold transition-colors" />
                    </div>
                    <span className="font-bold text-lg text-parliament leading-snug">
                      {option.text}
                    </span>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
                       <Landmark className="w-12 h-12 text-gold" />
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
