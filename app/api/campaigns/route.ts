import { NextResponse } from 'next/server';

const CONTENT_REWARDS_QUERY = `
  query {
    discoverContentRewardsCampaigns {
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
    }
  }
`;

export async function GET() {
  try {
    const response = await fetch('https://data.whop.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHOP_API_KEY}`,
        'x-on-behalf-of': process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID || '',
        'x-company-id': process.env.NEXT_PUBLIC_WHOP_COMPANY_ID || '',
      },
      body: JSON.stringify({
        query: CONTENT_REWARDS_QUERY,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(data.errors[0].message);
    }

    // Return just the data portion, not the full GraphQL response
    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
} 