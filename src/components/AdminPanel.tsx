/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Storage, GameResult } from '../utils/storage';
import { Scenario, DecisionOption } from '../data/scenarios';
import { ArrowLeft, Save, RotateCcw, Users, BookOpen, Trash2, Edit2, Check, X } from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [results, setResults] = useState<GameResult[]>(Storage.getResults());
  const [scenarios, setScenarios] = useState<Scenario[]>(Storage.getScenarios());
  const [activeTab, setActiveTab] = useState<'results' | 'scenarios'>('results');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleResetScenarios = () => {
    if (confirm("Reset all scenarios to defaults? This cannot be undone.")) {
      const reset = Storage.resetScenarios();
      setScenarios(reset);
    }
  };

  const handleSaveScenarios = () => {
    Storage.saveScenarios(scenarios);
    alert("Scenarios saved to local storage!");
    // FUTURE: PUT /api/scenarios
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
    <div className="min-h-screen bg-slate-100 p-4 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Exit Admin
          </button>
          
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'results' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Users className="w-4 h-4" />
              Results
            </button>
            <button 
              onClick={() => setActiveTab('scenarios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'scenarios' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <BookOpen className="w-4 h-4" />
              Scenarios
            </button>
          </div>

          <div className="flex gap-2">
            {activeTab === 'scenarios' && (
              <>
                <button onClick={handleResetScenarios} className="p-2 text-slate-400 hover:text-orange-600 transition-colors" title="Reset to Defaults">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button onClick={handleSaveScenarios} className="p-2 text-slate-400 hover:text-green-600 transition-colors" title="Save All Changes">
                  <Save className="w-5 h-5" />
                </button>
              </>
            )}
            {activeTab === 'results' && (
              <button onClick={handleClearResults} className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Clear History">
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {activeTab === 'results' ? (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    <th className="px-6 py-4">Player</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Final Score</th>
                    <th className="px-6 py-4 text-center">Trust</th>
                    <th className="px-6 py-4 text-center">Budget</th>
                    <th className="px-6 py-4 text-center">Ethics</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                        No council terms completed yet.
                      </td>
                    </tr>
                  ) : (
                    results.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-slate-800">{r.playerName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-bold text-[10px] uppercase">
                            {r.id.split('-')[0]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xl font-black text-slate-900">{r.finalScores.total}</span>
                        </td>
                        <td className="px-6 py-4 text-center font-mono text-sm">{r.finalScores.trust}%</td>
                        <td className="px-6 py-4 text-center font-mono text-sm">{r.finalScores.budget}%</td>
                        <td className="px-6 py-4 text-center font-mono text-sm">{r.finalScores.ethics}%</td>
                        <td className="px-6 py-4 text-right text-xs text-slate-400">{new Date(r.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {scenarios.map(s => (
              <motion.div 
                layout
                key={s.id} 
                className="bg-white rounded-3xl p-6 shadow-md border border-slate-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-full mr-4">
                    {editingId === s.id ? (
                      <input 
                        className="w-full text-xl font-black text-slate-900 border-b-2 border-blue-600 focus:outline-none py-1"
                        value={s.title}
                        onChange={(e) => updateScenarioField(s.id, 'title', e.target.value)}
                      />
                    ) : (
                      <h3 className="text-xl font-black text-slate-900">{s.title}</h3>
                    )}
                  </div>
                  <button 
                    onClick={() => setEditingId(editingId === s.id ? null : s.id)}
                    className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    {editingId === s.id ? <Check className="w-5 h-5 text-green-600" /> : <Edit2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="mb-6">
                  {editingId === s.id ? (
                    <textarea 
                      className="w-full p-4 bg-slate-50 rounded-2xl text-slate-600 leading-relaxed focus:outline-none border border-slate-200"
                      rows={3}
                      value={s.description}
                      onChange={(e) => updateScenarioField(s.id, 'description', e.target.value)}
                    />
                  ) : (
                    <p className="text-slate-600 leading-relaxed text-sm">{s.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Options & Reactions</p>
                  {s.options.map(o => (
                    <div key={o.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
                      <div className="flex gap-3">
                         <span className="text-[10px] bg-slate-200 px-2 py-1 rounded font-bold uppercase text-slate-500 h-fit">Option</span>
                         {editingId === s.id ? (
                            <input 
                              className="flex-1 bg-transparent border-b border-slate-300 focus:outline-none text-sm font-semibold"
                              value={o.text}
                              onChange={(e) => updateOptionField(s.id, o.id, 'text', e.target.value)}
                            />
                         ) : (
                            <p className="text-sm font-semibold text-slate-700">{o.text}</p>
                         )}
                      </div>
                      <div className="flex gap-3 border-t border-slate-200 pt-3">
                         <span className="text-[10px] bg-orange-100 px-2 py-1 rounded font-bold uppercase text-orange-600 h-fit">Reaction</span>
                         {editingId === s.id ? (
                            <input 
                              className="flex-1 bg-transparent border-b border-orange-200 focus:outline-none text-sm italic text-slate-600"
                              value={o.reaction}
                              onChange={(e) => updateOptionField(s.id, o.id, 'reaction', e.target.value)}
                            />
                         ) : (
                            <p className="text-sm italic text-slate-600 font-medium">"{o.reaction}"</p>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="flex justify-center pt-8 pb-12">
               <button 
                onClick={handleSaveScenarios}
                className="flex items-center gap-2 bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
               >
                 <Save className="w-5 h-5" />
                 Commit All Archive Changes
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
