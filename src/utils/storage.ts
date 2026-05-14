/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scenario, DEFAULT_SCENARIOS } from '../data/scenarios';
import { Badge, Scores, calculateTotalScore, getResultTitle, getUnlockedBadges, INITIAL_SCORES } from './scoring';

const SCENARIOS_KEY = 'council_chambers_scenarios';
const RESULTS_KEY = 'council_chambers_results';

export interface GameResult {
  id: string;
  playerName: string;
  avatar: 'male' | 'female';
  title: string;
  finalScores: Scores & {
    total: number;
  };
  starsEarned: number;
  badges: Badge[];
  timestamp: string;
}

type StoredGameResult = Partial<GameResult> & {
  finalScores?: Partial<GameResult['finalScores']>;
};

function normalizeScores(input?: Partial<Scores> & { total?: number }): GameResult['finalScores'] {
  const scores: Scores = {
    trust: input?.trust ?? INITIAL_SCORES.trust,
    budget: input?.budget ?? INITIAL_SCORES.budget,
    ethics: input?.ethics ?? INITIAL_SCORES.ethics,
    impact: input?.impact ?? INITIAL_SCORES.impact,
    support: input?.support ?? INITIAL_SCORES.support,
    reputation: input?.reputation ?? INITIAL_SCORES.reputation,
  };

  return {
    ...scores,
    total: input?.total ?? calculateTotalScore(scores),
  };
}

function normalizeResult(result: StoredGameResult, index: number): GameResult {
  const finalScores = normalizeScores(result.finalScores);
  const starsEarned = typeof result.starsEarned === 'number' ? result.starsEarned : 0;
  const title = result.title ?? getResultTitle(finalScores.total);
  const badges = Array.isArray(result.badges) ? result.badges : getUnlockedBadges(finalScores, starsEarned, finalScores.total);

  return {
    id: result.id ?? `legacy-${index}`,
    playerName: result.playerName ?? 'Unknown Player',
    avatar: result.avatar === 'female' ? 'female' : 'male',
    title,
    finalScores,
    starsEarned,
    badges,
    timestamp: result.timestamp ?? new Date(0).toISOString(),
  };
}

export const Storage = {
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
  },

  resetScenarios: () => {
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(DEFAULT_SCENARIOS));
    return DEFAULT_SCENARIOS;
  },

  saveResult: (result: GameResult) => {
    const results = Storage.getResults();
    results.unshift(result);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  },

  getResults: (): GameResult[] => {
    const data = localStorage.getItem(RESULTS_KEY);
    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data) as StoredGameResult[];
    const normalized = parsed.map(normalizeResult);

    localStorage.setItem(RESULTS_KEY, JSON.stringify(normalized));
    return normalized;
  },

  clearResults: () => {
    localStorage.removeItem(RESULTS_KEY);
  },
};
