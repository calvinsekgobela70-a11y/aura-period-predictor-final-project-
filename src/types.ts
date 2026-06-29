export interface UserProfile {
  name: string;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string | null;
}

export type FlowLevel = 'None' | 'Light' | 'Medium' | 'Heavy';

export interface DailyLog {
  date: string; // YYYY-MM-DD
  flow: FlowLevel;
  symptoms: string[];
  mood: string[];
  notes: string;
  temperature?: number;
  water?: number; // glasses
  sleep?: number; // hours
}

export type Phase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';
