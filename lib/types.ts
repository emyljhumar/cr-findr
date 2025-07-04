export interface ContentRewardsCampaign {
  id: string;
  title: string;
  totalBudget: number;
  totalPaid: number;
  rewardRatePerThousandViews: number;
  category: string;
  totalViewCount?: number;
  experience?: {
    marketplaceAccessPass?: {
      directLink?: string;
    };
    accessPasses?: Array<{
      logo?: {
        sourceUrl?: string;
      };
      title?: string;
    }>;
  };
  allowInstagram?: boolean;
  allowTiktok?: boolean;
  allowX?: boolean;
  allowYoutube?: boolean;
}

export interface ContentRewardsCampaignsResponse {
  discoverContentRewardsCampaigns: {
    nodes: ContentRewardsCampaign[];
  };
} 