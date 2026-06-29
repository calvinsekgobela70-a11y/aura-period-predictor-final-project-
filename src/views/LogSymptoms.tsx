import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../store/AppContext';
import { format } from 'date-fns';
import { Droplet, Frown, Smile, Zap, Coffee, Check, Activity, Moon, Thermometer, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../utils';
import { FlowLevel } from '../types';

export const LogSymptoms: React.FC = () => {
  const { logs, updateLog } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  const currentLog = logs[selectedDate] || { flow: 'None', symptoms: [], mood: [], notes: '' };

  const flows: FlowLevel[] = ['None', 'Light', 'Medium', 'Heavy'];
  const symptomsList = [
    { id: 'cramps', label: 'Cramps', icon: Zap },
    { id: 'headache', label: 'Headache', icon: Activity },
    { id: 'bloating', label: 'Bloating', icon: Coffee },
    { id: 'fatigue', label: 'Fatigue', icon: Droplet },
  ];
  const moodsList = [
    { id: 'happy', label: 'Happy', icon: Smile },
    { id: 'sad', label: 'Sad', icon: Frown },
    { id: 'anxious', label: 'Anxious', icon: Zap },
    { id: 'irritable', label: 'Irritable', icon: Zap },
  ];

  const handleSave = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#8b5cf6', '#3b82f6']
    });
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) return array.filter(i => i !== item);
    return [...array, item];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-8 pb-28 px-6 overflow-y-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Daily Log</h1>
        <p className="text-slate-400 font-medium">Track how you feel today</p>
      </header>

      {/* Date Selector */}
      <div className="mb-8">
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Flow Selection */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Flow</h2>
        <div className="grid grid-cols-4 gap-3">
          {flows.map((flow) => {
            const isActive = currentLog.flow === flow;
            return (
              <motion.button
                key={flow}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateLog(selectedDate, { flow })}
                className={cn(
                  "py-3 rounded-2xl text-sm font-medium transition-all duration-300 border",
                  isActive 
                    ? "bg-brand-500/20 border-brand-500 text-brand-300 shadow-lg shadow-brand-500/20" 
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                )}
              >
                {flow}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Symptoms */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Symptoms</h2>
        <div className="grid grid-cols-2 gap-3">
          {symptomsList.map((symptom) => {
            const Icon = symptom.icon;
            const isActive = currentLog.symptoms.includes(symptom.id);
            return (
              <motion.button
                key={symptom.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateLog(selectedDate, { symptoms: toggleArrayItem(currentLog.symptoms, symptom.id) })}
                className={cn(
                  "p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 border",
                  isActive 
                    ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20" 
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                )}
              >
                <Icon size={20} className={isActive ? "text-indigo-400" : "text-slate-500"} />
                <span className="font-medium text-sm">{symptom.label}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Mood */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Mood</h2>
        <div className="grid grid-cols-2 gap-3">
          {moodsList.map((mood) => {
            const Icon = mood.icon;
            const isActive = currentLog.mood.includes(mood.id);
            return (
              <motion.button
                key={mood.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateLog(selectedDate, { mood: toggleArrayItem(currentLog.mood, mood.id) })}
                className={cn(
                  "p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 border",
                  isActive 
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/20" 
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                )}
              >
                <Icon size={20} className={isActive ? "text-amber-400" : "text-slate-500"} />
                <span className="font-medium text-sm">{mood.label}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Wellness */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Wellness Tracker</h2>
        <div className="space-y-3">
          
          {/* Water */}
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Droplet size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Water</p>
                <p className="text-xs text-slate-400">{currentLog.water || 0} glasses</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateLog(selectedDate, { water: Math.max(0, (currentLog.water || 0) - 1) })} 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
              >
                <Minus size={18} />
              </button>
              <button 
                onClick={() => updateLog(selectedDate, { water: (currentLog.water || 0) + 1 })} 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Sleep */}
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Moon size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sleep</p>
                <p className="text-xs text-slate-400">{currentLog.sleep || 0} hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateLog(selectedDate, { sleep: Math.max(0, (currentLog.sleep || 0) - 0.5) })} 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
              >
                <Minus size={18} />
              </button>
              <button 
                onClick={() => updateLog(selectedDate, { sleep: Math.min(24, (currentLog.sleep || 0) + 0.5) })} 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* BBT */}
          <div className="glass-panel p-4 rounded-2xl flex items-center justify-between border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                <Thermometer size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Temp (BBT)</p>
                <p className="text-xs text-slate-400">°Celsius</p>
              </div>
            </div>
            <div className="w-24">
              <input
                type="number"
                step="0.01"
                placeholder="36.5"
                value={currentLog.temperature || ''}
                onChange={(e) => updateLog(selectedDate, { temperature: parseFloat(e.target.value) || undefined })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Notes */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Notes</h2>
        <textarea 
          value={currentLog.notes}
          onChange={(e) => updateLog(selectedDate, { notes: e.target.value })}
          placeholder="Jot down anything else..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[100px] resize-none"
        />
      </section>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-brand-500 to-indigo-600 text-white font-semibold py-4 rounded-2xl shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2"
      >
        <Check size={20} />
        Save Log for Today
      </motion.button>
    </motion.div>
  );
};
