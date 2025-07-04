# Whop Content Rewards Campaigns App

A Whop app that displays all available content rewards campaigns, since they were removed from Whop's own discover page.

## Features

- Displays all content rewards campaigns from the Whop GraphQL API
- Shows campaign budget, total paid out, and progress
- Displays campaign type, platforms, and reward rates
- Responsive design matching Whop's UI patterns
- Real-time data fetching

## Setup

1. Install dependencies:
   ```bash
   pnpm i
   ```

2. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your Whop API credentials:
   ```
   WHOP_API_KEY=your_whop_api_key_here
   NEXT_PUBLIC_WHOP_AGENT_USER_ID=your_agent_user_id_here
   NEXT_PUBLIC_WHOP_APP_ID=your_whop_app_id_here
   NEXT_PUBLIC_WHOP_COMPANY_ID=your_company_id_here
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## GraphQL Query

The app uses the following GraphQL query to fetch campaigns:

```graphql
query {
  discoverContentRewardsCampaigns {
    nodes {
      title
      totalBudget
      totalPaid
      rewardRatePerThousandViews
      category
    }
  }
}
```

## Documentation

For more info about Whop development, see our docs at https://dev.whop.com/introduction
