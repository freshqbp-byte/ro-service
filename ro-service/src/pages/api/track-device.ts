import type { APIRoute } from 'astro';

// ⭐ Apna naya Web App URL yahan daalo (Deploy karne ke baad milega)
const WEBHOOK = 'https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // ⭐ IPv6 aur IPv4 dono ke liye sahi tarika
    const ip = request.headers.get('cf-connecting-ip')?.trim()
            || request.headers.get('x-real-ip')?.trim()
            || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || 'unknown';

    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip: ip,  // ⭐ IPv6 bhi yahan se sahi jayega
        fp: data.fp,
        clicks: data.clicks,
        gclid: data.gclid,
        url: data.url,
        ua: data.ua,
        ts: Date.now()
      })
    });

    const result = await res.json();

    return new Response(JSON.stringify({
      ok: true,
      blocked: result.blocked || false  // ⭐ Ye zaroori hai
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, blocked: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
