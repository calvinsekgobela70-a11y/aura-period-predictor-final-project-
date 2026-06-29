import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../store/AppContext';
import { differenceInDays, addDays, format, isToday } from 'date-fns';
import { cn } from '../utils';
import { UterusIcon } from '../components/Icons';

export const Dashboard: React.FC = () => {
  const { profile } = useAppContext();
  
  const today = new Date();
  let dayOfCycle = 0;
  let nextPeriodDate = new Date();
  let daysUntilNext = 0;
  let currentPhase = 'Unknown';
  let phaseDescription = 'Please set your last period start date in settings.';
  let phaseColor = 'from-slate-500 to-slate-700';

  if (profile.lastPeriodStart) {
    const lastStart = new Date(profile.lastPeriodStart);
    const diff = differenceInDays(today, lastStart);
    dayOfCycle = (diff % profile.cycleLength) + 1;
    
    // Prediction math
    const cyclesSince = Math.floor(diff / profile.cycleLength);
    nextPeriodDate = addDays(lastStart, (cyclesSince + 1) * profile.cycleLength);
    daysUntilNext = differenceInDays(nextPeriodDate, today);

    // Phases definition
    const ovulationDay = profile.cycleLength - 14; // roughly 14 days before next period

    if (dayOfCycle <= profile.periodLength) {
      currentPhase = 'Menstrual Phase';
      phaseDescription = "Time to rest and reflect. Your body is shedding its lining.";
      phaseColor = "from-brand-600 to-brand-900";
    } else if (dayOfCycle < ovulationDay - 2) {
      currentPhase = 'Follicular Phase';
      phaseDescription = "Energy is rising. A great time for new projects and workouts!";
      phaseColor = "from-blue-400 to-indigo-600";
    } else if (dayOfCycle >= ovulationDay - 2 && dayOfCycle <= ovulationDay + 1) {
      currentPhase = 'Ovulation Phase';
      phaseDescription = "You are glowing and at your peak energy levels.";
      phaseColor = "from-amber-400 to-orange-500";
    } else {
      currentPhase = 'Luteal Phase';
      phaseDescription = "Winding down. You might crave comfort and feel a bit more introverted.";
      phaseColor = "from-purple-400 to-fuchsia-600";
    }
  }

  // Calculate ring progress
  const progress = profile.lastPeriodStart ? (dayOfCycle / profile.cycleLength) * 100 : 0;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-8 pb-24 px-6 overflow-y-auto"
    >
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Hi, {profile.name}
          </h1>
          <p className="text-slate-400 font-medium">Here's your cycle insight</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-400 to-indigo-500 p-2 shadow-lg shadow-brand-500/30 flex items-center justify-center">
          <UterusIcon className="w-full h-full text-white" />
        </div>
      </header>

      {/* Main Cycle Ring */}
      <div className="relative flex justify-center items-center mb-12">
        <svg className="w-72 h-72 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="144" cy="144" r="120"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="16"
          />
          {/* Progress circle */}
          <motion.circle
            cx="144" cy="144" r="120"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {profile.lastPeriodStart ? (
            <>
              <span className="text-6xl font-bold text-white mb-1 tracking-tighter">
                Day {dayOfCycle}
              </span>
              <span className="text-sm font-medium text-brand-300 px-4 py-1 rounded-full bg-brand-500/10">
                {currentPhase}
              </span>
            </>
          ) : (
            <span className="text-lg text-slate-400 max-w-[150px]">
              Setup needed
            </span>
          )}
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-5 rounded-3xl flex flex-col justify-center items-center text-center"
        >
          <span className="text-slate-400 text-sm mb-2">Next Period</span>
          <span className="text-2xl font-semibold text-white">
            {profile.lastPeriodStart ? `${daysUntilNext} Days` : '--'}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            {profile.lastPeriodStart ? format(nextPeriodDate, 'MMM do') : 'N/A'}
          </span>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={cn("p-5 rounded-3xl flex flex-col justify-center text-center shadow-lg bg-gradient-to-br", phaseColor)}
        >
          <span className="text-white/80 text-sm mb-1 font-medium">Current Phase</span>
          <span className="text-white text-lg font-semibold leading-tight">
            {profile.lastPeriodStart ? currentPhase : 'Unknown'}
          </span>
        </motion.div>
      </div>

      {/* Phase Info */}
      <div className="glass-panel p-6 rounded-3xl mb-8">
        <h3 className="text-lg font-semibold text-white mb-2">What's happening?</h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          {phaseDescription}
        </p>
      </div>
    </motion.div>
  );
};
