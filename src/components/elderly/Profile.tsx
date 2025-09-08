import React from "react";
import { useApp } from "../../context/AppContext";
import Layout from "../Layout";
import { User, Settings, LogOut, Heart } from "lucide-react";

export default function Profile() {
  const { user, pet } = useApp();

  return (
    <Layout title="Profile">
      <div className="space-y-6 pb-24">
        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
            {user.avatar || <User className="w-20 h-20 text-gray-400" />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">Level {user.level} • {user.points} points</p>
        </div>

        {/* Pet Info */}
        <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 text-center">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-6xl mx-auto mb-4 shadow">
            🐕
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h3>
          <p className="text-gray-600 mb-3">Your loyal companion</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-lg px-6 py-3 rounded-xl font-bold flex items-center justify-center mx-auto space-x-2">
            <Heart className="w-6 h-6" />
            <span>Pet {pet.name}</span>
          </button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <button className="w-full flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium">
            <Settings className="w-5 h-5 text-gray-600" />
            <span>Account Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium">
            <LogOut className="w-5 h-5 text-gray-600" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
