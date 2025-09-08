import React, { useState } from 'react';
import Layout from '../Layout';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Clock, 
  Pill, 
  Utensils, 
  Edit3, 
  Trash2, 
  Bell, 
  Heart,
  AlertCircle,
  Phone,
  MessageCircle,
  Users
} from 'lucide-react';
import { Reminder } from '../../types';

export default function CaregiverDashboard() {
  const { reminders, setReminders } = useApp();
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'medication',
    title: '',
    description: '',
    time: '',
    isActive: true
  });

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminder.title && newReminder.description && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        type: newReminder.type as 'medication' | 'meal',
        title: newReminder.title,
        description: newReminder.description,
        time: newReminder.time,
        isActive: true
      };
      
      setReminders([...reminders, reminder]);
      setNewReminder({
        type: 'medication',
        title: '',
        description: '',
        time: '',
        isActive: true
      });
      setShowAddReminder(false);
    }
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleReminderStatus = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const elderlyInfo = {
    name: 'Margaret Thompson',
    lastActive: '2 hours ago',
    todayPoints: 75,
    weeklyGoal: 500,
    currentWeekPoints: 325,
    emergencyContact: '+1 (555) 123-4567',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
    ],
    vitals: {
      lastChecked: 'Yesterday',
      bloodPressure: '120/80',
      heartRate: '72 bpm'
    }
  };

  return (
    <Layout title="Caregiver Dashboard">
      <div className="space-y-8">
        {/* Patient Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src="https://thumbs.dreamstime.com/b/beautiful-50-year-old-woman-617685.jpg"
                alt="Margaret Thompson"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{elderlyInfo.name}</h2>
                <p className="text-gray-600">Last active: {elderlyInfo.lastActive}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                  <span className="text-sm text-gray-500">Level 5</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-colors">
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{elderlyInfo.todayPoints}</div>
              <div className="text-gray-600 text-sm">Points Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{elderlyInfo.currentWeekPoints}</div>
              <div className="text-gray-600 text-sm">Week Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(elderlyInfo.currentWeekPoints / elderlyInfo.weeklyGoal) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{elderlyInfo.vitals.bloodPressure}</div>
              <div className="text-gray-600 text-sm">Blood Pressure</div>
              <div className="text-xs text-gray-500">{elderlyInfo.vitals.lastChecked}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{elderlyInfo.vitals.heartRate}</div>
              <div className="text-gray-600 text-sm">Heart Rate</div>
              <div className="text-xs text-gray-500">{elderlyInfo.vitals.lastChecked}</div>
            </div>
          </div>
        </div>

        {/* Reminders Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Bell className="w-6 h-6 mr-3 text-blue-600" />
              Reminders Management
            </h3>
            <button
              onClick={() => setShowAddReminder(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Reminder</span>
            </button>
          </div>

          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  reminder.isActive 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      reminder.type === 'medication' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {reminder.type === 'medication' ? (
                        <Pill className={`w-5 h-5 ${
                          reminder.type === 'medication' ? 'text-green-600' : 'text-orange-600'
                        }`} />
                      ) : (
                        <Utensils className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{reminder.title}</h4>
                      <p className="text-gray-600 text-sm">{reminder.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {reminder.time}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reminder.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {reminder.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleReminderStatus(reminder.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        reminder.isActive 
                          ? 'text-gray-600 hover:bg-gray-200' 
                          : 'text-green-600 hover:bg-green-100'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Reminder Modal */}
        {showAddReminder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Reminder</h3>
              
              <form onSubmit={handleAddReminder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as 'medication' | 'meal' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="medication">Medication</option>
                    <option value="meal">Meal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Morning Medication"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Take 2 pills with water"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddReminder(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                  >
                    Add Reminder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Emergency Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
            Emergency Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Emergency Contact</h4>
              <p className="text-lg text-gray-800">{elderlyInfo.emergencyContact}</p>
              <button className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Call Now
              </button>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Current Medications</h4>
              <div className="space-y-2">
                {elderlyInfo.medications.map((med, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-900">{med.name}</div>
                    <div className="text-sm text-gray-600">{med.dosage} - {med.frequency}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Family Connection */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="w-6 h-6 mr-3 text-purple-600" />
            Family Network
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <img 
                src="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1"
                alt="Sarah Johnson"
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
              />
              <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
              <p className="text-sm text-gray-600">Primary Caregiver</p>
              <p className="text-xs text-green-600 mt-1">Active now</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900">Michael Thompson</h4>
              <p className="text-sm text-gray-600">Son</p>
              <p className="text-xs text-gray-500 mt-1">Last seen 3 hours ago</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900">Emma Thompson</h4>
              <p className="text-sm text-gray-600">Daughter</p>
              <p className="text-xs text-gray-500 mt-1">Last seen yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}