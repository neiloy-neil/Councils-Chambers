import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Storage, GameResult } from '../utils/storage';
import { Scenario, DecisionOption } from '../data/scenarios';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Users,
  BookOpen,
  Trash2,
  Edit2,
  Check,
  Plus,
  Sparkles,
  Star,
} from 'lucide-react';
import { buttonVariants } from '../animations/variants';
import '../styles/theme.css';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [results, setResults] = useState<GameResult[]>(Storage.getResults());
  const [scenarios, setScenarios] = useState<Scenario[]>(Storage.getScenarios());
  const [activeTab, setActiveTab] = useState<'results' | 'scenarios'>('results');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showFeedback = (message: string, type: 'success' | 'info' = 'success') => {
    setFeedback({ message, type });
  };

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 2600);
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleResetScenarios = () => {
    if (!confirm('Reset the Cartoon City story pack to defaults?')) return;
    const reset = Storage.resetScenarios();
    setScenarios(reset);
    showFeedback('Story pack reset to default', 'info');
  };

  const handleSaveScenarios = () => {
    Storage.saveScenarios(scenarios);
    showFeedback('Story pack saved');
    setEditingId(null);
  };

  const handleAddScenario = () => {
    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      title: 'New Cartoon City mission',
      description: 'Describe the next playful city problem here.',
      options: [
        {
          id: 'opt1',
          text: 'Choose the extra kind plan',
          reaction: 'The neighborhood smiles at the helpful idea.',
          effects: { trust: 5, budget: -5, ethics: 10, impact: 5, support: 5, reputation: 5 },
        },
        {
          id: 'opt2',
          text: 'Choose the careful budget plan',
          reaction: 'The coin jar is safer, but not everyone feels thrilled.',
          effects: { trust: -5, budget: 10, ethics: -5, impact: 0, support: 10, reputation: -5 },
        },
      ],
    };

    setScenarios((prev) => [...prev, newScenario]);
    setEditingId(newScenario.id);
    showFeedback('New story stop added');
  };

  const handleDeleteScenario = (id: string) => {
    if (!confirm('Delete this story stop?')) return;
    setScenarios((prev) => prev.filter((scenario) => scenario.id !== id));
    showFeedback('Story stop removed', 'info');
  };

  const handleClearResults = () => {
    if (!confirm('Clear all saved player runs?')) return;
    Storage.clearResults();
    setResults([]);
    showFeedback('Saved runs cleared', 'info');
  };

  const updateScenarioField = (id: string, field: keyof Scenario, value: string) => {
    setScenarios((prev) => prev.map((scenario) => (scenario.id === id ? { ...scenario, [field]: value } : scenario)));
  };

  const updateOptionField = (scenarioId: string, optionId: string, field: keyof DecisionOption, value: string) => {
    setScenarios((prev) =>
      prev.map((scenario) => {
        if (scenario.id !== scenarioId) return scenario;
        return {
          ...scenario,
          options: scenario.options.map((option) => (option.id === optionId ? { ...option, [field]: value } : option)),
        };
      }),
    );
  };

  const TabButton = ({
    tabName,
    label,
    icon: Icon,
  }: {
    tabName: 'results' | 'scenarios';
    label: string;
    icon: typeof Users;
  }) => (
    <button onClick={() => setActiveTab(tabName)} className={`tab-pill ${activeTab === tabName ? 'tab-pill-active' : ''}`}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="playful-shell min-h-screen px-4 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="panel-card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={onBack} className="secondary-pill">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to game</span>
            </motion.button>
            <div>
              <p className="eyebrow">Creator hub</p>
              <h1 className="text-2xl font-black text-[var(--color-text)]">Cartoon City editor</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="tab-group">
              <TabButton tabName="results" label="Saved Runs" icon={Users} />
              <TabButton tabName="scenarios" label="Story Pack" icon={BookOpen} />
            </div>

            {activeTab === 'scenarios' ? (
              <>
                <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleResetScenarios} className="icon-pill">
                  <RotateCcw className="h-4 w-4" />
                </motion.button>
                <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleSaveScenarios} className="icon-pill">
                  <Save className="h-4 w-4" />
                </motion.button>
              </>
            ) : (
              <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleClearResults} className="icon-pill">
                <Trash2 className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {activeTab === 'results' ? (
              <div className="panel-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left">
                    <thead className="text-sm text-[var(--color-muted)]">
                      <tr className="border-b border-[rgba(22,50,79,0.12)]">
                        <th className="px-4 py-4 font-black">Player</th>
                        <th className="px-4 py-4 font-black">Title</th>
                        <th className="px-4 py-4 font-black">Stars</th>
                        <th className="px-4 py-4 font-black">Badges</th>
                        <th className="px-4 py-4 font-black">Score</th>
                        <th className="px-4 py-4 text-right font-black">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-20 text-center text-sm font-bold text-[var(--color-muted)]">
                            No saved runs yet. Finish a city adventure to see results here.
                          </td>
                        </tr>
                      ) : (
                        results.map((result) => (
                          <tr key={result.id} className="border-b border-[rgba(22,50,79,0.08)] text-[var(--color-text)]">
                            <td className="px-4 py-4 font-black">{result.playerName}</td>
                            <td className="px-4 py-4">{result.title}</td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(255,216,90,0.35)] px-3 py-1 text-sm font-black">
                                <Star className="h-3.5 w-3.5" />
                                {result.starsEarned}
                              </span>
                            </td>
                            <td className="px-4 py-4">{result.badges.length}</td>
                            <td className="px-4 py-4 text-xl font-black">{result.finalScores.total}</td>
                            <td className="px-4 py-4 text-right text-sm font-bold text-[var(--color-muted)]">
                              {new Date(result.timestamp).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="eyebrow">Story pack editor</p>
                    <h2 className="text-2xl font-black text-[var(--color-text)]">Playful city scenarios</h2>
                  </div>

                  <motion.button variants={buttonVariants} whileHover="hover" whileTap="tap" onClick={handleAddScenario} className="primary-cta">
                    <Plus className="h-4 w-4" />
                    <span>Add story stop</span>
                  </motion.button>
                </div>

                {scenarios.map((scenario) => (
                  <motion.div key={scenario.id} layout className="panel-card p-5">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        {editingId === scenario.id ? (
                          <input
                            className="playful-input"
                            value={scenario.title}
                            onChange={(event) => updateScenarioField(scenario.id, 'title', event.target.value)}
                          />
                        ) : (
                          <h3 className="text-xl font-black text-[var(--color-text)]">{scenario.title}</h3>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {editingId === scenario.id && (
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleDeleteScenario(scenario.id)}
                            className="icon-pill"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        )}

                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => setEditingId(editingId === scenario.id ? null : scenario.id)}
                          className="icon-pill"
                        >
                          {editingId === scenario.id ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                        </motion.button>
                      </div>
                    </div>

                    <div className="mb-5">
                      {editingId === scenario.id ? (
                        <textarea
                          className="playful-input min-h-28"
                          value={scenario.description}
                          onChange={(event) => updateScenarioField(scenario.id, 'description', event.target.value)}
                        />
                      ) : (
                        <p className="text-base leading-7 text-[var(--color-muted)]">{scenario.description}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[var(--color-berry)]" />
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--color-muted)]">Options and reactions</p>
                      </div>

                      {scenario.options.map((option) => (
                        <div key={option.id} className="mini-panel">
                          <div className="mb-3 rounded-2xl bg-white/70 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--color-muted)]">
                            Option
                          </div>
                          {editingId === scenario.id ? (
                            <input
                              className="playful-input mb-3"
                              value={option.text}
                              onChange={(event) => updateOptionField(scenario.id, option.id, 'text', event.target.value)}
                            />
                          ) : (
                            <p className="mb-3 text-base font-black text-[var(--color-text)]">{option.text}</p>
                          )}

                          <div className="rounded-2xl bg-[rgba(255,255,255,0.7)] px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--color-muted)]">
                            Reaction
                          </div>
                          {editingId === scenario.id ? (
                            <input
                              className="playful-input mt-3"
                              value={option.reaction}
                              onChange={(event) => updateOptionField(scenario.id, option.id, 'reaction', event.target.value)}
                            />
                          ) : (
                            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{option.reaction}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 16, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 10, x: '-50%' }}
              className="toast-pill"
            >
              {feedback.type === 'success' ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              <span>{feedback.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
