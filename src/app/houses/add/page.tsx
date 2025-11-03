'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/layout/navbar';
import { useRwandaLocations } from '../../../hooks/useRwandaLocations';

export default function AddHousePage() {
  const router = useRouter();
  const { provinces, districts, sectors, loading, error, getDistrictsByProvince, getSectorsByDistrict } = useRwandaLocations();
  
  const [formData, setFormData] = useState({
    type: 'Whole House',
    province: '',
    district: '',
    sector: '',
    rooms: '',
    price: '',
    surface: '',
    parking: 'Available',
    animals: 'Allowed',
    elevator: 'No',
    level: '',
    furnished: 'No',
    housemates: '0',
    ownerPhone: '',
    ownerEmail: '',
    ownerIdType: 'ID' as 'ID' | 'Passport',
    ownerIdNumber: '',
    upiDocument: null as File | null
  });

  // Get filtered districts and sectors based on selection
  const availableDistricts = formData.province 
    ? getDistrictsByProvince(formData.province)
    : [];
    
  const availableSectors = formData.district
    ? getSectorsByDistrict(formData.district)
    : [];

  const handleProvinceChange = (provinceId: string) => {
    setFormData({
      ...formData,
      province: provinceId,
      district: '', // Reset district when province changes
      sector: '' // Reset sector when province changes
    });
  };

  const handleDistrictChange = (districtId: string) => {
    setFormData({
      ...formData,
      district: districtId,
      sector: '' // Reset sector when district changes
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.upiDocument) {
      alert('UPI ownership document is required for verification!');
      return;
    }
    
    if (!formData.ownerIdNumber) {
      alert('ID/Passport number is required!');
      return;
    }

    // In production, send data to API
    console.log('House data:', formData);
    
    alert('House added successfully! It will be verified within 24 hours.');
    router.push('/houses');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showAddHouse={false} />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading location data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar showAddHouse={false} />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">Error loading locations: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showAddHouse={false} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Building *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Whole House">Whole House</option>
                  <option value="Room">Room</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province *
                </label>
                <select
                  required
                  value={formData.province}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District *
                </label>
                <select
                  required
                  value={formData.district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  disabled={!formData.province}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.province ? 'Select District' : 'Select Province First'}
                  </option>
                  {availableDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sector *
                </label>
                <select
                  required
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  disabled={!formData.district}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.district ? 'Select Sector' : 'Select District First'}
                  </option>
                  {availableSectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Rooms *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Month ($) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surface Area (m²) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.surface}
                  onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parking *
                </label>
                <select
                  required
                  value={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Animals Allowed *
                </label>
                <select
                  required
                  value={formData.animals}
                  onChange={(e) => setFormData({ ...formData, animals: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Allowed">Allowed</option>
                  <option value="Not Allowed">Not Allowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Elevator *
                </label>
                <select
                  required
                  value={formData.elevator}
                  onChange={(e) => setFormData({ ...formData, elevator: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Floor Level *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Furnished *
                </label>
                <select
                  required
                  value={formData.furnished}
                  onChange={(e) => setFormData({ ...formData, furnished: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {formData.type === 'Room' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Housemates *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.housemates}
                    onChange={(e) => setFormData({ ...formData, housemates: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Owner Verification (Private)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This information is required for verification purposes only and will not be displayed to clients.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Type *
                  </label>
                  <select
                    required
                    value={formData.ownerIdType}
                    onChange={(e) => setFormData({ ...formData, ownerIdType: e.target.value as 'ID' | 'Passport' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ID">National ID</option>
                    <option value="Passport">Passport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.ownerIdType} Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerIdNumber}
                    onChange={(e) => setFormData({ ...formData, ownerIdNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI Ownership Document *
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({ ...formData, upiDocument: e.target.files?.[0] || null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload proof of ownership (PDF, JPG, or PNG)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Submit Property
              </button>
              <button
                type="button"
                onClick={() => router.push('/houses')}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}