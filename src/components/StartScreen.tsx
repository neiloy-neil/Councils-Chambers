import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { User, UserCircle, Shield, Settings, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audioService';
import { cardEntrance, buttonHover } from '../animations/variants';
import { useGameStore } from '../store'; // Import the Zustand store
import '../styles/theme.css';

export default function StartScreen() {
  const startGame = useGameStore((state) => state.startGame);
  const setView = useGameStore((state) => state.setView);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<'male' | 'female'>('male');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      audioManager.play('paper');
      startGame(name.trim(), avatar);
    }
  };

  const selectAvatar = (av: 'male' | 'female') => {
    setAvatar(av);
    audioManager.play('click');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden relative start-screen-background"
    >
      <motion.div
        variants={cardEntrance}
        initial="initial"
        animate="animate"
        className="max-w-md w-full p-8 rounded-lg shadow-2xl start-screen-card"
      >
        <div className="flex justify-between items-start mb-8">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-4 rounded-2xl shadow-xl shield-icon-background"
          >
            <Shield className="w-8 h-8 shield-icon-color" />
          </motion.div>
          <motion.button
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setView('ADMIN')}
            className="p-3 rounded-xl admin-button"
            title="Admin Panel"
          >
            <Settings className="w-5 h-5 admin-button-icon" />
          </motion.button>
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-4xl font-serif font-black mb-4 tracking-tight title-color">
            Council Chambers
          </h1>
          <p className="text-lg font-medium leading-relaxed max-w-sm subtitle-color">
            Elected by the people. Guided by duty. Your term begins.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label
              className="block text-xs font-bold uppercase tracking-widest mb-2 label-color"
            >
              Designated Identity
            </label>
            <div className="relative group">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-6 py-4 rounded-lg border-2 transition-all text-lg font-bold input-field"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label
              className="block text-xs font-bold uppercase tracking-widest mb-2 label-color"
            >
              Portrait Selection
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={() => selectAvatar('male')}
                className={`group flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all relative overflow-hidden ${
                  avatar === 'male' ? 'avatar-button-male' : 'avatar-button-inactive'
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-3 z-10 transition-all ${
                    avatar === 'male' ? 'avatar-icon-male-active' : 'avatar-icon-inactive'
                  }`}
                >
                  <User className="w-8 h-8" />
                </div>
                <span
                  className={`text-xs font-bold tracking-widest z-10 uppercase ${
                    avatar === 'male' ? 'avatar-text-male-active' : 'avatar-text-inactive'
                  }`}
                >
                  Statesman
                </span>
              </motion.button>

              <motion.button
                type="button"
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={() => selectAvatar('female')}
                className={`group flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all relative overflow-hidden ${
                  avatar === 'female' ? 'avatar-button-female' : 'avatar-button-inactive'
                }`}
              >
                <div
                  className={`p-4 rounded-full mb-3 z-10 transition-all ${
                    avatar === 'female' ? 'avatar-icon-female-active' : 'avatar-icon-inactive'
                  }`}
                >
                  <UserCircle className="w-8 h-8" />
                </div>
                <span
                  className={`text-xs font-bold tracking-widest z-10 uppercase ${
                    avatar === 'female' ? 'avatar-text-female-active' : 'avatar-text-inactive'
                  }`}
                >
                  Matriarch
                </span>
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            className="w-full py-5 rounded-lg font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest submit-button"
          >
            <span>Accept Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
