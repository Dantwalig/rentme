'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Home, MapPin, BedDouble, Building, Mail, Phone, MessageSquare, X, Car, PawPrint, Sofa, Layers, ArrowLeft, Calendar, Users } from 'lucide-react';
import FloatingChat from '../../../components/chat/floatingchats';

// Mock houses data - should match the data from houses/page.tsx
const mockHouses = [
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
    ownerName: 'Jean Claude Mugabo',
    description: 'Beautiful 3-bedroom house in the heart of Kimironko. Recently renovated with modern amenities. Close to public transportation, schools, and shopping centers. Perfect for families or professionals.',
    amenities: ['WiFi', 'Water 24/7', 'Electricity Backup', 'Security Guard', 'Garden', 'Modern Kitchen'],
    availableFrom: 'December 1, 2025',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    postedDate: 'October 15, 2025'
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
    ownerName: 'Marie Uwase',
    description: 'Cozy furnished room in Gikondo, perfect for students or young professionals. Shared kitchen and bathroom. Friendly housemates. Close to bus stops and local amenities.',
    amenities: ['WiFi', 'Shared Kitchen', 'Laundry Area', 'Security'],
    availableFrom: 'November 15, 2025',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
      'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800'
    ],
    postedDate: 'October 20, 2025'
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
    ownerName: 'Patrick Nkunda',
    description: 'Spacious 4-bedroom house in central Nyarugenge. Unfurnished property with large living areas. Great for those who want to customize their space. Near downtown and major business districts.',
    amenities: ['Elevator', 'Parking', 'Balcony', 'Security', 'Water 24/7', 'Generator Backup'],
    availableFrom: 'December 15, 2025',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    postedDate: 'October 10, 2025'
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
    ownerName: 'Emmanuel Habimana',
    description: 'Affordable room near University of Rwanda. Ideal for students. Quiet neighborhood with easy access to campus. Furnished with bed, desk, and wardrobe.',
    amenities: ['WiFi', 'Study Desk', 'Shared Kitchen', 'Water 24/7'],
    availableFrom: 'January 5, 2026',
    images: [
      'https://images.unsplash.com/photo-1502672260066-6bc2a9d27110?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
    ],
    postedDate: 'October 25, 2025'
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
    ownerName: 'Grace Mukamana',
    description: 'Charming 2-bedroom house in Rwamagana. Ground floor with private yard. Perfect for small families or couples. Peaceful area with good security.',
    amenities: ['Private Yard', 'Parking', 'Security', 'Water Storage Tank'],
    availableFrom: 'November 20, 2025',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800'
    ],
    postedDate: 'October 12, 2025'
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
    ownerName: 'David Munyeshyaka',
    description: 'Luxurious 5-bedroom house near Lake Kivu in Gisenyi. Fully furnished with modern appliances. Stunning lake views. Perfect for executives or large families. Swimming pool access.',
    amenities: ['Lake View', 'Swimming Pool', 'WiFi', 'Generator', 'Garden', 'Modern Kitchen', 'Security 24/7'],
    availableFrom: 'December 10, 2025',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
    ],
    postedDate: 'October 5, 2025'
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
    ownerName: 'Alice Uwimana',
    description: 'Comfortable room in Musanze town center. Close to Volcanoes National Park. Great for tourism workers or nature enthusiasts. One friendly housemate.',
    amenities: ['WiFi', 'Parking', 'Shared Kitchen', 'Mountain View'],
    availableFrom: 'November 25, 2025',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    postedDate: 'October 18, 2025'
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
    ownerName: 'Robert Kayitare',
    description: 'Modern 3-bedroom house in Nyagatare town. Great for agricultural professionals or business people. Spacious compound with room for expansion.',
    amenities: ['Large Compound', 'Parking', 'Security', 'Borehole Water'],
    availableFrom: 'December 5, 2025',
    images: [
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    postedDate: 'October 8, 2025'
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
    ownerName: 'Christine Uwamariya',
    description: 'Budget-friendly room in Muhanga. Shared accommodation with 4 housemates. Clean and safe environment. Good for students or interns.',
    amenities: ['WiFi', 'Shared Kitchen', 'Water 24/7', 'Security'],
    availableFrom: 'November 10, 2025',
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
    ],
    postedDate: 'October 22, 2025'
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
    ownerName: 'Joseph Niyonzima',
    description: 'Beautiful house in Kamembe with scenic views. Fully furnished and ready to move in. Close to tea plantations and tourist attractions. Peaceful environment.',
    amenities: ['Scenic Views', 'Garden', 'WiFi', 'Security', 'Modern Kitchen', 'Parking'],
    availableFrom: 'December 20, 2025',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
    ],
    postedDate: 'October 3, 2025'
  }
];

export default function HouseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  // Unwrap the params Promise using React.use()
  const { id } = use(params);

  // Find the house by ID from URL params
  const houseData = mockHouses.find(house => house.id === parseInt(id));

  // If house not found, show error
  if (!houseData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/houses')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">House Not Found</h2>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/houses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/houses')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">RentHub Rwanda</h1>
            </div>
          </div>
          <button
            onClick={() => router.push('/houses/add')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add House
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative">
            <img
              src={houseData.images?.[currentImage] || houseData.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'}
              alt="House"
              className="w-full h-96 object-cover"
            />
            {houseData.images && houseData.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImage + 1} / {houseData.images.length}
              </div>
            )}
          </div>

          {houseData.images && houseData.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 p-4">
              {houseData.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-full h-24 object-cover rounded cursor-pointer border-2 ${
                    currentImage === idx ? 'border-blue-600' : 'border-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Price */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {houseData.type} in {houseData.sector}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{houseData.sector}, {houseData.district}, {houseData.province}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">{houseData.price.toLocaleString()} RWF</div>
                  <div className="text-gray-600">per month</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                  {houseData.type}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                  {houseData.furnished === 'Yes' ? 'Furnished' : 'Unfurnished'}
                </span>
                {houseData.availableFrom && (
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Available: {houseData.availableFrom}
                  </span>
                )}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BedDouble className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{houseData.rooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{houseData.surface} m²</div>
                    <div className="text-sm text-gray-600">Surface Area</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Layers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Floor {houseData.level}</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{houseData.parking}</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <PawPrint className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{houseData.animals}</div>
                    <div className="text-sm text-gray-600">Pets</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Layers className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {houseData.elevator === 'Yes' ? 'Available' : 'Not Available'}
                    </div>
                    <div className="text-sm text-gray-600">Elevator</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {houseData.description && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {houseData.description}
                </p>
              </div>
            )}

            {/* Amenities */}
            {houseData.amenities && houseData.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {houseData.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Contact Owner */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Owner</h3>

              <div className="space-y-4 mb-6">
                {houseData.ownerName && (
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{houseData.ownerName}</div>
                      <div className="text-sm text-gray-600">Property Owner</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <a href={`tel:${houseData.ownerPhone}`} className="text-gray-900 hover:text-blue-600">
                    {houseData.ownerPhone}
                  </a>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a href={`mailto:${houseData.ownerEmail}`} className="text-gray-900 hover:text-blue-600 text-sm break-all">
                    {houseData.ownerEmail}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                {houseData.postedDate && (
                  <div className="flex items-center justify-between mb-2">
                    <span>Posted on:</span>
                    <span className="font-medium text-gray-900">{houseData.postedDate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Property ID:</span>
                  <span className="font-medium text-gray-900">#{houseData.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button*/}
      <FloatingChat 
        ownerName={houseData.ownerName}
        ownerPhone={houseData.ownerPhone}
        propertyTitle={`${houseData.type} in ${houseData.sector}`}
        propertyId={houseData.id}
      />
    </div>
  );
}