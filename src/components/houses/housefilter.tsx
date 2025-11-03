'use client';

import { Filter } from 'lucide-react';
import { Filters } from '../../types';
import { useRwandaLocations } from '../../hooks/useRwandaLocations';

interface HouseFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function HouseFilters({ filters, setFilters }: HouseFiltersProps) {
  const { 
    provinces, 
    districts, 
    sectors, 
    loading, 
    getDistrictsByProvince, 
    getSectorsByDistrict 
  } = useRwandaLocations();

  // Get filtered districts and sectors based on selection
  const availableDistricts = filters.province && filters.province !== 'All'
    ? getDistrictsByProvince(filters.province)
    : districts;
    
  const availableSectors = filters.district && filters.district !== 'All'
    ? getSectorsByDistrict(filters.district)
    : sectors;

  const handleProvinceChange = (provinceId: string) => {
    setFilters({
      ...filters,
      province: provinceId,
      district: 'All', // Reset district when province changes
      sector: 'All' // Reset sector when province changes
    });
  };

  const handleDistrictChange = (districtId: string) => {
    setFilters({
      ...filters,
      district: districtId,
      sector: 'All' // Reset sector when district changes
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 mr-2 text-gray-700" />
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Province
          </label>
          <select
            value={filters.province || 'All'}
            onChange={(e) => handleProvinceChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option key="all-provinces" value="All">All Provinces</option>
            {provinces.map((province) => (
              <option key={`province-${province.id}`} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <select
            value={filters.district || 'All'}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!filters.province || filters.province === 'All'}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option key="all-districts" value="All">All Districts</option>
            {availableDistricts.map((district) => (
              <option key={`district-${district.id}`} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <select
            value={filters.sector || 'All'}
            onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
            disabled={!filters.district || filters.district === 'All'}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option key="all-sectors" value="All">All Sectors</option>
            {availableSectors.map((sector) => (
              <option key={`sector-${sector.id}`} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Whole House">Whole House</option>
            <option value="Room">Room</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rooms
          </label>
          <select
            value={filters.rooms}
            onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price ($)
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Min"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price ($)
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Max"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Furnished
          </label>
          <select
            value={filters.furnished}
            onChange={(e) => setFilters({ ...filters, furnished: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Housemates
          </label>
          <select
            value={filters.maxHousemates}
            onChange={(e) => setFilters({ ...filters, maxHousemates: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="0">0 (Whole House)</option>
            <option value="2">Up to 2</option>
            <option value="4">Up to 4</option>
            <option value="6">Up to 6</option>
          </select>
        </div>
      </div>
    </div>
  );
}