import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../store/AppContext';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  differenceInDays,
  isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

export const CalendarView: React.FC = () => {
  const { profile, logs } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDayStatus = (date: Date) => {
    if (!profile.lastPeriodStart) return null;
    
    const lastStart = new Date(profile.lastPeriodStart);
    lastStart.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diff = differenceInDays(targetDate, lastStart);
    const cycleDay = ((diff % profile.cycleLength) + profile.cycleLength) % profile.cycleLength + 1;

    if (cycleDay <= profile.periodLength) return 'period';
    if (cycleDay >= profile.cycleLength - 16 && cycleDay <= profile.cycleLength - 12) {
      if (cycleDay === profile.cycleLength - 14) return 'ovulation';
      return 'fertile';
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-8 pb-28 px-6 overflow-y-auto"
    >
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Calendar</h1>
          <p className="text-slate-400 font-medium">Cycle predictions</p>
        </div>
      </header>

      <div className="glass-panel rounded-3xl p-5 mb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-white/10 text-white transition">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isDayToday = isToday(day);
            const status = getDayStatus(day);
            const log = logs[format(day, 'yyyy-MM-dd')];
            const hasLog = !!log && (log.flow !== 'None' || log.symptoms.length > 0 || log.mood.length > 0 || !!log.water || !!log.sleep || !!log.temperature);

            let bgClass = "bg-transparent text-slate-300 hover:bg-white/5";
            let dotClass = "";

            if (!isCurrentMonth) bgClass = "text-slate-600";
            
            if (status === 'period') {
              bgClass = "bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30";
              dotClass = "bg-brand-400";
            } else if (status === 'ovulation') {
              bgClass = "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30";
              dotClass = "bg-amber-400";
            } else if (status === 'fertile') {
              bgClass = "bg-teal-500/10 text-teal-300";
              dotClass = "bg-teal-500/50";
            }

            if (isDayToday) {
              bgClass += " ring-2 ring-white ring-inset";
            }

            return (
              <div 
                key={idx} 
                className={cn(
                  "aspect-square rounded-xl flex flex-col items-center justify-center relative transition-colors duration-200",
                  bgClass
                )}
              >
                <span className="text-sm z-10">{format(day, 'd')}</span>
                {/* Log indicator */}
                {hasLog && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
                {/* Status dot */}
                {status && (
                  <div className={cn("absolute bottom-1.5 w-1 h-1 rounded-full", dotClass)} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">Legend</h3>
        <div className="flex items-center gap-3 glass-panel p-3 rounded-2xl">
          <div className="w-4 h-4 rounded-full bg-brand-500/40 border border-brand-500 flex-shrink-0" />
          <span className="text-sm text-slate-300">Predicted Period</span>
        </div>
        <div className="flex items-center gap-3 glass-panel p-3 rounded-2xl">
          <div className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/30 flex-shrink-0" />
          <span className="text-sm text-slate-300">Fertile Window</span>
        </div>
        <div className="flex items-center gap-3 glass-panel p-3 rounded-2xl">
          <div className="w-4 h-4 rounded-full bg-amber-500/40 border border-amber-500 flex-shrink-0" />
          <span className="text-sm text-slate-300">Ovulation Day</span>
        </div>
        <div className="flex items-center gap-3 glass-panel p-3 rounded-2xl">
          <div className="w-1.5 h-1.5 ml-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
          <span className="text-sm text-slate-300">Logged Symptoms</span>
        </div>
      </div>
    </motion.div>
  );
};
