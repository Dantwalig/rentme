import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  originalName?: string;
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
        
        const rwanda: any = await import('rwanda');
        
        console.log('Rwanda module loaded:', rwanda);
        console.log('Available methods:', Object.keys(rwanda));
        
        // Get all provinces
        const provincesData = rwanda.Provinces();
        console.log('Provinces data:', provincesData);
        
        if (!Array.isArray(provincesData) || provincesData.length === 0) {
          throw new Error('No provinces data received');
        }
        
        const provincesArray: Location[] = provincesData
          .filter((p: any) => p && typeof p === 'string')
          .map((provinceName: string) => ({
            id: provinceName,
            name: provinceName,
            originalName: provinceName
          }));
        console.log('Converted provinces:', provincesArray);
        setProvinces(provincesArray);
        
        // Get ALL districts - call without parameters
        let allDistrictsData;
        try {
          allDistrictsData = rwanda.Districts();
        } catch (e) {
          console.error('Error calling Districts():', e);
          // Try alternative method
          allDistrictsData = rwanda.districts ? rwanda.districts() : [];
        }
        console.log('All districts from API:', allDistrictsData);
        
        // Manual mapping of districts to provinces
        const districtProvinceMap: { [key: string]: string } = {
          // East Province
          'Bugesera': 'East',
          'Gatsibo': 'East',
          'Kayonza': 'East',
          'Kirehe': 'East',
          'Ngoma': 'East',
          'Nyagatare': 'East',
          'Rwamagana': 'East',
          
          // Kigali City
          'Gasabo': 'Kigali',
          'Kicukiro': 'Kigali',
          'Nyarugenge': 'Kigali',
          
          // North Province
          'Burera': 'North',
          'Gakenke': 'North',
          'Gicumbi': 'North',
          'Musanze': 'North',
          'Rulindo': 'North',
          
          // South Province
          'Gisagara': 'South',
          'Huye': 'South',
          'Kamonyi': 'South',
          'Muhanga': 'South',
          'Nyamagabe': 'South',
          'Nyanza': 'South',
          'Nyaruguru': 'South',
          'Ruhango': 'South',
          
          // West Province
          'Karongi': 'West',
          'Ngororero': 'West',
          'Nyabihu': 'West',
          'Nyamasheke': 'West',
          'Rubavu': 'West',
          'Rusizi': 'West',
          'Rutsiro': 'West'
        };
        
        const allDistricts: Location[] = allDistrictsData
          .filter((d: any) => d && typeof d === 'string')
          .map((districtName: string) => {
            const provinceId = districtProvinceMap[districtName] || 'Unknown';
            return {
              id: `${provinceId}-${districtName}`,
              name: districtName,
              originalName: districtName,
              province_id: provinceId
            };
          });
        
        console.log('Mapped districts with provinces:', allDistricts);
        setDistricts(allDistricts);
        
        // Get all sectors - try different approaches
        const allSectors: Location[] = [];
        
        for (const district of allDistricts) {
          try {
            if (!district.originalName) {
              continue;
            }
            
            console.log(`Trying to fetch sectors for: "${district.originalName}"`);
            
            let districtSectors;
            
            // Try method 1: Sectors(districtName)
            try {
              districtSectors = rwanda.Sectors(district.originalName);
            } catch (e1) {
              console.log(`Sectors() failed, trying alternative...`);
              // Try method 2: sectors(districtName) 
              try {
                districtSectors = rwanda.sectors ? rwanda.sectors(district.originalName) : null;
              } catch (e2) {
                console.log(`sectors() also failed, trying getSectors...`);
                // Try method 3: Maybe there's a getSectors method
                districtSectors = rwanda.getSectors ? rwanda.getSectors(district.originalName) : null;
              }
            }
            
            if (!districtSectors || !Array.isArray(districtSectors)) {
              console.warn(`No sectors found for ${district.name}`);
              continue;
            }
            
            const sectorObjects = districtSectors
              .filter((s: any) => s && typeof s === 'string')
              .map((sectorName: string) => ({
                id: `${district.id}-${sectorName}`,
                name: sectorName,
                originalName: sectorName,
                district_id: district.id
              }));
            
            allSectors.push(...sectorObjects);
            console.log(`Successfully added ${sectorObjects.length} sectors for ${district.name}`);
          } catch (err) {
            console.error(`Error processing district ${district.name}:`, err);
          }
        }
        
        console.log(`Total sectors loaded: ${allSectors.length}`);
        setSectors(allSectors);
        
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
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