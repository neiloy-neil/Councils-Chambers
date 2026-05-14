import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, RotateCcw, Star, Trophy } from 'lucide-react';
import { getResultTitle, getResultDescription, calculateTotalScore, getUnlockedBadges } from '../utils/scoring';
import { audioManager } from '../utils/audioService';
import { staggerContainer, resultBarVariants, buttonVariants, cardVariants } from '../animations/variants';
import { useGameStore } from '../store';
import { avatarOptions, scoreCards } from '../constants/theme';
import '../styles/theme.css';

export default function ResultScreen() {
  const playerName = useGameStore((state) => state.playerName);
  const avatar = useGameStore((state) => state.avatar);
  const scores = useGameStore((state) => state.scores);
  const stars = useGameStore((state) => state.stars);
  const restartGame = useGameStore((state) => state.restartGame);

  useEffect(() => {
    audioManager.play('success');
  }, []);

  const totalScore = calculateTotalScore(scores);
  const title = getResultTitle(totalScore);
  const description = getResultDescription(totalScore);
  const badges = getUnlockedBadges(scores, stars, totalScore);

  const handleRestart = () => {
    audioManager.play('click');
    restartGame();
  };

  return (
    <div className="playful-shell min-h-screen px-4 py-8">
      <motion.div variants={cardVariants} initial="hidden" animate="visible" className="mx-auto w-full max-w-5xl panel-card p-6 md:p-10">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-black text-[var(--color-text)] shadow-sm">
            <Trophy className="h-4 w-4 text-[var(--color-berry)]" />
            Final Cartoon City report
          </div>
          <h1 className="hero-title mb-3 !text-5xl">{title}</h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--color-muted)]">{description}</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_1.2fr]">
          <div className="hero-side-panel">
            <div className="mb-5 flex items-center gap-4">
              <div className="avatar-burst text-5xl">{avatarOptions[avatar].emoji}</div>
              <div>
                <p className="eyebrow">Mayor profile</p>
                <h2 className="text-2xl font-black text-[var(--color-text)]">{playerName}</h2>
                <p className="text-sm font-bold text-[var(--color-muted)]">{avatarOptions[avatar].label}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="mini-panel text-left">
                <p className="eyebrow mb-2">Adventure score</p>
                <p className="text-4xl font-black text-[var(--color-text)]">{totalScore}</p>
              </div>
              <div className="mini-panel text-left">
                <p className="eyebrow mb-2">Reward stars</p>
                <p className="text-4xl font-black text-[var(--color-text)]">{stars}</p>
              </div>
            </div>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mini-panel">
            <p className="eyebrow mb-4">City mood meters</p>
            <div className="grid gap-4">
              {scoreCards.map((stat) => {
                const value = scores[stat.key];
                return (
                  <motion.div key={stat.key} variants={cardVariants}>
                    <div className="mb-1 flex justify-between gap-3">
                      <span className="text-sm font-black text-[var(--color-text)]">{stat.label}</span>
                      <span className="text-sm font-black" style={{ color: stat.color }}>
                        {value}
                      </span>
                    </div>
                    <div className="score-track">
                      <motion.div
                        className="score-fill"
                        style={{ backgroundColor: stat.color }}
                        variants={resultBarVariants}
                        initial="hidden"
                        animate="visible"
                        custom={value}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="mini-panel mb-8">
          <div className="mb-4 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-[var(--color-lavender)]" />
            <p className="text-base font-black text-[var(--color-text)]">Unlocked badges</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {badges.length > 0 ? (
              badges.map((badge) => (
                <div key={badge.id} className="badge-card">
                  <span className="badge-card-title">{badge.label}</span>
                  <span className="badge-card-text">{badge.description}</span>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                No badges this round. Try again and aim for balanced choices or a big pile of reward stars.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleRestart} className="primary-cta justify-center">
            <RotateCcw className="h-5 w-5" />
            <span>Play again</span>
            <Star className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
