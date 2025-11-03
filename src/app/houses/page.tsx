'use client';

import { useState } from 'react';
import Navbar from '../../components/layout/navbar';
import HouseCard from '../../components/houses/housecard';
import HouseFilters from '../../components/houses/housefilter';
import FloatingChat from '../../components/chat/floatingchats';
import { House, Filters } from '../../types';

// Mock data - In production, this would come from your database/API
const mockHouses: House[] = [
  {
    id: 1,
    type: 'Whole House',
    province: 'Kigali',
    district: 'Gasabo',
    sector: 'Kimironko',
    rooms: 3,
    price: 600000,
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
    province: 'Kigali',
    district: 'Kicukiro',
    sector: 'Gikondo',
    rooms: 1,
    price: 200000,
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
    province: 'Kigali',
    district: 'Nyarugenge',
    sector: 'Nyarugenge',
    rooms: 4,
    price: 900000,
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
  },
  {
    id: 4,
    type: 'Room',
    province: 'South',
    district: 'Huye',
    sector: 'Tumba',
    rooms: 1,
    price: 150000,
    surface: 20,
    parking: 'Not Available',
    animals: 'Not Allowed',
    elevator: 'No',
    level: 2,
    furnished: 'Yes',
    housemates: 2,
    ownerPhone: '+250 788 456 789',
    ownerEmail: 'owner4@example.com',
    image: 'https://images.unsplash.com/photo-1502672260066-6bc2a9d27110?w=400'
  },
  {
    id: 5,
    type: 'Whole House',
    province: 'East',
    district: 'Rwamagana',
    sector: 'Rubona',
    rooms: 2,
    price: 400000,
    surface: 90,
    parking: 'Available',
    animals: 'Allowed',
    elevator: 'No',
    level: 1,
    furnished: 'No',
    housemates: 0,
    ownerPhone: '+250 788 567 890',
    ownerEmail: 'owner5@example.com',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'
  },
  {
    id: 6,
    type: 'Whole House',
    province: 'West',
    district: 'Rubavu',
    sector: 'Gisenyi',
    rooms: 5,
    price: 1200000,
    surface: 200,
    parking: 'Available',
    animals: 'Allowed',
    elevator: 'Yes',
    level: 2,
    furnished: 'Yes',
    housemates: 0,
    ownerPhone: '+250 788 678 901',
    ownerEmail: 'owner6@example.com',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400'
  },
  {
    id: 7,
    type: 'Room',
    province: 'North',
    district: 'Musanze',
    sector: 'Muhoza',
    rooms: 1,
    price: 180000,
    surface: 30,
    parking: 'Available',
    animals: 'Not Allowed',
    elevator: 'No',
    level: 1,
    furnished: 'Yes',
    housemates: 1,
    ownerPhone: '+250 788 789 012',
    ownerEmail: 'owner7@example.com',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400'
  },
  {
    id: 8,
    type: 'Whole House',
    province: 'East',
    district: 'Nyagatare',
    sector: 'Nyagatare',
    rooms: 3,
    price: 500000,
    surface: 110,
    parking: 'Available',
    animals: 'Allowed',
    elevator: 'No',
    level: 1,
    furnished: 'No',
    housemates: 0,
    ownerPhone: '+250 788 890 123',
    ownerEmail: 'owner8@example.com',
    image: 'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=400'
  },
  {
    id: 9,
    type: 'Room',
    province: 'South',
    district: 'Muhanga',
    sector: 'Muhanga',
    rooms: 1,
    price: 160000,
    surface: 22,
    parking: 'Not Available',
    animals: 'Not Allowed',
    elevator: 'No',
    level: 3,
    furnished: 'Yes',
    housemates: 4,
    ownerPhone: '+250 788 901 234',
    ownerEmail: 'owner9@example.com',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400'
  },
  {
    id: 10,
    type: 'Whole House',
    province: 'West',
    district: 'Rusizi',
    sector: 'Kamembe',
    rooms: 4,
    price: 800000,
    surface: 140,
    parking: 'Available',
    animals: 'Allowed',
    elevator: 'No',
    level: 1,
    furnished: 'Yes',
    housemates: 0,
    ownerPhone: '+250 788 012 345',
    ownerEmail: 'owner10@example.com',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400'
  }
];

export default function HousesPage() {
  const [filters, setFilters] = useState<Filters>({
    province: 'All',
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
    if (filters.province !== 'All' && house.province !== filters.province) return false;
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

      {/* Floating Chat - General support on listing page */}
      <FloatingChat 
        ownerName="RentHub Support"
        propertyTitle="Need help finding a property?"
      />
    </div>
  );
}