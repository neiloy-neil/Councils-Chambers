import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Star, TimerReset, Trophy } from 'lucide-react';
import { audioManager } from '../utils/audioService';
import { buttonVariants, cardVariants, staggerContainer } from '../animations/variants';
import { useGameStore } from '../store';
import '../styles/theme.css';

export default function GameScreen() {
  const scenario = useGameStore((state) => state.scenarios[state.currentScenarioIndex]);
  const meetingNumber = useGameStore((state) => state.currentScenarioIndex + 1);
  const totalMeetings = useGameStore((state) => state.scenarios.length);
  const stars = useGameStore((state) => state.stars);
  const makeDecision = useGameStore((state) => state.makeDecision);
  const restartGame = useGameStore((state) => state.restartGame);

  if (!scenario) {
    return null;
  }

  const handleDecision = (optionId: string) => {
    const option = scenario.options.find((item) => item.id === optionId);
    if (!option) return;
    audioManager.play('suspense');
    audioManager.play('gavel');
    makeDecision(option);
  };

  const handleHome = () => {
    if (!confirm('Leave Cartoon City and lose this run?')) return;
    audioManager.play('click');
    restartGame();
  };

  return (
    <div className="playful-shell min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleHome} className="secondary-pill">
              <ArrowLeft className="h-4 w-4" />
              <span>Leave run</span>
            </motion.button>
            <div className="mini-panel flex items-center gap-2 px-4 py-3">
              <TimerReset className="h-4 w-4 text-[var(--color-lavender)]" />
              <span className="text-sm font-black text-[var(--color-text)]">Stop {meetingNumber} of {totalMeetings}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="mini-panel flex items-center gap-2 px-4 py-3">
              <Star className="h-4 w-4 text-[var(--color-sunshine)]" />
              <span className="text-sm font-black text-[var(--color-text)]">{stars} reward stars</span>
            </div>
            <div className="mini-panel flex items-center gap-2 px-4 py-3">
              <Trophy className="h-4 w-4 text-[var(--color-berry)]" />
              <span className="text-sm font-black text-[var(--color-text)]">Collect badges at the finish</span>
            </div>
          </div>
        </div>

        <div className="progress-panel">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">City adventure trail</p>
              <h2 className="text-2xl font-black text-[var(--color-text)]">Guide the next neighborhood challenge</h2>
            </div>
            <Sparkles className="hidden h-6 w-6 text-[var(--color-coral)] md:block" />
          </div>

          <div className="grid gap-3 sm:grid-cols-5 lg:grid-cols-10">
            {Array.from({ length: totalMeetings }).map((_, index) => {
              const active = index === meetingNumber - 1;
              const done = index < meetingNumber - 1;
              return (
                <div key={index} className={`trail-stop ${active ? 'trail-stop-active' : done ? 'trail-stop-done' : ''}`}>
                  <span className="text-xs font-black">{index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="panel-card p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div>
                <p className="eyebrow">Story stop {meetingNumber}</p>
                <h3 className="hero-title !text-4xl">{scenario.title}</h3>
              </div>

              <div className="story-bubble">
                <p className="text-lg leading-8 text-[var(--color-text)]">{scenario.description}</p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-4"
              >
                {scenario.options.map((option) => (
                  <motion.button
                    key={option.id}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleDecision(option.id)}
                    className="choice-card text-left"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="choice-badge">Choice</span>
                      <span className="mystery-pill">Mystery reward</span>
                    </div>

                    <p className="mb-4 text-xl font-black leading-8 text-[var(--color-text)]">{option.text}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-muted)]">
                      <span>Make your pick</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            <div className="space-y-4">
              <div className="mini-panel">
                <p className="eyebrow mb-2">Mystery stars</p>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  Rewards stay hidden until after you choose, so trust your instincts and see what happens.
                </p>
              </div>

              <div className="mini-panel">
                <p className="eyebrow mb-2">Final report</p>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  The full city mood meters will appear on the end results screen after your last story stop.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
