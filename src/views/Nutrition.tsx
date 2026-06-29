import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../store/AppContext';
import { differenceInDays } from 'date-fns';
import { Leaf, Flame, Droplet, Sun } from 'lucide-react';

export const Nutrition: React.FC = () => {
  const { profile } = useAppContext();
  
  let dayOfCycle = 1;
  if (profile.lastPeriodStart) {
    const today = new Date();
    const lastStart = new Date(profile.lastPeriodStart);
    dayOfCycle = (differenceInDays(today, lastStart) % profile.cycleLength) + 1;
  }

  const ovulationDay = profile.cycleLength - 14;
  let phase = 'menstrual';
  if (dayOfCycle > profile.periodLength && dayOfCycle < ovulationDay - 2) phase = 'follicular';
  if (dayOfCycle >= ovulationDay - 2 && dayOfCycle <= ovulationDay + 1) phase = 'ovulation';
  if (dayOfCycle > ovulationDay + 1) phase = 'luteal';

  const phaseDetails = {
    menstrual: {
      title: "Menstrual Phase",
      focus: "Replenish Iron & Rest",
      icon: Droplet,
      color: "from-brand-600 to-brand-800",
      foods: ["Spinach", "Dark Chocolate", "Lentils", "Red Meat", "Kelp"],
      avoid: ["Alcohol", "Caffeine", "Salty Foods"],
      tip: "Your iron levels drop as you bleed. Focus on iron-rich foods and pair them with Vitamin C to increase absorption."
    },
    follicular: {
      title: "Follicular Phase",
      focus: "Energy & Fermented Foods",
      icon: Leaf,
      color: "from-emerald-500 to-teal-700",
      foods: ["Broccoli", "Kimchi", "Oats", "Lean Proteins", "Flaxseeds"],
      avoid: ["Highly processed sugars"],
      tip: "Your body is building up estrogen. Fresh, vibrant veggies and fermented foods help metabolize it efficiently."
    },
    ovulation: {
      title: "Ovulation Phase",
      focus: "Cooling Foods & Fiber",
      icon: Flame,
      color: "from-amber-500 to-orange-600",
      foods: ["Quinoa", "Berries", "Almonds", "Salmon", "Asparagus"],
      avoid: ["Heavy carbs", "Greasy foods"],
      tip: "Your energy is peaking! Focus on anti-inflammatory foods and raw veggies to support your liver."
    },
    luteal: {
      title: "Luteal Phase",
      focus: "Comfort & Magnesium",
      icon: Sun,
      color: "from-indigo-500 to-purple-700",
      foods: ["Sweet Potato", "Pumpkin Seeds", "Avocado", "Bananas", "Chickpeas"],
      avoid: ["Cold raw foods", "Excess caffeine"],
      tip: "Cravings hit hard here. Magnesium-rich foods help reduce cramping and stabilize your mood before your period."
    }
  };

  const currentDetails = phaseDetails[phase as keyof typeof phaseDetails];
  const Icon = currentDetails.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-8 pb-28 px-6 overflow-y-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Nourish</h1>
        <p className="text-slate-400 font-medium">Personalized diet plan for your phase</p>
      </header>

      <div className={`rounded-3xl p-6 shadow-2xl mb-8 bg-gradient-to-br ${currentDetails.color} relative overflow-hidden`}>
        <div className="absolute -top-10 -right-10 opacity-20">
          <Icon size={150} />
        </div>
        <div className="relative z-10">
          <span className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-1 block">Current Phase Focus</span>
          <h2 className="text-3xl font-bold text-white mb-2">{currentDetails.title}</h2>
          <p className="text-white/90 font-medium text-lg mb-4">{currentDetails.focus}</p>
          <p className="text-white/80 leading-relaxed text-sm backdrop-blur-sm bg-black/10 p-4 rounded-2xl">
            {currentDetails.tip}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Foods to Embrace</h3>
        <div className="flex flex-wrap gap-2">
          {currentDetails.foods.map((food, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-200"
            >
              {food}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Limit or Avoid</h3>
        <div className="flex flex-wrap gap-2">
          {currentDetails.avoid.map((food, i) => (
            <div key={i} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm">
              {food}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
