import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, User, Shield, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'elderly' | 'caregiver'>('elderly');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password, role);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = {
    elderly: { email: 'margaret@example.com', password: 'demo' },
    caregiver: { email: 'sarah@example.com', password: 'demo' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CareConnect</h1>
          <p className="text-lg text-gray-600">Your companion for healthy, connected living</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole('elderly')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                role === 'elderly' 
                  ? 'bg-white shadow-sm text-blue-600 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <User className="w-5 h-5" />
              <span>I'm a User</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('caregiver')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                role === 'caregiver' 
                  ? 'bg-white shadow-sm text-blue-600 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>I'm a Caregiver</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-sm">
              <p><strong>User:</strong> {demoCredentials.elderly.email}</p>
              <p><strong>Caregiver:</strong> {demoCredentials.caregiver.email}</p>
              <p className="text-gray-500">Password: demo (for both)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}