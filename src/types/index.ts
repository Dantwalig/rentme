// types/index.ts
export interface House {
  id: number;
  type: 'Whole House' | 'Room';
  district: string;
  sector: string;
  rooms: number;
  price: number;
  surface: number;
  parking: 'Available' | 'Not Available';
  animals: 'Allowed' | 'Not Allowed';
  elevator: 'Yes' | 'No';
  level: number;
  furnished: 'Yes' | 'No';
  housemates: number;
  ownerPhone: string;
  ownerEmail: string;
  ownerName?: string;
  ownerIdType?: 'ID' | 'Passport';
  ownerIdNumber?: string;
  description?: string;
  amenities?: string[];
  availableFrom?: string;
  image: string;
  images?: string[];
  postedDate?: string;
  upiDocument?: File | null;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  idType: 'ID' | 'Passport';
  idNumber: string;
  password: string;
}

export interface Filters {
  district: string;
  sector: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  rooms: string;
  furnished: string;
  maxHousemates: string;
}

export interface Message {
  text: string;
  sender: 'user' | 'owner';
  timestamp: Date;
}