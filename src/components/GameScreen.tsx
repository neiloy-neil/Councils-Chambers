import { motion } from 'framer-motion';
import { Building2, Landmark, HelpCircle, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audioService';
import { cardEntrance, buttonHover } from '../animations/variants';
import { useGameStore } from '../store'; // Import the Zustand store
import '../styles/theme.css'; // Import the theme.css

export default function GameScreen() {
  const scenario = useGameStore((state) => state.scenarios[state.currentScenarioIndex]);
  const meetingNumber = useGameStore((state) => state.currentScenarioIndex + 1);
  const totalMeetings = useGameStore((state) => state.scenarios.length);
  const makeDecision = useGameStore((state) => state.makeDecision);
  const restartGame = useGameStore((state) => state.restartGame);

  const handleDecision = (option: DecisionOption) => {
    audioManager.play('gavel');
    makeDecision(option);
  };

  const handleHome = () => {
    if (confirm("Abandon legislative session and return to headquarters? Progress will be lost.")) {
      audioManager.play('click');
      restartGame();
    }
  };

  if (!scenario) {
    return null; // Or a loading spinner, or redirect to start
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen p-4 font-sans relative overflow-hidden game-screen-background"
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

      <div className="max-w-4xl w-full py-8 relative z-10">
        <header
          className="mb-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 p-6 rounded-lg game-header"
        >
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-4 rounded-2xl shadow-xl transition-colors landmark-icon-background"
            >
              <Landmark className="w-8 h-8" />
            </motion.div>
            <div>
              <p
                className="text-xs uppercase tracking-widest font-bold mb-1 session-label"
              >
                Legislative Session
              </p>
              <h2 className="text-3xl font-serif font-black meeting-title">
                Meeting {meetingNumber} <span className="font-light text-xl ml-1 meeting-subtitle">/ {totalMeetings}</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <p
              className="text-xs uppercase tracking-widest font-bold session-label"
            >
              Progression
            </p>
            <div className="flex gap-2 p-1.5 rounded-full progression-bar-container">
              {Array.from({ length: totalMeetings }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    backgroundColor: i < meetingNumber ? 'var(--color-primary)' : 'var(--color-secondary-20)',
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
            variants={cardEntrance}
            initial="initial"
            animate="animate"
            className="rounded-lg shadow-2xl overflow-hidden relative game-card"
          >
            <div
              className="relative h-60 flex items-center justify-center overflow-hidden game-card-header"
            >
              <div className="relative z-10 px-12 py-8 w-full text-center md:text-left">
                <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold mb-4 priority-agenda-label"
                  >
                    Priority Agenda
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-black leading-tight max-w-2xl scenario-title">
                    {scenario.title}
                  </h3>
                </motion.div>
              </div>
            </div>

            <div className="p-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-l-4 rounded-lg p-8 mb-10 scenario-description-container"
              >
                <p className="text-xl font-serif leading-relaxed scenario-description">
                  "{scenario.description}"
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenario.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleDecision(option)}
                    className="group relative flex flex-col items-start gap-4 p-8 rounded-lg border-2 text-left decision-button"
                  >
                    <div
                      className="p-3 rounded-2xl shadow-sm transition-all decision-button-icon-container"
                    >
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <span className="font-serif font-black text-xl leading-tight decision-button-text">
                      {option.text}
                    </span>
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-8 h-8 decision-button-arrow" />
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
