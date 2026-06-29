import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppProvider } from './store/AppContext';
import { Navigation } from './components/Navigation';
import { Dashboard } from './views/Dashboard';
import { CalendarView } from './views/CalendarView';
import { LogSymptoms } from './views/LogSymptoms';
import { Nutrition } from './views/Nutrition';
import { Settings } from './views/Settings';

type Tab = 'home' | 'calendar' | 'log' | 'nutrition' | 'settings';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');

  const renderTab = () => {
    switch (currentTab) {
      case 'home': return <Dashboard key="home" />;
      case 'calendar': return <CalendarView key="calendar" />;
      case 'log': return <LogSymptoms key="log" />;
      case 'nutrition': return <Nutrition key="nutrition" />;
      case 'settings': return <Settings key="settings" />;
      default: return <Dashboard key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex justify-center selection:bg-brand-500/30">
      {/* Mobile constraint container wrapper */}
      <div className="w-full max-w-md h-[100dvh] relative bg-slate-900 shadow-2xl overflow-hidden sm:border-x border-white/5 sm:my-auto sm:max-h-[900px] sm:rounded-[2.5rem] sm:ring-8 ring-slate-800">
        
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-brand-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px]" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 h-full w-full">
          <AnimatePresence mode="wait">
            {renderTab()}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <Navigation currentTab={currentTab} setTab={setCurrentTab} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
