import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Reminder, Pet } from '../types';

interface AppContextType {
  reminders: Reminder[];
  activeReminder: Reminder | null;
  pet: Pet;
  points: number;
  addPoints: (amount: number) => void;
  dismissReminder: () => void;
  setReminders: (reminders: Reminder[]) => void;
  updatePet: (updates: Partial<Pet>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultPet: Pet = {
  name: 'Buddy',
  level: 1,
  happiness: 80,
  type: 'dog',
  accessories: []
};

const mockReminders: Reminder[] = [
  {
    id: '1',
    type: 'medication',
    title: 'Morning Medication',
    description: 'Time to take your morning pills',
    time: '08:00',
    isActive: true
  },
  {
    id: '2',
    type: 'meal',
    title: 'Lunch Time',
    description: 'Have you had your lunch yet?',
    time: '12:00',
    isActive: true
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [reminders, setRemindersState] = useState<Reminder[]>(mockReminders);
  const [activeReminder, setActiveReminder] = useState<Reminder | null>(null);
  const [pet, setPet] = useState<Pet>(defaultPet);
  const [points, setPoints] = useState(1250);

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
    setPet(prev => ({
      ...prev,
      level: Math.floor((points + amount) / 300) + 1,
      happiness: Math.min(100, prev.happiness + Math.floor(amount / 10))
    }));
  };

  const dismissReminder = () => {
    setActiveReminder(null);
  };

  const setReminders = (newReminders: Reminder[]) => {
    setRemindersState(newReminders);
  };

  const updatePet = (updates: Partial<Pet>) => {
    setPet(prev => ({ ...prev, ...updates }));
  };

  // Mock reminder triggering (in real app, this would be based on time)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const dueReminder = reminders.find(r => r.time === currentTime && r.isActive);
      if (dueReminder && !activeReminder) {
        setActiveReminder(dueReminder);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders, activeReminder]);

  return (
    <AppContext.Provider value={{
      reminders,
      activeReminder,
      pet,
      points,
      addPoints,
      dismissReminder,
      setReminders,
      updatePet
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}