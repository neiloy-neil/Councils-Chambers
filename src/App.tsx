import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ReactionScreen from './components/ReactionScreen';
import ResultScreen from './components/ResultScreen';
import AdminPanel from './components/AdminPanel';
import './styles/theme.css';
import { pageVariants } from './animations/variants';
import { useGameStore } from './store';

export default function App() {
  const view = useGameStore((state) => state.view);
  const setView = useGameStore((state) => state.setView);
  const loadScenarios = useGameStore((state) => state.loadScenarios);
  const loadResults = useGameStore((state) => state.loadResults);

  useEffect(() => {
    loadScenarios();
    loadResults();
  }, [loadResults, loadScenarios]);

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'START' && (
          <motion.div key="start" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
            <StartScreen />
          </motion.div>
        )}

        {view === 'GAME' && (
          <motion.div key="game" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
            <GameScreen />
          </motion.div>
        )}

        {view === 'REACTION' && (
          <motion.div key="reaction" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
            <ReactionScreen />
          </motion.div>
        )}

        {view === 'RESULT' && (
          <motion.div key="result" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
            <ResultScreen />
          </motion.div>
        )}

        {view === 'ADMIN' && (
          <motion.div key="admin" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
            <AdminPanel onBack={() => setView('START')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
