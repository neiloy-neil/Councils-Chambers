/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ReactionScreen from './components/ReactionScreen';
import ResultScreen from './components/ResultScreen';
import AdminPanel from './components/AdminPanel';
import { Storage, GameResult } from './utils/storage';
import { Scenario, DecisionOption } from './data/scenarios';
import { INITIAL_SCORES, Scores, calculateNewScores, calculateTotalScore } from './utils/scoring';

type View = 'START' | 'GAME' | 'REACTION' | 'RESULT' | 'ADMIN';

export default function App() {
  const [view, setView] = useState<View>('START');
  const [playerName, setPlayerName] = useState('');
  const [avatar, setAvatar] = useState<'male' | 'female'>('male');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scores, setScores] = useState<Scores>(INITIAL_SCORES);
  const [lastDecision, setLastDecision] = useState<DecisionOption | null>(null);

  useEffect(() => {
    // Load fresh scenarios from storage (could be customized in Admin)
    setScenarios(Storage.getScenarios());
  }, [view]);

  const handleStartGame = (name: string, av: 'male' | 'female') => {
    setPlayerName(name);
    setAvatar(av);
    setScores(INITIAL_SCORES);
    setCurrentScenarioIndex(0);
    setView('GAME');
  };

  const handleDecision = (option: DecisionOption) => {
    setLastDecision(option);
    setScores(prev => calculateNewScores(prev, option.effects));
    setView('REACTION');
  };

  const handleContinue = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setView('GAME');
    } else {
      // Game Over
      const finalTotal = calculateTotalScore(scores);
      const result: GameResult = {
        id: `${calculateTotalScore(scores)}-${Date.now()}`,
        playerName,
        avatar,
        finalScores: {
          ...scores,
          total: finalTotal
        },
        timestamp: new Date().toISOString()
      };
      
      Storage.saveResult(result);
      setView('RESULT');
    }
  };

  const handleRestart = () => {
    setView('START');
  };

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <div className="grain" />
      
      <AnimatePresence mode="wait">
        {view === 'START' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <GameScreen
              scenario={scenarios[currentScenarioIndex]}
              meetingNumber={currentScenarioIndex + 1}
              totalMeetings={scenarios.length}
              onDecision={handleDecision}
            />
          </motion.div>
        ) }

        {view === 'REACTION' && lastDecision && (
          <motion.div
            key="reaction"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <ReactionScreen 
              option={lastDecision} 
              onContinue={handleContinue} 
            />
          </motion.div>
        )}

        {view === 'RESULT' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ResultScreen
              playerName={playerName}
              avatar={avatar}
              scores={scores}
              onRestart={handleRestart}
            />
          </motion.div>
        )}

        {view === 'ADMIN' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AdminPanel onBack={() => setView('START')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

