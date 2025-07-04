'use client';

interface FilterState {
  category: string;
  contentType: string;
  platform: string;
  rewardRateSort: string;
}

interface CampaignFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function CampaignFilters({ filters, onFilterChange }: CampaignFiltersProps) {
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
    { value: 'budget', label: 'Highest Total Budget' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      contentType: '',
      platform: '',
      rewardRateSort: ''
    };
    onFilterChange(clearedFilters);
  };

  const activeFiltersCount = [filters.category, filters.rewardRateSort].filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 mt-4 animate-fadeInUp">
      <div className="flex items-center gap-2 group">
        <span className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-300" style={{ color: '#e5e1df' }}>Type:</span>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-transparent border rounded-md px-3 py-2 text-sm focus:outline-none appearance-none pr-8 transition-all duration-300 hover:border-blue-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 cursor-pointer"
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

      <div className="flex items-center gap-2 group">
        <span className="text-sm font-medium transition-colors duration-300 group-hover:text-blue-300" style={{ color: '#e5e1df' }}>Sort by:</span>
        <select
          value={filters.rewardRateSort}
          onChange={(e) => handleFilterChange('rewardRateSort', e.target.value)}
          className="bg-transparent border rounded-md px-3 py-2 text-sm focus:outline-none appearance-none pr-8 transition-all duration-300 hover:border-blue-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 cursor-pointer"
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
          className="text-sm text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 px-2 py-1 rounded-md hover:bg-blue-500/10"
        >
          Clear all
        </button>
      )}
    </div>
  );
} 