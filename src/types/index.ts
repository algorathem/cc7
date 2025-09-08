export interface User {
  id: string;
  name: string;
  email: string;
  role: 'elderly' | 'caregiver';
  avatar?: string;
  points?: number;
  level?: number;
}

export interface Reminder {
  id: string;
  type: 'medication' | 'meal';
  title: string;
  description: string;
  time: string;
  isActive: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number;
  points: number;
  videoUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  distance: string;
  organizer: string;
}

export interface Pet {
  name: string;
  level: number;
  happiness: number;
  type: 'dog' | 'cat' | 'bird';
  accessories: string[];
}