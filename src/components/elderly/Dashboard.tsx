import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Layout from '../Layout';
import MockExerciseSession from './MockExerciseSession';
import { 
  Dumbbell, 
  Video, 
  Trophy, 
  MapPin, 
  Phone, 
  Play,
  Star,
  Heart,
  Camera,
  Users
} from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  duration: string;
  points: number;
  difficulty: string;
  description: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { pet, points, addPoints } = useApp();
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const exercises: Exercise[] = [
    { id: 1, name: 'Morning Stretches', duration: '10 min', points: 50, difficulty: 'Easy', description: 'Gentle stretches to start your day' },
    { id: 2, name: 'Chair Exercises', duration: '15 min', points: 75, difficulty: 'Easy', description: 'Safe exercises you can do from your chair' },
    { id: 3, name: 'Walking Quest', duration: '20 min', points: 100, difficulty: 'Medium', description: 'Take a refreshing walk around your neighborhood' }
  ];

  const handleExerciseStart = (exercise: Exercise) => {
    addPoints(exercise.points);
    setActiveExercise(exercise);
  };

  return (
    <Layout title="Your Daily Companion">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Good Morning! 🌅</h2>
              <p className="text-lg text-gray-600">Ready to make today amazing?</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
                <span className="text-3xl">🐕</span>
              </div>
              <p className="text-sm font-medium text-gray-700">{pet.name}</p>
              <p className="text-xs text-gray-500">Level {pet.level}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <button 
            onClick={() => navigate('/leaderboard')} 
            className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 group"
          >
            <Trophy className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg">Leaderboard</h3>
            <p className="text-purple-100 text-sm">See your ranking</p>
          </button>

          <button 
            onClick={() => navigate('/events')} 
            className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 group"
          >
            <MapPin className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg">Events</h3>
            <p className="text-green-100 text-sm">Find activities</p>
          </button>

          <button className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 group">
            <Phone className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg">Video Call</h3>
            <p className="text-blue-100 text-sm">Connect with family</p>
          </button>

          <button className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 group">
            <Camera className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg">Record</h3>
            <p className="text-orange-100 text-sm">Share moments</p>
          </button>
        </div>

        {/* Exercise Quests */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Dumbbell className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Today's Exercise Quests</h3>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {points} Points
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {exercises.map((exercise) => (
              <div 
                key={exercise.id} 
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{exercise.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {exercise.points} pts
                      </span>
                      <span>{exercise.duration}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExerciseStart(exercise)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Pet Companion */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Companion: {pet.name}</h3>
              <p className="text-gray-600 mb-4">Level {pet.level} • {pet.happiness}% Happy</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Happiness</span>
                    <span>{pet.happiness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pet.happiness}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl mb-4 shadow-lg">
                🐕
              </div>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Pet {pet.name}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Points & Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{points}</div>
              <div className="text-gray-600">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{Math.floor(points / 300) + 1}</div>
              <div className="text-gray-600">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-gray-600">Days Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">3</div>
              <div className="text-gray-600">Friends Connected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Session Modal */}
      {activeExercise && (
        <MockExerciseSession 
          exerciseName={activeExercise.name} 
          onClose={() => setActiveExercise(null)} 
        />
      )}
    </Layout>
  );
}
