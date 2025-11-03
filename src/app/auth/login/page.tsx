'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, validate credentials with API
    console.log('Login data:', { email, password });
    
    // Redirect to houses page
    router.push('/houses');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Home className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}