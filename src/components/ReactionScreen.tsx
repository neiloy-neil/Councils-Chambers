/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { DecisionOption } from '../data/scenarios';
import { MessageSquare, ArrowRight, Landmark } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface ReactionScreenProps {
  option: DecisionOption;
  onContinue: () => void;
}

export default function ReactionScreen({ option, onContinue }: ReactionScreenProps) {
  const words = option.reaction.split(' ');

  const handleContinue = () => {
    audioManager.play('click');
    onContinue();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-parliament text-white font-sans relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 100, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-gold/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, -50, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-gold/10 rounded-full blur-[100px]"
      />

      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <Landmark className="w-[800px] h-[800px] text-white" />
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="max-w-2xl w-full bg-white p-16 rounded-[4rem] shadow-[0_64px_128px_-16px_rgba(0,0,0,0.6)] border border-white/20 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 15 }}
            className="bg-gold p-8 rounded-[2.5rem] mb-12 shadow-2xl shadow-gold/30 ring-8 ring-gold/10"
          >
            <MessageSquare className="w-14 h-14 text-parliament" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[12px] uppercase text-gold font-black mb-6"
          >
            Legislative Record / Public Sentiment
          </motion.h2>
          
          <h3 className="text-4xl font-serif font-black mb-12 text-parliament leading-[1.2] italic flex flex-wrap justify-center gap-x-3 text-center">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  delay: 0.8 + i * 0.08,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {i === 0 ? `"${word}` : i === words.length - 1 ? `${word}"` : word}
              </motion.span>
            ))}
          </h3>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-12" 
          />

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.05, gap: "2rem" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="group flex items-center gap-6 bg-parliament text-white px-16 py-6 rounded-[2rem] font-bold text-xl hover:bg-slate-800 transition-all shadow-[0_20px_40px_-10px_rgba(26,42,68,0.3)] uppercase tracking-[0.2em] text-[12px]"
          >
            Adjourn Session
            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform text-gold" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-16 flex items-center gap-4"
      >
        <div className="h-px w-12 bg-gold/30" />
        <p className="text-gold/60 text-[10px] font-black uppercase tracking-[0.6em]">
          End of Testimony
        </p>
        <div className="h-px w-12 bg-gold/30" />
      </motion.div>
    </div>
  );
}
