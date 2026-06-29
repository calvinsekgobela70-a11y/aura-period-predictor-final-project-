import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../store/AppContext';
import { Download, Save, ShieldAlert } from 'lucide-react';

export const Settings: React.FC = () => {
  const { profile, updateProfile, logs } = useAppContext();
  const [name, setName] = useState(profile.name);
  const [cycleLength, setCycleLength] = useState(profile.cycleLength);
  const [periodLength, setPeriodLength] = useState(profile.periodLength);
  const [lastPeriod, setLastPeriod] = useState(profile.lastPeriodStart || '');

  const handleSave = () => {
    updateProfile({
      name,
      cycleLength: Number(cycleLength),
      periodLength: Number(periodLength),
      lastPeriodStart: lastPeriod || null
    });
    // Visual feedback could be added here
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ profile, logs }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aura-health-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-8 pb-28 px-6 overflow-y-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400 font-medium">Customize your Aura</p>
      </header>

      <section className="space-y-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Cycle Length (Days)</label>
            <input 
              type="number" 
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Period Length (Days)</label>
            <input 
              type="number" 
              value={periodLength}
              onChange={(e) => setPeriodLength(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Last Period Start Date</label>
          <input 
            type="date" 
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full bg-white/10 hover:bg-white/15 text-white font-medium py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <Save size={18} />
          Save Preferences
        </motion.button>
      </section>

      <div className="h-px w-full bg-white/10 mb-10"></div>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Export Data</h2>
        <p className="text-sm text-slate-400 mb-6">
          Securely export your cycle logs and profile data to share with your physician. This generates a JSON file.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mb-4"
        >
          <Download size={20} />
          Export to Physician
        </motion.button>

        <div className="flex items-start gap-3 mt-6 p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20">
          <ShieldAlert size={20} className="text-brand-400 flex-shrink-0 mt-1" />
          <p className="text-xs text-brand-200/80 leading-relaxed">
            Your data never leaves your device unless you export it. Aura uses local storage to ensure maximum privacy and security.
          </p>
        </div>
      </section>
    </motion.div>
  );
};
