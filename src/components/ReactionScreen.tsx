import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { audioManager } from '../utils/audioService';
import { reactionReveal, buttonHover } from '../animations/variants';
import { useGameStore } from '../store'; // Import the Zustand store
import '../styles/theme.css'; // Import theme.css

export default function ReactionScreen() {
  const lastDecision = useGameStore((state) => state.lastDecision);
  const continueGame = useGameStore((state) => state.continueGame);
  const restartGame = useGameStore((state) => state.restartGame);

  const handleContinue = () => {
    audioManager.play('click');
    continueGame();
  };

  const handleHome = () => {
    if (confirm("Abandon legislative session and return to headquarters? Progress will be lost.")) {
      audioManager.play('click');
      restartGame();
    }
  };

  if (!lastDecision) {
    return null; // Should not happen if view is 'REACTION'
  }

  const isPositive = !lastDecision.reaction.toLowerCase().includes('angry') && 
                    !lastDecision.reaction.toLowerCase().includes('outrage') &&
                    !lastDecision.reaction.toLowerCase().includes('concern') &&
                    !lastDecision.reaction.toLowerCase().includes('failure');

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden ${
        isPositive ? 'reaction-screen-background-positive' : 'reaction-screen-background-negative'
      }`}
    >
      <div className="absolute top-4 left-4 z-50">
        <motion.button
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          onClick={handleHome}
          className="group flex items-center gap-2 px-4 py-2 rounded-full return-button"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span className="text-xs font-bold uppercase tracking-widest">Return</span>
        </motion.button>
      </div>

      <div className="max-w-2xl w-full relative z-10 px-4">
        <motion.div
          variants={reactionReveal}
          initial="initial"
          animate="animate"
          className={`p-12 flex flex-col items-center text-center rounded-lg ${
            isPositive ? 'reaction-screen-card-positive' : 'reaction-screen-card-negative'
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 shadow-xl relative ${
              isPositive ? 'reaction-icon-background-positive' : 'reaction-icon-background-negative'
            }`}
          >
            {isPositive ? <ShieldCheck className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <span
              className={`inline-block px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border ${
                isPositive ? 'reaction-label-positive' : 'reaction-label-negative'
              }`}
            >
              Legislative Reaction
            </span>
            
            <h3 className="text-3xl md:text-4xl font-serif font-black mb-8 leading-tight reaction-title-color">
              "{lastDecision.reaction}"
            </h3>
          </motion.div>

          <motion.button
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            onClick={handleContinue}
            className={`group flex items-center gap-4 px-12 py-5 rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-lg ${
              isPositive ? 'reaction-button-positive' : 'reaction-button-negative'
            }`}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
