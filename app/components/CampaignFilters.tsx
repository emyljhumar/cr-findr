'use client';

import { useState } from 'react';

interface FilterState {
  category: string;
  contentType: string;
  platform: string;
  rewardRateSort: string;
}

interface CampaignFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export function CampaignFilters({ onFilterChange }: CampaignFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    contentType: '',
    platform: '',
    rewardRateSort: ''
  });

  const types = [
    { value: '', label: 'All' },
    { value: 'clipping', label: 'Clipping' },
    { value: 'ugc', label: 'UGC' },
    { value: 'audio', label: 'Audio' },
    { value: 'other', label: 'Other' }
  ];

  const rewardRateSorts = [
    { value: '', label: 'Default' },
    { value: 'highest', label: 'Highest CPM' },
    { value: 'lowest', label: 'Lowest CPM' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      contentType: '',
      platform: '',
      rewardRateSort: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFiltersCount = [filters.category, filters.rewardRateSort].filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium" style={{ color: '#e5e1df' }}>Type:</span>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-transparent border rounded-md px-3 py-2 text-sm focus:outline-none appearance-none pr-8"
          style={{ 
            backgroundColor: '#191919', 
            color: '#e5e1df',
            border: '1px solid #272727',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23e5e1df' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 8px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px'
          }}
        >
          {types.map((type) => (
            <option key={type.value} value={type.value} style={{ backgroundColor: '#191919', color: '#e5e1df' }}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium" style={{ color: '#e5e1df' }}>Sort by:</span>
        <select
          value={filters.rewardRateSort}
          onChange={(e) => handleFilterChange('rewardRateSort', e.target.value)}
          className="bg-transparent border rounded-md px-3 py-2 text-sm focus:outline-none appearance-none pr-8"
          style={{ 
            backgroundColor: '#191919', 
            color: '#e5e1df',
            border: '1px solid #272727',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23e5e1df' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 8px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px'
          }}
        >
          {rewardRateSorts.map((sort) => (
            <option key={sort.value} value={sort.value} style={{ backgroundColor: '#191919', color: '#e5e1df' }}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
} 