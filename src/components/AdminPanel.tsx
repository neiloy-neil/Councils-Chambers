import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Storage, GameResult } from '../utils/storage';
import { Scenario, DecisionOption } from '../data/scenarios';
import { ArrowLeft, Save, RotateCcw, Users, BookOpen, Trash2, Edit2, Check, X, Plus, AlertCircle } from 'lucide-react';
import { theme } from '../constants/theme';
import { buttonHover } from '../animations/variants';

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
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleResetScenarios = () => {
    if (confirm("Reset all scenarios to defaults? This cannot be undone.")) {
      const reset = Storage.resetScenarios();
      setScenarios(reset);
      showFeedback("Scenarios reset to defaults", "info");
    }
  };

  const handleSaveScenarios = () => {
    Storage.saveScenarios(scenarios);
    showFeedback("All changes committed to local storage");
  };

  const handleAddScenario = () => {
    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      title: "New Legislative Challenge",
      description: "Describe the situation here...",
      options: [
        {
          id: 'opt1',
          text: 'The progressive path',
          reaction: 'The public reacts to your change...',
          effects: { trust: 5, budget: -5, ethics: 10, impact: 5, support: 5 }
        },
        {
          id: 'opt2',
          text: 'The pragmatic path',
          reaction: 'The stakeholders accept the reality...',
          effects: { trust: -5, budget: 10, ethics: -5, impact: 0, support: 10 }
        }
      ]
    };
    setScenarios(prev => [...prev, newScenario]);
    setEditingId(newScenario.id);
    showFeedback("New scenario added");
  };

  const handleDeleteScenario = (id: string) => {
    if (confirm("Delete this scenario permanently?")) {
      setScenarios(prev => prev.filter(s => s.id !== id));
      showFeedback("Scenario removed", "info");
    }
  };

  const handleClearResults = () => {
    if (confirm("Clear all player history?")) {
      Storage.clearResults();
      setResults([]);
    }
  };

  const updateScenarioField = (id: string, field: keyof Scenario, value: any) => {
    setScenarios(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateOptionField = (scenarioId: string, optionId: string, field: keyof DecisionOption, value: any) => {
    setScenarios(prev => prev.map(s => {
      if (s.id === scenarioId) {
        return {
          ...s,
          options: s.options.map(o => o.id === optionId ? { ...o, [field]: value } : o)
        };
      }
      return s;
    }));
  };

  return (
    <div
      className="min-h-screen p-4 lg:p-8 font-sans"
      style={{
        background: `radial-gradient(ellipse at top, ${theme.colors.surface}, ${theme.colors.background})`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <header
          className="flex justify-between items-center mb-8 p-4 rounded-lg"
          style={{
            backgroundColor: theme.colors.surface,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.colors.primary}30`,
          }}
        >
          <motion.button
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            onClick={onBack}
            className="flex items-center gap-2 font-semibold"
            style={{ color: theme.colors.primary }}
          >
            <ArrowLeft className="w-5 h-5" />
            Exit Admin
          </motion.button>
          
          <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: `${theme.colors.background}80`}}>
            <button 
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'results' ? 'shadow-sm' : 'hover:bg-neutral-700'}`}
              style={{
                backgroundColor: activeTab === 'results' ? theme.colors.primary : 'transparent',
                color: activeTab === 'results' ? theme.colors.background : theme.colors.primary,
              }}
            >
              <Users className="w-4 h-4" />
              Results
            </button>
            <button 
              onClick={() => setActiveTab('scenarios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'scenarios' ? 'shadow-sm' : 'hover:bg-neutral-700'}`}
              style={{
                backgroundColor: activeTab === 'scenarios' ? theme.colors.primary : 'transparent',
                color: activeTab === 'scenarios' ? theme.colors.background : theme.colors.primary,
              }}
            >
              <BookOpen className="w-4 h-4" />
              Scenarios
            </button>
          </div>

          <div className="flex gap-2">
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
                  style={{
                    backgroundColor: feedback.type === 'success' ? `${theme.colors.success}20` : `${theme.colors.secondary}20`,
                    color: feedback.type === 'success' ? theme.colors.success : theme.colors.secondary,
                    border: `1px solid ${feedback.type === 'success' ? theme.colors.success : theme.colors.secondary}50`,
                  }}
                >
                  {feedback.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {feedback.message}
                </motion.div>
              )}
            </AnimatePresence>

            {activeTab === 'scenarios' && (
              <>
                <motion.button variants={buttonHover} whileHover="hover" whileTap="tap" onClick={handleResetScenarios} className="p-2 rounded-md" style={{ color: theme.colors.warning }} title="Reset to Defaults">
                  <RotateCcw className="w-5 h-5" />
                </motion.button>
                <motion.button variants={buttonHover} whileHover="hover" whileTap="tap" onClick={handleSaveScenarios} className="p-2 rounded-md" style={{ color: theme.colors.success }} title="Save All Changes">
                  <Save className="w-5 h-5" />
                </motion.button>
              </>
            )}
            {activeTab === 'results' && (
              <motion.button variants={buttonHover} whileHover="hover" whileTap="tap" onClick={handleClearResults} className="p-2 rounded-md" style={{ color: theme.colors.danger }} title="Clear History">
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </header>

        {activeTab === 'results' ? (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="rounded-lg shadow-xl overflow-hidden" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.primary}30`}}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-mono text-xs uppercase tracking-widest" style={{ borderBottom: `1px solid ${theme.colors.primary}30`, color: theme.colors.secondary }}>
                    <th className="px-6 py-4">Player</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Final Score</th>
                    <th className="px-6 py-4 text-center">Trust</th>
                    <th className="px-6 py-4 text-center">Budget</th>
                    <th className="px-6 py-4 text-center">Ethics</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: `${theme.colors.primary}20` }}>
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center italic" style={{ color: theme.colors.secondary }}>
                        No council terms completed yet.
                      </td>
                    </tr>
                  ) : (
                    results.map(r => (
                      <tr key={r.id} style={{ color: 'white' }}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.colors.primary}20`, color: theme.colors.primary }}>
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="font-bold">{r.playerName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded-md font-bold text-xs uppercase" style={{ backgroundColor: `${theme.colors.secondary}20`, color: theme.colors.secondary }}>
                            {r.id.split('-')[0]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xl font-black">{r.finalScores.total}</span>
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-sm">{r.finalScores.trust}%</td>
                        <td className="px-6 py-4 text-center font-mono text-sm">{r.finalScores.budget}%</td>
                        <td className="px-6 py-4 text-center font-mono text-sm">{r.finalScores.ethics}%</td>
                        <td className="px-6 py-4 text-right text-xs" style={{ color: theme.colors.secondary }}>{new Date(r.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'white' }}>Archive Scenarios</h2>
              <motion.button
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={handleAddScenario}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-md"
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }}
              >
                <Plus className="w-4 h-4" />
                New Scenario
              </motion.button>
            </div>

            {scenarios.map(s => (
              <motion.div
                layout
                key={s.id}
                className="rounded-lg p-6 shadow-md"
                style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.primary}30` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-full mr-4">
                    {editingId === s.id ? (
                      <input 
                        className="w-full text-xl font-black border-b-2 py-1"
                        style={{ backgroundColor: 'transparent', borderColor: theme.colors.primary, color: 'white' }}
                        value={s.title}
                        onChange={(e) => updateScenarioField(s.id, 'title', e.target.value)}
                      />
                    ) : (
                      <h3 className="text-xl font-black" style={{ color: 'white' }}>{s.title}</h3>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editingId === s.id && (
                      <motion.button
                        variants={buttonHover}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => handleDeleteScenario(s.id)}
                        className="p-2 rounded-xl"
                        style={{ backgroundColor: `${theme.colors.danger}20`, color: theme.colors.danger }}
                        title="Delete Scenario"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    )}
                    <motion.button
                      variants={buttonHover}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setEditingId(editingId === s.id ? null : s.id)}
                      className="p-2 rounded-xl"
                      style={{
                        backgroundColor: editingId === s.id ? `${theme.colors.success}20` : `${theme.colors.secondary}20`,
                        color: editingId === s.id ? theme.colors.success : theme.colors.secondary
                      }}
                    >
                      {editingId === s.id ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </div>

                <div className="mb-6">
                  {editingId === s.id ? (
                    <textarea 
                      className="w-full p-4 rounded-lg leading-relaxed"
                      style={{ backgroundColor: `${theme.colors.background}80`, color: 'white', border: `1px solid ${theme.colors.secondary}50` }}
                      rows={3}
                      value={s.description}
                      onChange={(e) => updateScenarioField(s.id, 'description', e.target.value)}
                    />
                  ) : (
                    <p className="leading-relaxed text-sm" style={{ color: 'white' }}>{s.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: theme.colors.secondary }}>Options & Reactions</p>
                  {s.options.map(o => (
                    <div key={o.id} className="p-4 rounded-lg flex flex-col gap-3" style={{ backgroundColor: `${theme.colors.background}80`, border: `1px solid ${theme.colors.secondary}50` }}>
                      <div className="flex gap-3">
                         <span className="text-xs px-2 py-1 rounded font-bold uppercase h-fit" style={{ backgroundColor: `${theme.colors.secondary}20`, color: theme.colors.secondary }}>Option</span>
                         {editingId === s.id ? (
                            <input 
                              className="flex-1 bg-transparent border-b text-sm font-semibold"
                              style={{ borderColor: `${theme.colors.secondary}50`, color: 'white' }}
                              value={o.text}
                              onChange={(e) => updateOptionField(s.id, o.id, 'text', e.target.value)}
                            />
                         ) : (
                            <p className="text-sm font-semibold" style={{ color: 'white' }}>{o.text}</p>
                         )}
                      </div>
                      <div className="flex gap-3 border-t pt-3" style={{ borderColor: `${theme.colors.primary}20` }}>
                         <span className="text-xs px-2 py-1 rounded font-bold uppercase h-fit" style={{ backgroundColor: `${theme.colors.primary}20`, color: theme.colors.primary }}>Reaction</span>
                         {editingId === s.id ? (
                            <input 
                              className="flex-1 bg-transparent border-b text-sm italic"
                              style={{ borderColor: `${theme.colors.primary}50`, color: 'white' }}
                              value={o.reaction}
                              onChange={(e) => updateOptionField(s.id, o.id, 'reaction', e.target.value)}
                            />
                         ) : (
                            <p className="text-sm italic font-medium" style={{ color: 'white' }}>"{o.reaction}"</p>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="flex justify-center pt-8 pb-12">
               <motion.button
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={handleSaveScenarios}
                className="flex items-center gap-2 px-12 py-5 rounded-lg font-bold shadow-xl"
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }}
               >
                 <Save className="w-5 h-5" />
                 Commit All Archive Changes
               </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
