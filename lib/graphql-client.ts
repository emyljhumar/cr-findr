interface GraphQLQuery {
  query: string;
  variables?: Record<string, any>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlClient<T>(
  queryData: GraphQLQuery
): Promise<GraphQLResponse<T>> {
  const response = await fetch('https://api.whop.com/public-graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WHOP_API_KEY}`,
      'x-on-behalf-of': process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID || '',
      'x-company-id': process.env.NEXT_PUBLIC_WHOP_COMPANY_ID || '',
    },
    body: JSON.stringify(queryData),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  return response.json();
} 