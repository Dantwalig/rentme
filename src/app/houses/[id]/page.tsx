'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, MapPin, BedDouble, Building, Mail, Phone, MessageSquare, X, Car, PawPrint, Sofa, Layers, ArrowLeft, Calendar, Users } from 'lucide-react';

// Mock data - In production, fetch based on the id parameter
const houseData = {
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
  ownerEmail: 'owner@example.com',
  ownerName: 'Jean Claude Mugabo',
  description: 'Beautiful 3-bedroom house in the heart of Kimironko. Recently renovated with modern amenities. Close to public transportation, schools, and shopping centers.',
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
};

export default function HouseDetailPage() {
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'owner'; timestamp: Date }>>([]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user', timestamp: new Date() }]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
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
              src={houseData.images[currentImage]}
              alt="House"
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImage + 1} / {houseData.images.length}
            </div>
          </div>

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
                    <span className="text-lg">{houseData.sector}, {houseData.district}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">${houseData.price}</div>
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
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Available: {houseData.availableFrom}
                </span>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {houseData.description}
              </p>
            </div>

            {/* Amenities */}
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
          </div>

          {/* Sidebar - Contact Owner */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Owner</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{houseData.ownerName}</div>
                    <div className="text-sm text-gray-600">Property Owner</div>
                  </div>
                </div>

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

              <button
                onClick={() => setShowChat(true)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Message
              </button>

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span>Posted on:</span>
                  <span className="font-medium text-gray-900">{houseData.postedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Property ID:</span>
                  <span className="font-medium text-gray-900">#{houseData.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[600px] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Message Owner</h3>
                <p className="text-sm text-gray-600">{houseData.ownerName}</p>
              </div>
              <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Start a conversation with the owner</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}