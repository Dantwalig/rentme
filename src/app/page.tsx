'use client';
import Link from 'next/link';
import Navbar from '../components/layout/navbar';
import HouseCard from '../components/houses/housecard';
import { House } from '../types';

// Mock data - In production, this would come from your database
const mockHouses: House[] = [
  {
    id: 1,
    type: 'Whole House',
    district: 'Kigali',
    sector: 'Kimironko',
    rooms: 3,
    price: 1200,
    surface: 120,
    parking: 'Available',
    animals: 'Allowed',
    elevator: 'Yes',
    level: 2,
    furnished: 'Yes',
    housemates: 0,
    ownerPhone: '+250 788 123 456',
    ownerEmail: 'owner1@example.com',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'
  },
  {
    id: 2,
    type: 'Room',
    district: 'Kigali',
    sector: 'Remera',
    rooms: 1,
    price: 400,
    surface: 25,
    parking: 'Not Available',
    animals: 'Not Allowed',
    elevator: 'No',
    level: 1,
    furnished: 'Yes',
    housemates: 3,
    ownerPhone: '+250 788 234 567',
    ownerEmail: 'owner2@example.com',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
  },
  {
    id: 3,
    type: 'Whole House',
    district: 'Kigali',
    sector: 'Kicukiro',
    rooms: 4,
    price: 1800,
    surface: 150,
    parking: 'Available',
    animals: 'Allowed',
    elevator: 'Yes',
    level: 3,
    furnished: 'No',
    housemates: 0,
    ownerPhone: '+250 788 345 678',
    ownerEmail: 'owner3@example.com',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAuthButtons={true} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home in Rwanda
          </h2>
          <p className="text-xl text-gray-600">
            Browse thousands of rental properties across all districts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHouses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/auth/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg inline-block"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </div>
  );
}