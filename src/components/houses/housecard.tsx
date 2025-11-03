'use client';

import Link from 'next/link';
import { MapPin, BedDouble, Building, Users } from 'lucide-react';
import { House } from '../../types';

interface HouseCardProps {
  house: House;
  showContact?: boolean;
}

export default function HouseCard({ house, showContact = false }: HouseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={house.image} alt="House" className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{house.type}</h3>
          <span className="text-2xl font-bold text-blue-600">{house.price.toLocaleString()} RWF/mo</span>
        </div>
        
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{house.sector}, {house.district}, {house.province}</span>
          </div>
          <div className="flex items-center">
            <BedDouble className="w-4 h-4 mr-2" />
            <span>{house.rooms} Room{house.rooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            <span>{house.surface} m²</span>
          </div>
          {house.type === 'Room' && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>{house.housemates} Housemate{house.housemates !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        
        {showContact && (
          <Link
            href={`/houses/${house.id}`}
            className="mt-4 block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}