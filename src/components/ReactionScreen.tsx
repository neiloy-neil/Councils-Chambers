/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { DecisionOption } from '../data/scenarios';
import { MessageSquare, ArrowRight, Landmark, ShieldCheck, AlertCircle, Quote } from 'lucide-react';
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

  const isPositive = !option.reaction.toLowerCase().includes('angry') && 
                    !option.reaction.toLowerCase().includes('outrage') &&
                    !option.reaction.toLowerCase().includes('concern') &&
                    !option.reaction.toLowerCase().includes('failure');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-parchment">
      {/* Dynamic Background based on Sentiment */}
      <AnimatePresence mode="wait">
        <motion.div
           key={isPositive ? 'pos' : 'neg'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.08 }}
           exit={{ opacity: 0 }}
           className={`absolute inset-0 pointer-events-none transition-colors duration-2000 ${isPositive ? 'bg-gold' : 'bg-parliament'}`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        >
          <Landmark className="w-[1000px] h-[1000px] text-parliament" />
        </motion.div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[4rem] shadow-[0_80px_160px_-16px_rgba(26,42,68,0.2)] border border-slate-100 overflow-hidden"
        >
          <div className="p-16 flex flex-col items-center text-center">
             <motion.div 
               initial={{ rotate: -20, scale: 0 }}
               animate={{ rotate: 0, scale: 1 }}
               transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
               className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl relative ${isPositive ? 'bg-gold text-parliament' : 'bg-parliament text-gold'}`}
             >
                <div className={`absolute inset-0 opacity-30 blur-2xl animate-pulse rounded-full ${isPositive ? 'bg-gold' : 'bg-parliament'}`} />
                {isPositive ? <ShieldCheck className="w-16 h-16 relative z-10" /> : <AlertCircle className="w-16 h-16 relative z-10" />}
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="mb-12"
             >
                <span className={`inline-block px-6 py-2 rounded-full font-black text-[11px] uppercase tracking-[0.5em] mb-8 border transition-colors duration-1000 ${isPositive ? 'border-gold/30 text-gold bg-gold/5' : 'border-parliament/10 text-parliament bg-parliament/5'}`}>
                  Public Sentiment Recorded
                </span>
                
                <h3 className="text-4xl md:text-5xl font-serif font-black mb-12 text-parliament leading-[1.1] italic flex flex-wrap justify-center gap-x-3 text-center px-4">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ 
                        delay: 0.8 + i * 0.08,
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                      className="inline-block"
                    >
                      {i === 0 ? `"${word}` : i === words.length - 1 ? `${word}"` : word}
                    </motion.span>
                  ))}
                </h3>
             </motion.div>

             <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
               className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-12" 
             />

             <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.05, y: -4, gap: "2.5rem" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className={`group flex items-center gap-6 px-16 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] transition-all shadow-xl ${isPositive ? 'bg-gold text-parliament shadow-gold/30' : 'bg-parliament text-white shadow-parliament/30'}`}
             >
                Order Next Agenda
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
             </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.2 }}
          className="mt-12 flex justify-center gap-12 text-slate-400"
        >
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full transition-colors duration-1000 ${isPositive ? 'bg-gold' : 'bg-parliament opacity-20'}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isPositive ? 'Public Approval' : 'Public Discontent'}</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-slate-200" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Consensus</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
