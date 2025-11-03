declare module 'rwanda' {
  interface Location {
    id: string;
    name: string;
    province_id?: string;
    district_id?: string;
  }

  export function Provinces(): Location[];
  export function Districts(provinceId: string): Location[];
  export function Sectors(districtId: string): Location[];
  export function Cells(sectorId: string): Location[];
  export function Villages(cellId: string): Location[];
}