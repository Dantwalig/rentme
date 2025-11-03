'use client';

import { useState } from 'react';
import Navbar from '../../components/layout/navbar';
import HouseCard from '../../components/houses/housecard';
import HouseFilters from '../../components/houses/housefilter';
import { House, Filters } from '../../types';

// Mock data - In production, this would come from your database/API
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

export default function HousesPage() {
  const [filters, setFilters] = useState<Filters>({
    district: 'All',
    sector: 'All',
    type: 'All',
    minPrice: '',
    maxPrice: '',
    rooms: 'All',
    furnished: 'All',
    maxHousemates: 'All'
  });

  const filteredHouses = mockHouses.filter(house => {
    if (filters.district !== 'All' && house.district !== filters.district) return false;
    if (filters.sector !== 'All' && house.sector !== filters.sector) return false;
    if (filters.type !== 'All' && house.type !== filters.type) return false;
    if (filters.rooms !== 'All' && house.rooms !== parseInt(filters.rooms)) return false;
    if (filters.furnished !== 'All' && house.furnished !== filters.furnished) return false;
    if (filters.minPrice && house.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && house.price > parseInt(filters.maxPrice)) return false;
    if (filters.maxHousemates !== 'All' && house.housemates > parseInt(filters.maxHousemates)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAddHouse={true} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <HouseFilters filters={filters} setFilters={setFilters} />

        <div className="mb-4">
          <p className="text-gray-600">{filteredHouses.length} properties found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.map((house) => (
            <HouseCard key={house.id} house={house} showContact={true} />
          ))}
        </div>
      </div>
    </div>
  );
}