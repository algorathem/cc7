import React from "react";
import Layout from "../Layout";
import { MapPin, Calendar, Clock, Heart } from "lucide-react";
import { Event } from "../../types";

export default function Events() {
  const events: Event[] = [
    {
      id: "1",
      title: "Morning Tai Chi in the Park",
      location: "Central Park",
      date: "2025-01-15",
      time: "8:00 AM",
    },
    {
      id: "2",
      title: "Senior Book Club Meeting",
      location: "Public Library",
      date: "2025-01-16",
      time: "2:00 PM",
    },
    {
      id: "3",
      title: "Coffee & Chat Social Hour",
      location: "Senior Center Café",
      date: "2025-01-17",
      time: "10:00 AM",
    },
  ];

  const handleJoinEvent = (event: Event) => {
    alert(`You've joined: ${event.title}!`);
  };

  return (
    <Layout title="Community Events">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Events Near You
        </h1>

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-lg p-6 space-y-4 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>

            <div className="space-y-2 text-lg text-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-6 h-6 text-blue-500" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-6 h-6 text-purple-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-6 h-6 text-red-500" />
                <span>{event.location}</span>
              </div>
            </div>

            <button
              onClick={() => handleJoinEvent(event)}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl flex items-center justify-center space-x-3"
            >
              <Heart className="w-7 h-7" />
              <span>Join Event</span>
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
