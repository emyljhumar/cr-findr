'use client';

import { useState } from 'react';

interface FilterState {
  category: string;
  contentType: string;
  platform: string;
}

interface CampaignFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export function CampaignFilters({ onFilterChange }: CampaignFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    contentType: '',
    platform: ''
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'personal_brand', label: 'Personal Brand' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'education', label: 'Education' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ];

  const contentTypes = [
    { value: '', label: 'All Content Types' },
    { value: 'post', label: 'Post' },
    { value: 'story', label: 'Story' },
    { value: 'reel', label: 'Reel' },
    { value: 'video', label: 'Video' }
  ];

  const platforms = [
    { value: '', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'x', label: 'X (Twitter)' }
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
      platform: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFiltersCount = [filters.category, filters.contentType, filters.platform].filter(Boolean).length;

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
      <div className="flex flex-wrap gap-4 items-center">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        
        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Content Type Filter */}
        <select
          value={filters.contentType}
          onChange={(e) => handleFilterChange('contentType', e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          {contentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Platform Filter */}
        <select
          value={filters.platform}
          onChange={(e) => handleFilterChange('platform', e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          {platforms.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Clear Filters
        </button>

        {/* Active Filters Count */}
        {activeFiltersCount > 0 && (
          <span className="text-blue-400 text-sm">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
          </span>
        )}
      </div>
    </div>
  );
} 