export const REGIONS = [
  { 
    value: 'us_1', 
    label: 'United States', 
    description: 'North America',
    flag: '🇺🇸',
  },
  { 
    value: 'eu_1', 
    label: 'Europe', 
    description: 'European Union',
    flag: '🇪🇺',
  },
  { 
    value: 'asia_1', 
    label: 'Asia Pacific', 
    description: 'Asia & Pacific',
    flag: '🌏',
  },
] as const;

export type RegionValue = typeof REGIONS[number]['value'];
