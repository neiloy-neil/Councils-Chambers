import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ReactionScreen from './components/ReactionScreen';
import ResultScreen from './components/ResultScreen';
import AdminPanel from './components/AdminPanel';
import './styles/theme.css';
import { pageTransition } from './animations/variants';
import { useGameStore } from './store'; // Import the Zustand store

export default function App() {
  const {
    view,
    playerName,
    avatar,
    scenarios,
    currentScenarioIndex,
    scores,
    lastDecision,
    setView,
    loadScenarios,
    startGame,
    makeDecision,
    continueGame,
    restartGame,
  } = useGameStore();

  useEffect(() => {
    loadScenarios();
  }, [view, loadScenarios]);

  const handleStartGame = (name: string, av: 'male' | 'female') => {
    startGame(name, av);
  };

  const handleDecision = (option: DecisionOption) => {
    makeDecision(option);
  };

  const handleContinue = () => {
    continueGame();
  };

  const handleRestart = () => {
    restartGame();
  };

  return (
    <div className="app-background min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'START' && (
          <motion.div
            key="start"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <StartScreen
              onStart={handleStartGame}
              onAdmin={() => setView('ADMIN')}
            />
          </motion.div>
        )}

        {view === 'GAME' && scenarios.length > 0 && (
          <motion.div
            key={`game-${currentScenarioIndex}`}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <GameScreen
              scenario={scenarios[currentScenarioIndex]}
              meetingNumber={currentScenarioIndex + 1}
              totalMeetings={scenarios.length}
              onDecision={handleDecision}
              onHome={handleRestart}
            />
          </motion.div>
        )}

        {view === 'REACTION' && lastDecision && (
          <motion.div
            key="reaction"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <ReactionScreen
              option={lastDecision}
              onContinue={handleContinue}
              onHome={handleRestart}
            />
          </motion.div>
        )}

        {view === 'RESULT' && (
          <motion.div
            key="result"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <ResultScreen
              playerName={playerName}
              avatar={avatar}
              scores={scores}
              onRestart={restartGame}
            />
          </motion.div>
        )}

        {view === 'ADMIN' && (
          <motion.div
            key="admin"
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <AdminPanel onBack={() => setView('START')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
