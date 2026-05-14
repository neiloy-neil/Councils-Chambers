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
  reputation: number;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
}

export const INITIAL_SCORES: Scores = {
  trust: 50,
  budget: 50,
  ethics: 50,
  impact: 50,
  support: 50,
  reputation: 50,
};

export function calculateNewScores(current: Scores, effect: ScoreEffect): Scores {
  const next = {
    trust: Math.max(0, Math.min(100, current.trust + effect.trust)),
    budget: Math.max(0, Math.min(100, current.budget + effect.budget)),
    ethics: Math.max(0, Math.min(100, current.ethics + effect.ethics)),
    impact: Math.max(0, Math.min(100, current.impact + effect.impact)),
    support: Math.max(0, Math.min(100, current.support + effect.support)),
    reputation: Math.max(0, Math.min(100, current.reputation + (effect.reputation ?? 0))),
  };

  if (effect.budget < -10) {
    next.trust = Math.max(0, next.trust - 5);
  }

  if (effect.ethics < -10) {
    next.reputation = Math.max(0, next.reputation - 10);
  }

  if (effect.trust >= 10 && effect.ethics >= 5) {
    next.reputation = Math.min(100, next.reputation + 5);
  }

  return next;
}

export function calculateTotalScore(scores: Scores): number {
  return Math.round(
    (scores.trust + scores.budget + scores.ethics + scores.impact + scores.support + scores.reputation) / 6,
  );
}

export function calculateStarReward(effect: ScoreEffect): number {
  const values = [
    effect.trust,
    effect.budget,
    effect.ethics,
    effect.impact,
    effect.support,
    effect.reputation ?? 0,
  ];
  const positiveCount = values.filter((value) => value > 0).length;
  const negativeCount = values.filter((value) => value < 0).length;

  if (positiveCount >= 4 && negativeCount <= 1) {
    return 3;
  }

  if (positiveCount >= 2) {
    return 2;
  }

  return 1;
}

export function getResultTitle(total: number): string {
  if (total >= 85) return 'Cartoon City Legend';
  if (total >= 72) return 'Sunshine Mayor';
  if (total >= 58) return 'Neighborhood Hero';
  if (total >= 45) return 'Busy Block Captain';
  if (total >= 30) return 'Learning Leader';
  return 'Rookie Ribbon Keeper';
}

export function getResultDescription(total: number): string {
  if (total >= 85) {
    return 'Your city sparkled with clever ideas, fair choices, and giant community cheers.';
  }
  if (total >= 72) {
    return 'You guided Cartoon City with warmth, balance, and a real talent for problem solving.';
  }
  if (total >= 58) {
    return 'You made plenty of helpful calls and kept the city moving in a kind direction.';
  }
  if (total >= 45) {
    return 'You handled a tricky term with some wins, some wobble, and lots of learning.';
  }
  if (total >= 30) {
    return 'This adventure got messy at times, but you still found moments of teamwork and courage.';
  }
  return 'Every mayor starts somewhere. Cartoon City is ready for your next rematch.';
}

export function getUnlockedBadges(scores: Scores, stars: number, total: number): Badge[] {
  const badges: Badge[] = [];

  if (scores.trust >= 70) {
    badges.push({
      id: 'heart-of-town',
      label: 'Heart of Town',
      description: 'Neighbor cheers stayed high all across the city.',
    });
  }

  if (scores.ethics >= 70) {
    badges.push({
      id: 'fair-play',
      label: 'Fair Play Champ',
      description: 'You kept your choices kind, honest, and fair.',
    });
  }

  if (scores.impact >= 70) {
    badges.push({
      id: 'big-helper',
      label: 'Big Helper',
      description: 'Your decisions made a visible difference around the city.',
    });
  }

  if (scores.reputation >= 70) {
    badges.push({
      id: 'spotlight',
      label: 'Spotlight Star',
      description: 'Your leadership style became a city-wide favorite.',
    });
  }

  if (stars >= 20) {
    badges.push({
      id: 'star-collector',
      label: 'Star Collector',
      description: 'You stacked up a sparkling mountain of reward stars.',
    });
  }

  if (Object.values(scores).every((value) => value >= 55)) {
    badges.push({
      id: 'balanced-builder',
      label: 'Balanced Builder',
      description: 'You kept every major city meter in healthy shape.',
    });
  }

  if (total >= 75) {
    badges.push({
      id: 'city-legend',
      label: 'City Legend',
      description: 'Cartoon City ended your term glowing with confidence.',
    });
  }

  return badges;
}
