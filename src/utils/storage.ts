/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scenario, DEFAULT_SCENARIOS } from '../data/scenarios';

const SCENARIOS_KEY = 'council_chambers_scenarios';
const RESULTS_KEY = 'council_chambers_results';

export interface GameResult {
  id: string;
  playerName: string;
  avatar: 'male' | 'female';
  finalScores: {
    trust: number;
    budget: number;
    ethics: number;
    impact: number;
    support: number;
    total: number;
  };
  timestamp: string;
}

export const Storage = {
  // Scenarios
  getScenarios: (): Scenario[] => {
    const data = localStorage.getItem(SCENARIOS_KEY);
    if (!data) {
      localStorage.setItem(SCENARIOS_KEY, JSON.stringify(DEFAULT_SCENARIOS));
      return DEFAULT_SCENARIOS;
    }
    return JSON.parse(data);
  },

  saveScenarios: (scenarios: Scenario[]) => {
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
    // FUTURE: PUT /api/scenarios
  },

  resetScenarios: () => {
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(DEFAULT_SCENARIOS));
    return DEFAULT_SCENARIOS;
  },

  // Results
  saveResult: (result: GameResult) => {
    const results = Storage.getResults();
    results.unshift(result);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    // FUTURE: POST /api/results
  },

  getResults: (): GameResult[] => {
    const data = localStorage.getItem(RESULTS_KEY);
    // FUTURE: GET /api/results
    return data ? JSON.parse(data) : [];
  },

  clearResults: () => {
    localStorage.removeItem(RESULTS_KEY);
  }
};
