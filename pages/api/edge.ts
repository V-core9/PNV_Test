import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email');
  console.log(email);
  return new Response(
    JSON.stringify({
      name: 'Jim Halpert',

    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=0, stale-while-revalidate=0',
      },
    }
  )
}
