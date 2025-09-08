import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Layout from "../Layout";
import MockExerciseSession from "./MockExerciseSession";
import Events from "./Events";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import { Phone, Play, Heart, Calendar, Trophy, User } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  duration: string;
  points: number;
  description: string;
}

export default function Dashboard() {
  const { pet, points, addPoints } = useApp();
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "events" | "leaderboard" | "profile">("dashboard");

  const todayExercise: Exercise = {
    id: 1,
    name: "Morning Stretches",
    duration: "10 min",
    points: 50,
    description: "Gentle stretches to start your day",
  };

  const handleExerciseStart = (exercise: Exercise) => {
    addPoints(exercise.points);
    setActiveExercise(exercise);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Greeting */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Good Morning! 🌞
              </h2>
              <p className="text-xl text-gray-700">Hello {pet.name}’s friend!</p>
            </div>

            {/* Pet */}
            <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 text-center">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-6xl mx-auto mb-4 shadow">
                🐕
              </div>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-lg px-6 py-3 rounded-xl font-bold flex items-center justify-center mx-auto space-x-2">
                <Heart className="w-6 h-6" />
                <span>Pet {pet.name}</span>
              </button>
            </div>

            {/* Today’s Exercise */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Today’s Exercise
              </h3>
              <p className="text-lg text-gray-700 mb-2">{todayExercise.name}</p>
              <p className="text-gray-600 mb-4">{todayExercise.description}</p>
              <button
                onClick={() => handleExerciseStart(todayExercise)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 rounded-xl flex items-center justify-center space-x-3"
              >
                <Play className="w-7 h-7" />
                <span>Start Exercise</span>
              </button>
            </div>

            {/* Call Family */}
            <div className="bg-green-50 rounded-2xl shadow-lg p-6 text-center">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl flex items-center justify-center space-x-3">
                <Phone className="w-7 h-7" />
                <span>Call Family</span>
              </button>
            </div>

            {/* Points */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Points</h3>
              <div className="text-4xl font-bold text-blue-600">{points}</div>
            </div>
          </div>
        );
      case "events":
        return <Events />;
      case "leaderboard":
        return <Leaderboard />;
      case "profile":
        return <Profile />;
    }
  };

  return (
    <Layout title="Welcome">
      <div className="pb-24">{renderTab()}</div>

      {/* Exercise Modal */}
      {activeExercise && (
        <MockExerciseSession
          exerciseName={activeExercise.name}
          onClose={() => setActiveExercise(null)}
        />
      )}

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t border-gray-200 flex justify-around items-center h-16">
        <button
          className={`flex flex-col items-center text-sm ${
            activeTab === "dashboard" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <Play className="w-6 h-6" />
          Dashboard
        </button>
        <button
          className={`flex flex-col items-center text-sm ${
            activeTab === "events" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("events")}
        >
          <Calendar className="w-6 h-6" />
          Events
        </button>
        <button
          className={`flex flex-col items-center text-sm ${
            activeTab === "leaderboard" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("leaderboard")}
        >
          <Trophy className="w-6 h-6" />
          Leaderboard
        </button>
        <button
          className={`flex flex-col items-center text-sm ${
            activeTab === "profile" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <User className="w-6 h-6" />
          Profile
        </button>
      </div>
    </Layout>
  );
}
