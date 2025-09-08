import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Pill, Utensils, X } from 'lucide-react';

export default function ReminderModal() {
  const { activeReminder, dismissReminder } = useApp();

  if (!activeReminder) return null;

  const Icon = activeReminder.type === 'medication' ? Pill : Utensils;
  const bgColor = activeReminder.type === 'medication' ? 'bg-green-500' : 'bg-orange-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
        <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeReminder.title}</h2>
        <p className="text-xl text-gray-700 mb-8">{activeReminder.description}</p>
        
        <div className="flex items-center justify-center mb-6">
          <Bell className="w-6 h-6 text-blue-500 animate-bounce" />
        </div>
        
        <button
          onClick={dismissReminder}
          className="w-full bg-blue-600 text-white text-xl font-semibold py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Got it!</span>
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}