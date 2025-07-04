import { ContentRewardsCampaignsResponse } from './types';

export async function fetchCampaigns(): Promise<ContentRewardsCampaignsResponse> {
  const response = await fetch('/api/campaigns');
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch campaigns');
  }
  
  return response.json();
} 