import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  province_id?: string;
  district_id?: string;
  [key: string]: any;
}

export function useRwandaLocations() {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [sectors, setSectors] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        
        // Dynamic import with type assertion to bypass TypeScript error
        const rwanda: any = await import('rwanda');
        
        // Get all provinces
        const provincesData = rwanda.Provinces();
        setProvinces(provincesData);
        
        // Get all districts
        const allDistricts: Location[] = [];
        provincesData.forEach((province: any) => {
          const provinceDistricts = rwanda.Districts(province.id);
          allDistricts.push(...provinceDistricts);
        });
        setDistricts(allDistricts);
        
        // Get all sectors
        const allSectors: Location[] = [];
        allDistricts.forEach((district: any) => {
          const districtSectors = rwanda.Sectors(district.id);
          allSectors.push(...districtSectors);
        });
        setSectors(allSectors);
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Rwanda locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const getDistrictsByProvince = (provinceId: string) => {
    return districts.filter(d => d.province_id === provinceId);
  };

  const getSectorsByDistrict = (districtId: string) => {
    return sectors.filter(s => s.district_id === districtId);
  };

  return {
    provinces,
    districts,
    sectors,
    loading,
    error,
    getDistrictsByProvince,
    getSectorsByDistrict
  };
}