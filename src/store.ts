import { create } from 'zustand';
import { Scenario, DecisionOption } from './data/scenarios';
import {
  Scores,
  INITIAL_SCORES,
  calculateNewScores,
  calculateTotalScore,
  calculateStarReward,
  getResultTitle,
  getUnlockedBadges,
} from './utils/scoring';
import { Storage, GameResult } from './utils/storage';

type View = 'START' | 'GAME' | 'REACTION' | 'RESULT' | 'ADMIN';

interface GameState {
  view: View;
  playerName: string;
  avatar: 'male' | 'female';
  scenarios: Scenario[];
  currentScenarioIndex: number;
  scores: Scores;
  lastDecision: DecisionOption | null;
  results: GameResult[];
  stars: number;
  lastStarReward: number;

  setView: (view: View) => void;
  loadScenarios: () => void;
  loadResults: () => void;
  startGame: (name: string, avatar: 'male' | 'female') => void;
  makeDecision: (option: DecisionOption) => void;
  continueGame: () => void;
  restartGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  view: 'START',
  playerName: '',
  avatar: 'male',
  scenarios: [],
  currentScenarioIndex: 0,
  scores: INITIAL_SCORES,
  lastDecision: null,
  results: [],
  stars: 0,
  lastStarReward: 0,

  setView: (view) => set({ view }),

  loadScenarios: () => {
    set({ scenarios: Storage.getScenarios() });
  },

  loadResults: () => {
    set({ results: Storage.getResults() });
  },

  startGame: (name, avatar) => {
    set({
      playerName: name,
      avatar,
      scores: INITIAL_SCORES,
      currentScenarioIndex: 0,
      lastDecision: null,
      stars: 0,
      lastStarReward: 0,
      view: 'GAME',
    });
  },

  makeDecision: (option) => {
    const earnedStars = calculateStarReward(option.effects);
    set((state) => ({
      lastDecision: option,
      scores: calculateNewScores(state.scores, option.effects),
      stars: state.stars + earnedStars,
      lastStarReward: earnedStars,
      view: 'REACTION',
    }));
  },

  continueGame: () => {
    const state = get();

    if (state.currentScenarioIndex < state.scenarios.length - 1) {
      set((current) => ({
        currentScenarioIndex: current.currentScenarioIndex + 1,
        view: 'GAME',
      }));
      return;
    }

    const finalTotal = calculateTotalScore(state.scores);
    const title = getResultTitle(finalTotal);
    const badges = getUnlockedBadges(state.scores, state.stars, finalTotal);

    const result: GameResult = {
      id: `${finalTotal}-${Date.now()}`,
      playerName: state.playerName,
      avatar: state.avatar,
      title,
      finalScores: {
        ...state.scores,
        total: finalTotal,
      },
      starsEarned: state.stars,
      badges,
      timestamp: new Date().toISOString(),
    };

    Storage.saveResult(result);
    set({ results: Storage.getResults(), view: 'RESULT' });
  },

  restartGame: () => {
    set({
      view: 'START',
      currentScenarioIndex: 0,
      lastDecision: null,
      stars: 0,
      lastStarReward: 0,
      scores: INITIAL_SCORES,
    });
  },
}));
