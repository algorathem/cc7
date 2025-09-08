import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../Layout';
import { Trophy, Medal, Star, Users, Crown } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  level: number;
  avatar?: string;
  streak: number;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const { user } = useAuth();
  
  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Margaret Thompson',
      points: 1250,
      level: 5,
      streak: 7,
      avatar: 'https://thumbs.dreamstime.com/b/beautiful-50-year-old-woman-617685.jpg',
      isCurrentUser: user?.id === '1'
    },
    {
      id: '2',
      name: 'Robert Chen',
      points: 1180,
      level: 4,
      streak: 5,
      avatar: 'https://media.istockphoto.com/id/1483109187/photo/man-outdoor-senior-happy-retirement-elderly-portrait-male-active-park-smiling-old-fun-nature.jpg?s=612x612&w=0&k=20&c=o95IrJ5YbN80cLO8qrdcU-_h5dbCSvliCb1olFp4ix0='
    },
    {
      id: '3',
      name: 'Dorothy Williams',
      points: 1050,
      level: 4,
      streak: 12,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1'
    },
    {
      id: '4',
      name: 'Frank Martinez',
      points: 920,
      level: 3,
      streak: 3,
      avatar: 'https://www.shutterstock.com/image-photo/senior-black-man-face-self-600nw-2246367161.jpg'
    },
      {
      id: '5',
      name: 'Helen Davis',
      points: 875,
      level: 3,
      streak: 8,
      avatar: 'https://media.istockphoto.com/id/1792968045/photo/close-up-of-senior-woman-holding-mug-smiling-beside-window.jpg?s=612x612&w=0&k=20&c=z7XlbQTFXmaXowZZf8FnxJyl7GiNGFBQA97zYfgZEC4='
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-600';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <Layout title="Community Leaderboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
            <Trophy className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Leaderboard</h1>
          <p className="text-lg text-gray-600">See how you're doing compared to your friends!</p>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-end justify-center space-x-8 mb-8">
            {/* 2nd Place */}
            <div className="text-center flex-1 max-w-32">
              <div className="relative">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-gray-300"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{leaderboardData[1].name.split(' ')[0]}</h3>
              <p className="text-2xl font-bold text-gray-400">{leaderboardData[1].points}</p>
              <div className="h-24 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg mt-4"></div>
            </div>

            {/* 1st Place */}
            <div className="text-center flex-1 max-w-32">
              <div className="relative">
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].name}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-yellow-400"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{leaderboardData[0].name.split(' ')[0]}</h3>
              <p className="text-3xl font-bold text-yellow-500">{leaderboardData[0].points}</p>
              <div className="h-32 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg mt-4"></div>
            </div>

            {/* 3rd Place */}
            <div className="text-center flex-1 max-w-32">
              <div className="relative">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-amber-500"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{leaderboardData[2].name.split(' ')[0]}</h3>
              <p className="text-2xl font-bold text-amber-600">{leaderboardData[2].points}</p>
              <div className="h-20 bg-gradient-to-t from-amber-500 to-amber-600 rounded-t-lg mt-4"></div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Full Rankings
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leaderboardData.map((participant, index) => (
              <div
                key={participant.id}
                className={`p-6 flex items-center justify-between transition-colors ${
                  participant.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center">
                        {participant.name}
                        {participant.isCurrentUser && (
                          <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">You</span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Level {participant.level}</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {participant.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{participant.points}</div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Week Champion</h3>
              <p className="text-sm text-gray-600">Top performer this week!</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Streak Master</h3>
              <p className="text-sm text-gray-600">7 days in a row!</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Level Up</h3>
              <p className="text-sm text-gray-600">Reached Level 5!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}