import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, PartyPopper, Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import { audioManager } from '../utils/audioService';
import { buttonVariants, cardVariants } from '../animations/variants';
import { useGameStore } from '../store';
import '../styles/theme.css';

function scoreMood(reactionText: string) {
  const lower = reactionText.toLowerCase();
  return !(lower.includes('worry') || lower.includes('grumble') || lower.includes('complain') || lower.includes('sad'));
}

export default function ReactionScreen() {
  const lastDecision = useGameStore((state) => state.lastDecision);
  const lastStarReward = useGameStore((state) => state.lastStarReward);
  const continueGame = useGameStore((state) => state.continueGame);
  const restartGame = useGameStore((state) => state.restartGame);

  useEffect(() => {
    if (lastDecision) {
      audioManager.play('reveal');
    }
  }, [lastDecision?.id]);

  if (!lastDecision) {
    return null;
  }

  const positive = scoreMood(lastDecision.reaction);

  const handleContinue = () => {
    audioManager.play('click');
    continueGame();
  };

  const handleHome = () => {
    if (!confirm('Leave Cartoon City and lose this run?')) return;
    audioManager.play('click');
    restartGame();
  };

  return (
    <div className="playful-shell min-h-screen px-4 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleHome} className="secondary-pill w-fit">
          <ArrowLeft className="h-4 w-4" />
          <span>Leave run</span>
        </motion.button>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" className={`panel-card p-6 md:p-10 ${positive ? 'reaction-positive' : 'reaction-mixed'}`}>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center">
              <div className={`reaction-icon ${positive ? 'reaction-icon-positive' : 'reaction-icon-mixed'}`}>
                {positive ? <PartyPopper className="h-10 w-10" /> : <ThumbsDown className="h-10 w-10" />}
              </div>
            </div>

            <p className="eyebrow mb-3">Crowd reaction</p>
            <h2 className="hero-title mb-4 !text-4xl">{positive ? 'Nice move!' : 'A tricky choice!'}</h2>
            <p className="mx-auto max-w-xl text-lg leading-8 text-[var(--color-text)]">{lastDecision.reaction}</p>

            <div className="my-8 grid gap-4 sm:grid-cols-2">
              <div className="mini-panel text-left">
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[var(--color-sunshine)]" />
                  <span className="text-sm font-black text-[var(--color-text)]">Reward stars earned</span>
                </div>
                <p className="text-3xl font-black text-[var(--color-text)]">+{lastStarReward}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  The bonus is only revealed after the crowd reacts.
                </p>
              </div>

              <div className="mini-panel text-left">
                <div className="mb-3 flex items-center gap-2">
                  {positive ? (
                    <ThumbsUp className="h-5 w-5 text-[var(--color-mint)]" />
                  ) : (
                    <ThumbsDown className="h-5 w-5 text-[var(--color-coral)]" />
                  )}
                  <span className="text-sm font-black text-[var(--color-text)]">What this means</span>
                </div>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  Every choice changes how people feel about the city. You will see the full city report at the end.
                </p>
              </div>
            </div>

            <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleContinue} className="primary-cta mx-auto justify-center">
              <span>Next city stop</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
