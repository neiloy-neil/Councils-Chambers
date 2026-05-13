/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { DecisionOption } from '../data/scenarios';
import { ArrowRight, Landmark, ShieldCheck, AlertCircle } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface ReactionScreenProps {
  option: DecisionOption;
  onContinue: () => void;
  onHome: () => void;
}

const SentimentParticles = ({ isPositive }: { isPositive: boolean }) => {
  const particles = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: isPositive ? Math.random() * 4 + 2 : Math.random() * 8 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 3,
    })), [isPositive]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={`${isPositive ? 'pos' : 'neg'}-${p.id}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isPositive ? [0, 0.2, 0] : [0, 0.1, 0],
            scale: [0.8, 1.1, 0.8],
            y: isPositive ? [0, -150] : [0, 150],
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: p.delay
          }}
          className={`absolute rounded-full blur-[1px] ${isPositive ? 'bg-gold' : 'bg-parliament'}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function ReactionScreen({ option, onContinue, onHome }: ReactionScreenProps) {
  const words = option.reaction.split(' ');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  const rotateX = useTransform(springY, [0, 800], [3, -3]);
  const rotateY = useTransform(springX, [0, 1200], [-3, 3]);
  const bgX = useTransform(springX, [0, 1200], [10, -10]);
  const bgY = useTransform(springY, [0, 800], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleContinue = () => {
    audioManager.play('click');
    onContinue();
  };

  const handleHome = () => {
    if (confirm("Abandon legislative session and return to headquarters? Progress will be lost.")) {
      audioManager.play('click');
      onHome();
    }
  };

  const isPositive = !option.reaction.toLowerCase().includes('angry') && 
                    !option.reaction.toLowerCase().includes('outrage') &&
                    !option.reaction.toLowerCase().includes('concern') &&
                    !option.reaction.toLowerCase().includes('failure');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-parchment">
      {/* Return Home Button */}
      <div className="absolute top-8 left-8 z-50">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHome}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg text-slate-500 hover:text-parliament transition-all"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return Home</span>
        </motion.button>
      </div>

      {/* Dynamic Background based on Sentiment */}
      <AnimatePresence mode="wait">
        <motion.div
           key={isPositive ? 'pos' : 'neg'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.1 }}
           exit={{ opacity: 0 }}
           className={`absolute inset-0 pointer-events-none transition-colors duration-2000 ${isPositive ? 'bg-gold' : 'bg-parliament'}`}
        />
      </AnimatePresence>

      <SentimentParticles isPositive={isPositive} />

      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
        >
          <Landmark className="w-[800px] h-[800px] text-parliament" />
        </motion.div>
      </motion.div>

      <div className="max-w-2xl w-full relative z-10 px-4">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="p-12 flex flex-col items-center text-center">
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
               className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl relative ${isPositive ? 'bg-gold text-parliament' : 'bg-parliament text-gold'}`}
             >
                <div className={`absolute inset-0 opacity-20 blur-xl animate-pulse rounded-full ${isPositive ? 'bg-gold' : 'bg-parliament'}`} />
                {isPositive ? <ShieldCheck className="w-12 h-12 relative z-10" /> : <AlertCircle className="w-12 h-12 relative z-10" />}
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="mb-8"
             >
                <span className={`inline-block px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-[0.4em] mb-6 border transition-colors duration-1000 ${isPositive ? 'border-gold/20 text-gold bg-gold/5' : 'border-parliament/10 text-parliament bg-parliament/5'}`}>
                  Legislative Reaction
                </span>
                
                <h3 className="text-3xl md:text-4xl font-serif font-black mb-8 text-parliament leading-tight flex flex-wrap justify-center gap-x-2 text-center px-2">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.5 + i * 0.05,
                        duration: 0.4,
                      }}
                      className="inline-block"
                    >
                      {i === 0 ? `"${word}` : i === words.length - 1 ? `${word}"` : word}
                    </motion.span>
                  ))}
                </h3>
             </motion.div>

             <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: isPositive ? '#f1d592' : '#1a2a44' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className={`group flex items-center gap-4 px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all shadow-lg ${isPositive ? 'bg-gold text-parliament shadow-gold/20' : 'bg-parliament text-white shadow-parliament/20'}`}
             >
                Continue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
