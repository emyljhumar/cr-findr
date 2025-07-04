import { NextResponse } from 'next/server';

const CONTENT_REWARDS_QUERY = `
  query($first: Int, $after: String) {
    discoverContentRewardsCampaigns(first: $first, after: $after) {
      nodes {
        id
        title
        totalBudget
        totalPaid
        rewardRatePerThousandViews
        category
        totalViewCount
        experience {
          marketplaceAccessPass {
            directLink
          }
          accessPasses {
            logo {
              sourceUrl
            }
            title
          }
        }
        allowInstagram
        allowTiktok
        allowX
        allowYoutube
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

interface GraphQLResponse {
  data: {
    discoverContentRewardsCampaigns: {
      nodes: any[];
      pageInfo: PageInfo;
      totalCount: number;
    };
  };
  errors?: Array<{ message: string }>;
}

async function fetchAllCampaigns() {
  const allCampaigns = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const response: Response = await fetch('https://data.whop.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHOP_API_KEY}`,
        'x-on-behalf-of': process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID || '',
        'x-company-id': process.env.NEXT_PUBLIC_WHOP_COMPANY_ID || '',
      },
      body: JSON.stringify({
        query: CONTENT_REWARDS_QUERY,
        variables: {
          first: 100, // Fetch 100 at a time
          after: cursor
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data: GraphQLResponse = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(data.errors[0].message);
    }

    const campaigns = data.data.discoverContentRewardsCampaigns.nodes;
    const pageInfo: PageInfo = data.data.discoverContentRewardsCampaigns.pageInfo;
    const totalCount = data.data.discoverContentRewardsCampaigns.totalCount;

    allCampaigns.push(...campaigns);
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;

    console.log(`Fetched ${campaigns.length} campaigns, total so far: ${allCampaigns.length}, total available: ${totalCount}`);
    
    // Break if we've somehow fetched more than the total (safety check)
    if (allCampaigns.length >= totalCount) {
      break;
    }
  }

  return allCampaigns;
}

function sortCampaigns(campaigns: any[], sortBy: string) {
  if (sortBy === 'budget') {
    // Sort by total budget (highest first)
    return [...campaigns].sort((a, b) => b.totalBudget - a.totalBudget);
  }
      // For other sorting options (highest CPM), return as-is since it's handled client-side
  return campaigns;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy');
    
    const allCampaigns = await fetchAllCampaigns();
    const sortedCampaigns = sortBy ? sortCampaigns(allCampaigns, sortBy) : allCampaigns;
    
    console.log(`Total campaigns fetched: ${allCampaigns.length}, sorted by: ${sortBy || 'default'}`);
    
    // Return just the data portion, not the full GraphQL response
    return NextResponse.json({
      discoverContentRewardsCampaigns: {
        nodes: sortedCampaigns
      }
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
} 