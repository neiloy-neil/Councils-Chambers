import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getResultTitle, getResultDescription, calculateTotalScore } from '../utils/scoring';
import { User, UserCircle, RotateCcw, Trophy, TrendingUp, DollarSign, Heart, ShieldCheck, Footprints, Star } from 'lucide-react';
import { audioManager } from '../utils/audioService';
import { scoreBarReveal, buttonHover } from '../animations/variants';
import { useGameStore } from '../store'; // Import the Zustand store
import '../styles/theme.css'; // Import theme.css

export default function ResultScreen() {
  const playerName = useGameStore((state) => state.playerName);
  const avatar = useGameStore((state) => state.avatar);
  const scores = useGameStore((state) => state.scores);
  const politicalCapital = useGameStore((state) => state.politicalCapital);
  const restartGame = useGameStore((state) => state.restartGame);

  useEffect(() => {
    audioManager.play('success');
  }, []);

  const totalScore = calculateTotalScore(scores);
  const title = getResultTitle(totalScore);
  const description = getResultDescription(totalScore);

  const handleRestart = () => {
    audioManager.play('click');
    restartGame();
  };

  const stats = [
    { label: 'Trust', value: scores.trust, icon: Heart, color: 'var(--color-danger)' },
    { label: 'Budget', value: scores.budget, icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Ethics', value: scores.ethics, icon: ShieldCheck, color: 'var(--color-secondary)' },
    { label: 'Impact', value: scores.impact, icon: Footprints, color: '#a855f7' },
    { label: 'Support', value: scores.support, icon: TrendingUp, color: '#f59e0b' },
    { label: 'Reputation', value: scores.reputation, icon: Star, color: 'var(--color-primary)' },
  ];

  return (
    <div
      className="flex flex-col items-center min-h-screen p-4 font-sans relative overflow-hidden result-screen-background"
    >
      <div className="max-w-4xl w-full relative z-10 py-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-lg shadow-2xl overflow-hidden result-card"
        >
          <div
            className="px-12 py-16 text-white text-center relative overflow-hidden result-header"
          >
            <motion.div
              initial={{ scale: 0, rotate: 12 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none"
            >
              <Trophy className="w-64 h-64 trophy-icon-color" />
            </motion.div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className="inline-flex items-center justify-center p-5 rounded-2xl mb-6 avatar-icon-container"
              >
                {avatar === 'male' ? (
                  <User className="w-12 h-12 avatar-icon-color" />
                ) : (
                  <UserCircle className="w-12 h-12 avatar-icon-color" />
                )}
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <p
                  className="font-bold uppercase tracking-widest text-xs mb-3 legislative-record-label"
                >
                  Legislative Record • {playerName}
                </p>
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight tracking-tight result-title-color">
                  {title}
                </h1>
                <p className="text-lg max-w-xl mx-auto leading-relaxed italic result-description-color">
                  "{description}"
                </p>
              </motion.div>
            </div>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-10 pb-10 border-b" style={{ borderColor: 'var(--color-primary-20)' }}>
               <div className="text-center md:text-left">
                 <p
                   className="text-xs uppercase tracking-widest font-bold mb-2 tenure-rating-label"
                 >
                   Tenure Rating
                 </p>
                 <div className="flex items-baseline justify-center md:justify-start gap-2">
                   <span className="text-6xl font-serif font-black tenure-rating-value">
                     {totalScore}
                   </span>
                   <span className="text-xl font-bold opacity-50 tenure-rating-value">
                     / 100
                   </span>
                 </div>
               </div>
               <div className="text-center md:text-left">
                 <p
                   className="text-xs uppercase tracking-widest font-bold mb-2 political-capital-label"
                 >
                   Political Capital
                 </p>
                 <div className="flex items-baseline justify-center md:justify-start gap-2">
                   <span className="text-6xl font-serif font-black political-capital-value">
                     {politicalCapital}
                   </span>
                 </div>
               </div>
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="p-6 rounded-lg italic history-quote-container"
               >
                  <p className="text-sm leading-relaxed font-serif history-quote-text">
                    "History will judge your decisions by the balance you maintained between progress and tradition."
                  </p>
               </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (i * 0.08) }}
                  className="flex flex-col gap-3 p-5 rounded-lg stats-item"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: stat.color + '40', color: stat.color }}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-col mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-widest leading-none mb-1 stats-label"
                      >
                        {stat.label}
                      </span>
                      <span className="text-lg font-black stats-value" style={{ color: stat.color }}>
                        {stat.value}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: stat.color + '20' }}>
                      <motion.div
                        variants={scoreBarReveal}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 1.5 + (i * 0.08), duration: 1.5, ease: "circOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: stat.color, width: `${stat.value}%` }}
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
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={handleRestart}
                className="group w-full py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm shadow-lg relinquish-power-button"
              >
                <RotateCcw className="w-4 h-4" />
                Relinquish Power
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
                onClick={handleRestart}
                className="text-xs uppercase tracking-widest font-bold py-1 text-center return-to-headquarters-button"
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
          className="mt-16 text-center text-xs font-bold uppercase tracking-widest archive-text"
        >
          ARCHIVED AT CITY HALL • PERMANENT RECORD
        </motion.p>
      </div>
    </div>
  );
}
