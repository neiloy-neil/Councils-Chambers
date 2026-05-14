import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings, ArrowRight, Sparkles, Stars, Map, Crown, Trophy, Star } from 'lucide-react';
import { audioManager } from '../utils/audioService';
import { cardVariants, buttonVariants, staggerContainer } from '../animations/variants';
import { useGameStore } from '../store';
import { avatarOptions } from '../constants/theme';
import '../styles/theme.css';

export default function StartScreen() {
  const startGame = useGameStore((state) => state.startGame);
  const setView = useGameStore((state) => state.setView);
  const results = useGameStore((state) => state.results);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<'male' | 'female'>('female');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    audioManager.play('paper');
    startGame(name.trim(), avatar);
  };

  const selectAvatar = (nextAvatar: 'male' | 'female') => {
    setAvatar(nextAvatar);
    audioManager.play('click');
  };

  const openAdmin = () => {
    audioManager.play('click');
    setView('ADMIN');
  };

  const featureCards = [
    { icon: Sparkles, title: 'Friendly choices', text: 'Pick ideas that help your city shine.' },
    { icon: Stars, title: 'Earn reward stars', text: 'Stack stars and unlock cheerful badges.' },
    { icon: Map, title: 'Grow your town', text: 'Guide Cartoon City through 10 mini adventures.' },
  ];

  const leaders = [...results]
    .sort((left, right) => {
      if (right.finalScores.total !== left.finalScores.total) {
        return right.finalScores.total - left.finalScores.total;
      }
      return right.starsEarned - left.starsEarned;
    })
    .slice(0, 3);

  return (
    <div className="playful-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="playful-cloud playful-cloud-left" />
      <div className="playful-cloud playful-cloud-right" />
      <div className="playful-confetti playful-confetti-top" />
      <div className="playful-confetti playful-confetti-bottom" />

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="panel-card relative z-10 grid w-full max-w-6xl gap-8 overflow-hidden p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8"
      >
        <div className="space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="icon-bubble bg-[var(--color-sunshine)] text-[var(--color-ink)]">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="eyebrow">Playful leadership adventure</p>
                <h1 className="hero-title">Cartoon City Crew</h1>
              </div>
            </div>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={openAdmin}
              className="secondary-pill"
              title="Open the editor panel"
            >
              <Settings className="h-4 w-4" />
              <span>Creator Hub</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            <p className="max-w-xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">
              Run your own bright little city, solve neighborhood problems, and collect stars for clever, kind choices.
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-3 sm:grid-cols-3"
            >
              {featureCards.map((item) => (
                <motion.div key={item.title} variants={cardVariants} className="mini-panel">
                  <item.icon className="mb-3 h-5 w-5 text-[var(--color-berry)]" />
                  <p className="mb-1 text-sm font-black text-[var(--color-text)]">{item.title}</p>
                  <p className="text-sm leading-6 text-[var(--color-muted)]">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="eyebrow" htmlFor="player-name">
                Team leader name
              </label>
              <input
                id="player-name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Type your name"
                className="playful-input"
              />
            </div>

            <div className="space-y-3">
              <p className="eyebrow">Choose your city hero</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {(['female', 'male'] as const).map((option) => {
                  const selected = avatar === option;
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => selectAvatar(option)}
                      className={`avatar-card ${selected ? 'avatar-card-active' : ''}`}
                    >
                      <span className="text-4xl">{avatarOptions[option].emoji}</span>
                      <span className="mt-3 text-base font-black text-[var(--color-text)]">
                        {avatarOptions[option].label}
                      </span>
                      <span className="mt-1 text-sm text-[var(--color-muted)]">
                        {option === 'female' ? 'Leads with sparkle and plans.' : 'Leads with energy and daring.'}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="primary-cta w-full justify-center"
            >
              <span>Start city adventure</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </form>
        </div>

        <div className="hero-side-panel flex flex-col justify-between gap-6">
          <div>
            <div className="city-postcard mb-6">
              <span className="city-postcard-badge">10 story stops</span>
              <div className="city-postcard-sun" />
              <div className="city-postcard-buildings">
                <span className="city-building city-building-tall" />
                <span className="city-building city-building-mid" />
                <span className="city-building city-building-small" />
                <span className="city-building city-building-mid-alt" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="mini-panel">
                <p className="eyebrow">Secret star rewards</p>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  Each decision can unlock surprise stars, but you only learn the bonus after the crowd reacts.
                </p>
              </div>

              <div className="mini-panel">
                <p className="eyebrow">Badge examples</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="badge-chip">Heart of Town</span>
                  <span className="badge-chip">Fair Play Champ</span>
                  <span className="badge-chip">Star Collector</span>
                </div>
              </div>

              <div className="mini-panel">
                <div className="mb-3 flex items-center gap-2">
                  <Crown className="h-4 w-4 text-[var(--color-berry)]" />
                  <p className="eyebrow">Leadership board</p>
                </div>

                {leaders.length > 0 ? (
                  <div className="space-y-3">
                    {leaders.map((result, index) => (
                      <div key={result.id} className="leader-row">
                        <div className="flex items-center gap-3">
                          <span className="leader-rank">#{index + 1}</span>
                          <div>
                            <p className="text-sm font-black text-[var(--color-text)]">{result.playerName}</p>
                            <p className="text-xs font-bold text-[var(--color-muted)]">{result.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-sm font-black text-[var(--color-text)]">
                            <Trophy className="h-3.5 w-3.5 text-[var(--color-lavender)]" />
                            {result.finalScores.total}
                          </div>
                          <div className="flex items-center justify-end gap-1 text-xs font-bold text-[var(--color-muted)]">
                            <Star className="h-3 w-3 text-[var(--color-sunshine)]" />
                            {result.starsEarned} stars
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-[var(--color-muted)]">
                    Finish a run to place your name on the leadership board.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white/70 p-4 text-sm leading-6 text-[var(--color-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
            “Cartoon City needs a mayor who can listen, imagine, and help everyone play on the same team.”
          </div>
        </div>
      </motion.div>
    </div>
  );
}
