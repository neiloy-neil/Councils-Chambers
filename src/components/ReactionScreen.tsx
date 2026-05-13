/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { DecisionOption } from '../data/scenarios';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface ReactionScreenProps {
  option: DecisionOption;
  onContinue: () => void;
}

export default function ReactionScreen({ option, onContinue }: ReactionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-parliament text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="max-w-xl w-full bg-white p-12 rounded-[3.5rem] shadow-[0_64px_128px_-16px_rgba(0,0,0,0.5)] border border-white/10 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="bg-gold p-6 rounded-[2rem] mb-10 shadow-xl shadow-gold/20"
          >
            <MessageSquare className="w-12 h-12 text-parliament" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[12px] uppercase tracking-[0.4em] text-gold font-black mb-4"
          >
            The Public Speaks
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-serif font-bold mb-10 text-parliament leading-snug italic"
          >
            "{option.reaction}"
          </motion.h3>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1 }}
            className="h-px bg-slate-100 mb-10" 
          />

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05, gap: "1.5rem" }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="group flex items-center gap-4 bg-parliament text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-parliament/90 transition-all shadow-2xl shadow-parliament/20 uppercase tracking-widest text-xs"
          >
            Adjourn Meeting
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform text-gold" />
          </motion.button>
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 text-gold/60 text-[10px] font-black uppercase tracking-[0.5em]"
      >
        Records Synchronized • Score Updates Finalized
      </motion.p>
    </div>
  );
}
