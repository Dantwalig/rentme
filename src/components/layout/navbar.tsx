'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

interface NavbarProps {
  showAuthButtons?: boolean;
  showAddHouse?: boolean;
}

export default function Navbar({ showAuthButtons = false, showAddHouse = false }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">RentHub Rwanda</h1>
        </Link>
        
        <div className="flex space-x-4">
          {showAuthButtons && (
            <>
              <Link
                href="/login"
                className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
          
          {showAddHouse && (
            <Link
              href="/houses/add"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Add House
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}