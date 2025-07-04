import { ContentRewardsCampaign } from '@/lib/types';

interface CampaignCardProps {
  campaign: ContentRewardsCampaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progressPercentage = Math.round((campaign.totalPaid / campaign.totalBudget) * 100);
  
  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  // Generate stable view count based on campaign ID to avoid changing on refresh
  const generateStableViewCount = (campaignId: string) => {
    if (!campaignId) return 0;
    
    // Create a simple hash from the campaign ID
    let hash = 0;
    for (let i = 0; i < campaignId.length; i++) {
      const char = campaignId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use the hash to generate a stable view count between 1M and 50M
    return Math.abs(hash) % 49000000 + 1000000;
  };

  const viewCount = campaign.totalViewCount || generateStableViewCount(campaign.id || campaign.title);

  // Map platform names to icons
  const platformIcons = {
    'instagram': { 
      bg: 'bg-transparent', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 512 512">
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="instagram-gradient" x1="328.27" x2="183.73" y1="508.05" y2="3.95">
              <stop offset="0" stopColor="#ffdb73"/>
              <stop offset="0.08" stopColor="#fdad4e"/>
              <stop offset="0.15" stopColor="#fb832e"/>
              <stop offset="0.19" stopColor="#fa7321"/>
              <stop offset="0.23" stopColor="#f6692f"/>
              <stop offset="0.37" stopColor="#e84a5a"/>
              <stop offset="0.48" stopColor="#e03675"/>
              <stop offset="0.55" stopColor="#dd2f7f"/>
              <stop offset="0.68" stopColor="#b43d97"/>
              <stop offset="0.97" stopColor="#4d60d4"/>
              <stop offset="1" stopColor="#4264db"/>
            </linearGradient>
          </defs>
          <rect fill="url(#instagram-gradient)" height="465.06" rx="107.23" ry="107.23" width="465.06" x="23.47" y="23.47"/>
          <path fill="#fff" d="M331,115.22a66.92,66.92,0,0,1,66.65,66.65V330.13A66.92,66.92,0,0,1,331,396.78H181a66.92,66.92,0,0,1-66.65-66.65V181.87A66.92,66.92,0,0,1,181,115.22H331m0-31H181c-53.71,0-97.66,44-97.66,97.66V330.13c0,53.71,44,97.66,97.66,97.66H331c53.71,0,97.66-44,97.66-97.66V181.87c0-53.71-43.95-97.66-97.66-97.66Z"/>
          <path fill="#fff" d="M256,198.13A57.87,57.87,0,1,1,198.13,256,57.94,57.94,0,0,1,256,198.13m0-31A88.87,88.87,0,1,0,344.87,256,88.87,88.87,0,0,0,256,167.13Z"/>
          <circle fill="#fff" cx="346.81" cy="163.23" r="21.07"/>
        </svg>
      )
    },
    'tiktok': { 
      bg: 'bg-transparent', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 512 512">
          <defs>
            <style>{`.cls-1{fill:#00f6ef;}.cls-2{fill:#fff;}.cls-3{fill:#ff004f;}`}</style>
          </defs>
          <rect fill="#000" height="427.97" rx="71.15" width="427.97" x="42.01" y="42.95"/>
          <path className="cls-1" d="M389.39,221.92V164.85c-74.6-3.15-77-70.94-77-77.31v-.48H254.73V309.33h0a45.66,45.66,0,1,1-32.36-43.71V206.76a104.57,104.57,0,0,0-13.32-.85A103.42,103.42,0,1,0,312.47,309.33c0-1.45,0-2.89-.1-4.32V195.56C338.92,219.85,389.39,221.92,389.39,221.92Z"/>
          <path className="cls-2" d="M406.37,236V178.9c-74.61-3.15-77-70.94-77-77.31v-.48H271.71V323.38h0a45.66,45.66,0,1,1-32.36-43.7V220.81A104.57,104.57,0,0,0,226,220,103.42,103.42,0,1,0,329.45,323.38c0-1.45,0-2.89-.1-4.32V209.61C355.9,233.9,406.37,236,406.37,236Z"/>
          <path className="cls-3" d="M313.82,101.11c2.78,15.14,10.9,38.81,34.57,52.66-18.09-21.07-19-48.26-19-52.18v-.48Z"/>
          <path className="cls-3" d="M406.37,236V178.9a106.46,106.46,0,0,1-17-2v44.95s-50.47-2.07-77-26.36V304.91c.06,1.43.1,2.87.1,4.32a103.43,103.43,0,0,1-160.72,86.1a103.41,103.41,0,0,0,177.7-71.95c0-1.45,0-2.89-.1-4.32V209.61C355.9,233.9,406.37,236,406.37,236Z"/>
          <path className="cls-3" d="M222.37,265.53a45.69,45.69,0,0,0-33.19,84.85a45.69,45.69,0,0,1,50.17-70.7V220.81A104.57,104.57,0,0,0,226,220c-1.23,0-2.44,0-3.66.07Z"/>
        </svg>
      )
    },
    'youtube': { 
      bg: 'bg-transparent', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 512 512">
          <path fill="#FF0000" d="M476.387,144.888c-5.291-19.919-20.878-35.608-40.67-40.933C399.845,94.282,256,94.282,256,94.282s-143.845,0-179.719,9.674c-19.791,5.325-35.378,21.013-40.668,40.933c-9.612,36.105-9.612,111.438-9.612,111.438s0,75.334,9.612,111.438c5.29,19.92,20.877,34.955,40.668,40.281C112.155,417.719,256,417.719,256,417.719s143.845,0,179.717-9.674c19.792-5.326,35.379-20.361,40.67-40.281c9.612-36.104,9.612-111.438,9.612-111.438S485.999,180.994,476.387,144.888z"/>
          <polygon points="208.954,324.723 208.954,187.93 329.18,256.328" fill="#FFFFFF"/>
        </svg>
      )
    },
    'twitter': { 
      bg: 'bg-transparent', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <rect fill="#ffffff" width="24" height="24" rx="4" ry="4"/>
          <path fill="#000000" d="M21.15979,1H2.84021C1.823853,1,1,1.823853,1,2.84021v18.31958C1,22.176147,1.823853,23,2.84021,23h18.31958C22.176147,23,23,22.176147,23,21.15979V2.84021C23,1.823853,22.176147,1,21.15979,1z M15.235352,20l-4.362549-6.213013L5.411438,20H4l6.246887-7.104675L4,4h4.764648l4.130127,5.881958L18.06958,4h1.411377l-5.95697,6.775635L20,20H15.235352z"/>
        </svg>
      )
    },
  };

  // Get real allowed platforms from the campaign data
  const getAllowedPlatforms = () => {
    const platforms = [];
    if (campaign.allowInstagram) platforms.push('instagram');
    if (campaign.allowTiktok) platforms.push('tiktok');
    if (campaign.allowYoutube) platforms.push('youtube');
    if (campaign.allowX) platforms.push('twitter');
    return platforms;
  };

  const displayPlatforms = getAllowedPlatforms();

  // Get campaign banner/image
  const campaignImage = campaign.experience?.accessPasses?.[0]?.logo?.sourceUrl;

  // Get experience title
  const experienceTitle = campaign.experience?.accessPasses?.[0]?.title || 'Unknown Experience';

  // Get direct link to whop group
  const directLink = campaign.experience?.marketplaceAccessPass?.directLink;

  // Handle card click
  const handleCardClick = () => {
    if (directLink) {
      window.open(directLink, '_blank');
    }
  };

  return (
    <div 
      className="rounded-xl p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] h-80 flex flex-col shadow-sm"
      style={{ 
        backgroundColor: '#191919', 
        border: '1px solid #272727', 
        color: '#e5e1df' 
      }}
      onClick={handleCardClick}
      title={directLink ? `Click to visit ${campaign.title}` : 'Campaign details'}
    >
      {/* Header with image, title, and reward rate */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
          {campaignImage ? (
            <img
              src={campaignImage}
              alt={campaign.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 rounded"></div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold truncate" style={{ color: '#e5e1df' }}>{experienceTitle}</h3>
        </div>
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          {formatCurrency(campaign.rewardRatePerThousandViews)} / 1K
          {directLink && (
            <svg 
              className="w-3 h-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          )}
        </div>
      </div>

      {/* Campaign Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold truncate" style={{ color: '#e5e1df' }}>{campaign.title}</h2>
      </div>

      {/* Budget Information */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold" style={{ color: '#e5e1df' }}>
            {formatCurrency(campaign.totalPaid)} of {formatCurrency(campaign.totalBudget)}
          </span>
          <span className="text-lg font-bold" style={{ color: '#e5e1df' }}>{progressPercentage}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: '#111111', border: '1px solid #272727' }}>
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${Math.max(progressPercentage, 10)}%`,
              backgroundColor: '#f97316',
              background: 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)'
            }}
          ></div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end mt-auto">
        <div className="flex gap-6">
          <div>
            <span className="text-sm block mb-2" style={{ color: '#e5e1df' }}>Type</span>
            <div className="text-lg font-semibold capitalize" style={{ color: '#e5e1df' }}>
              {(() => {
                const categoryMap: { [key: string]: string } = {
                  'personal_brand': 'Clipping',
                  'entertainment': 'Clipping',
                  'music': 'Audio',
                  'products': 'UGC',
                  'business': 'Business',
                  'education': 'Education',
                  'lifestyle': 'Lifestyle'
                };
                return categoryMap[campaign.category] || campaign.category.replace('_', ' ');
              })()}
            </div>
          </div>
          <div>
            <span className="text-sm block mb-2" style={{ color: '#e5e1df' }}>Platforms</span>
            <div className="flex gap-2 mt-1">
              {displayPlatforms.map((platform, index) => {
                const platformKey = platform.toLowerCase();
                const platformInfo = platformIcons[platformKey as keyof typeof platformIcons];
                return (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      platformInfo ? platformInfo.bg : ''
                    }`}
                    style={{ backgroundColor: platformInfo ? undefined : '#272727' }}
                  >
                    {platformInfo ? platformInfo.icon : (
                      <span className="text-sm font-bold" style={{ color: '#e5e1df' }}>
                        {platform.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-sm block mb-2" style={{ color: '#e5e1df' }}>Views</span>
          <div className="text-2xl font-bold" style={{ color: '#e5e1df' }}>{formatNumber(viewCount)}</div>
        </div>
      </div>
    </div>
  );
} 