import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, DailyLog } from '../types';

interface AppContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logs: Record<string, DailyLog>;
  updateLog: (date: string, log: Partial<DailyLog>) => void;
}

const defaultProfile: UserProfile = {
  name: 'Aura',
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [logs, setLogs] = useState<Record<string, DailyLog>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedProfile = localStorage.getItem('aura_profile');
    const savedLogs = localStorage.getItem('aura_logs');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('aura_profile', JSON.stringify(profile));
      localStorage.setItem('aura_logs', JSON.stringify(logs));
    }
  }, [profile, logs, isLoaded]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const updateLog = (date: string, logUpdates: Partial<DailyLog>) => {
    setLogs((prev) => {
      const existing = prev[date] || { date, flow: 'None', symptoms: [], mood: [], notes: '' };
      return {
        ...prev,
        [date]: { ...existing, ...logUpdates },
      };
    });
  };

  if (!isLoaded) return null; // Or a loading spinner

  return (
    <AppContext.Provider value={{ profile, updateProfile, logs, updateLog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
