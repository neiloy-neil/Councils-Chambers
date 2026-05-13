/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScoreEffect } from '../data/scenarios';

export interface Scores {
  trust: number;
  budget: number;
  ethics: number;
  impact: number;
  support: number;
  reputation: number; // New score
}

export const INITIAL_SCORES: Scores = {
  trust: 50,
  budget: 50,
  ethics: 50,
  impact: 50,
  support: 50,
  reputation: 50, // Initial reputation
};

export function calculateNewScores(current: Scores, effect: ScoreEffect): Scores {
  const newScores = {
    trust: Math.max(0, Math.min(100, current.trust + (effect.trust || 0))),
    budget: Math.max(0, Math.min(100, current.budget + (effect.budget || 0))),
    ethics: Math.max(0, Math.min(100, current.ethics + (effect.ethics || 0))),
    impact: Math.max(0, Math.min(100, current.impact + (effect.impact || 0))),
    support: Math.max(0, Math.min(100, current.support + (effect.support || 0))),
    reputation: Math.max(0, Math.min(100, current.reputation + (effect.reputation || 0))),
  };

  // Interconnected scores
  if (effect.budget < -10) {
    newScores.trust = Math.max(0, newScores.trust - 5);
  }
  if (effect.ethics < -10) {
    newScores.reputation = Math.max(0, newScores.reputation - 10);
  }
  if (effect.trust > 10) {
    newScores.reputation = Math.min(100, newScores.reputation + 5);
  }


  return newScores;
}

export function calculateTotalScore(scores: Scores): number {
  return Math.round((scores.trust + scores.budget + scores.ethics + scores.impact + scores.support + scores.reputation) / 6);
}

export function getResultTitle(total: number): string {
  if (total >= 85) return "Visionary Leader";
  if (total >= 70) return "Master Statesperson";
  if (total >= 55) return "Capable Councillor";
  if (total >= 40) return "Average Administrator";
  if (total >= 25) return "Struggling Servant";
  return "Political Pariah";
}

export function getResultDescription(total: number): string {
  if (total >= 85) return "Your legacy is one of profound and lasting positive change. You are a titan of local history.";
  if (total >= 70) return "Your tenure has been legendary. You've balanced the books, maintained high ethics, and left a lasting positive impact on the community. You are beloved by all.";
  if (total >= 55) return "A solid performance. While not perfect, you've made more good decisions than bad and generally moved the city forward.";
  if (total >= 40) return "You survived your term. Some people are happy, some are not. You played it safe, perhaps too safe at times.";
  if (total >= 25) return "Your term was marked by controversy and difficult trade-offs that didn't always go your way. The city faces a rocky road ahead.";
  return "A disastrous term. Ethical lapses, budget failures, or a complete loss of trust has left your legacy in tatters.";
}
