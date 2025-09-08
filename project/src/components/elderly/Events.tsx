import React, { useState } from 'react';
import Layout from '../Layout';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart, 
  Music, 
  Coffee,
  Gamepad2,
  BookOpen,
  Dumbbell,
  Navigation
} from 'lucide-react';
import { Event } from '../../types';

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const events: Event[] = [
    {
      id: '1',
      title: 'Morning Tai Chi in the Park',
      description: 'Join us for a peaceful morning of Tai Chi exercises in the beautiful Central Park. Perfect for all skill levels.',
      location: 'Central Park, Community Center',
      date: '2025-01-15',
      time: '8:00 AM',
      distance: '0.3 miles',
      organizer: 'Community Center'
    },
    {
      id: '2',
      title: 'Senior Book Club Meeting',
      description: 'Monthly book discussion group. This month we\'re reading "The Thursday Murder Club". New members welcome!',
      location: 'Public Library, Reading Room',
      date: '2025-01-16',
      time: '2:00 PM',
      distance: '0.7 miles',
      organizer: 'Public Library'
    },
    {
      id: '3',
      title: 'Coffee & Chat Social Hour',
      description: 'Friendly gathering for coffee, conversation, and making new friends. Light refreshments provided.',
      location: 'Senior Center Café',
      date: '2025-01-17',
      time: '10:00 AM',
      distance: '0.5 miles',
      organizer: 'Senior Center'
    },
    {
      id: '4',
      title: 'Board Game Tournament',
      description: 'Weekly board game competition featuring classics like Scrabble, Chess, and Bridge. All skill levels welcome.',
      location: 'Community Hall',
      date: '2025-01-18',
      time: '1:00 PM',
      distance: '1.2 miles',
      organizer: 'Recreation Department'
    },
    {
      id: '5',
      title: 'Live Music Performance',
      description: 'Enjoy an afternoon of classic jazz and big band music performed by the Local Jazz Ensemble.',
      location: 'Community Theater',
      date: '2025-01-19',
      time: '3:00 PM',
      distance: '0.8 miles',
      organizer: 'Arts Council'
    },
    {
      id: '6',
      title: 'Gentle Yoga Class',
      description: 'Low-impact yoga session designed specifically for seniors. Improve flexibility and reduce stress.',
      location: 'Wellness Center, Studio A',
      date: '2025-01-20',
      time: '9:00 AM',
      distance: '0.4 miles',
      organizer: 'Wellness Center'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'fitness', name: 'Fitness', icon: Dumbbell },
    { id: 'social', name: 'Social', icon: Coffee },
    { id: 'entertainment', name: 'Entertainment', icon: Music },
    { id: 'games', name: 'Games', icon: Gamepad2 },
    { id: 'education', name: 'Education', icon: BookOpen }
  ];

  const getEventIcon = (title: string) => {
    if (title.toLowerCase().includes('tai chi') || title.toLowerCase().includes('yoga')) return Dumbbell;
    if (title.toLowerCase().includes('book')) return BookOpen;
    if (title.toLowerCase().includes('coffee') || title.toLowerCase().includes('social')) return Coffee;
    if (title.toLowerCase().includes('game')) return Gamepad2;
    if (title.toLowerCase().includes('music')) return Music;
    return Calendar;
  };

  const handleJoinEvent = (event: Event) => {
    alert(`You've joined: ${event.title}! A reminder will be sent before the event.`);
  };

  return (
    <Layout title="Community Events">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events Near You</h1>
          <p className="text-lg text-gray-600">Discover exciting activities in your community</p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const IconComponent = getEventIcon(event.title);
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <IconComponent className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.organizer}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Navigation className="w-4 h-4 mr-2 text-green-500" />
                      <span>{event.distance} away</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleJoinEvent(event)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Join Event</span>
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors">
                      <Users className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Location</h2>
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Downtown Community Area</h3>
              <p className="text-gray-600">Events within 2 miles radius</p>
            </div>
            <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Update Location
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}