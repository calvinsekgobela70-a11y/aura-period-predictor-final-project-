import React from 'react';
import { Home, CalendarDays, CalendarPlus, Apple, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

type Tab = 'home' | 'calendar' | 'log' | 'nutrition' | 'settings';

interface NavigationProps {
  currentTab: Tab;
  setTab: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, setTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Today' },
    { id: 'calendar', icon: CalendarDays, label: 'Calendar' },
    { id: 'log', icon: CalendarPlus, label: 'Log' },
    { id: 'nutrition', icon: Apple, label: 'Nourish' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 z-50 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="glass-panel rounded-3xl p-2 flex justify-between items-center shadow-2xl shadow-brand-500/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id as Tab)}
                className={cn(
                  "relative flex flex-col items-center justify-center flex-1 h-14 rounded-2xl transition-colors duration-300",
                  isActive ? "text-brand-300" : "text-slate-400 hover:text-slate-200"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-brand-500/20 rounded-2xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={22} className="relative z-10 mb-1" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium relative z-10">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
