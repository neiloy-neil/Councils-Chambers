import { create } from 'zustand';
import { Scenario, DecisionOption } from './data/scenarios';
import { Scores, INITIAL_SCORES, calculateNewScores, calculateTotalScore } from './utils/scoring';
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
  results: GameResult[]; // Added for admin panel to manage results
  politicalCapital: number; // New state

  // Actions
  setView: (view: View) => void;
  setPlayerName: (name: string) => void;
  setAvatar: (avatar: 'male' | 'female') => void;
  loadScenarios: () => void;
  startGame: (name: string, avatar: 'male' | 'female') => void;
  makeDecision: (option: DecisionOption) => void;
  continueGame: () => void;
  restartGame: () => void;
  spendPoliticalCapital: (amount: number) => void; // New action
  
  // Admin Actions
  loadResults: () => void;
  resetScenarios: () => void;
  saveScenariosToStorage: (scenarios: Scenario[]) => void;
  addScenario: (scenario: Scenario) => void;
  deleteScenario: (id: string) => void;
  clearResults: () => void;
  updateScenarioField: (id: string, field: keyof Scenario, value: any) => void;
  updateOptionField: (scenarioId: string, optionId: string, field: keyof DecisionOption, value: any) => void;
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
  politicalCapital: 10, // Initial political capital

  setView: (view) => set({ view }),
  setPlayerName: (playerName) => set({ playerName }),
  setAvatar: (avatar) => set({ avatar }),

  loadScenarios: () => {
    set({ scenarios: Storage.getScenarios() });
  },

  startGame: (name, avatar) => {
    set({
      playerName: name,
      avatar: avatar,
      scores: INITIAL_SCORES,
      currentScenarioIndex: 0,
      view: 'GAME',
      politicalCapital: 10,
    });
  },

  makeDecision: (option) => {
    set((state) => ({
      lastDecision: option,
      scores: calculateNewScores(state.scores, option.effects),
      politicalCapital: state.politicalCapital + (option.effects.politicalCapital || 0),
      view: 'REACTION',
    }));
  },

  continueGame: () => {
    const state = get();
    if (state.currentScenarioIndex < state.scenarios.length - 1) {
      set((s) => ({
        currentScenarioIndex: s.currentScenarioIndex + 1,
        view: 'GAME',
      }));
    } else {
      // Game Over
      const finalTotal = calculateTotalScore(state.scores);
      const result: GameResult = {
        id: `${finalTotal}-${Date.now()}`,
        playerName: state.playerName,
        avatar: state.avatar,
        finalScores: {
          ...state.scores,
          total: finalTotal,
        },
        timestamp: new Date().toISOString(),
      };
      Storage.saveResult(result);
      set({ view: 'RESULT' });
    }
  },

  restartGame: () => {
    set({ view: 'START' });
  },

  spendPoliticalCapital: (amount) => {
    set((state) => ({
      politicalCapital: Math.max(0, state.politicalCapital - amount),
    }));
  },

  loadResults: () => {
    set({ results: Storage.getResults() });
  },

  resetScenarios: () => {
    const reset = Storage.resetScenarios();
    set({ scenarios: reset });
  },

  saveScenariosToStorage: (scenarios) => {
    Storage.saveScenarios(scenarios);
    set({ scenarios }); // Update local state as well
  },

  addScenario: (scenario) => {
    set((state) => ({ scenarios: [...state.scenarios, scenario] }));
  },

  deleteScenario: (id) => {
    set((state) => ({ scenarios: state.scenarios.filter((s) => s.id !== id) }));
  },

  clearResults: () => {
    Storage.clearResults();
    set({ results: [] });
  },

  updateScenarioField: (id, field, value) => {
    set((state) => ({
      scenarios: state.scenarios.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
  },

  updateOptionField: (scenarioId, optionId, field, value) => {
    set((state) => ({
      scenarios: state.scenarios.map((s) => {
        if (s.id === scenarioId) {
          return {
            ...s,
            options: s.options.map((o) =>
              o.id === optionId ? { ...o, [field]: value } : o
            ),
          };
        }
        return s;
      }),
    }));
  },
}));
