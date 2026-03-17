# Deutsch Spirits Hub

A premium landing page showcasing Bib & Tucker and Redemption whiskeys, presented by Whisky Advocate in partnership with Deutsch Family Wine & Spirits.

Built with [Next.js](https://nextjs.org) and deployed on [Vercel](https://vercel.com).

## Avatar & API keys (no keys in the browser)

This is a **Next.js app**, not static HTML. The avatar chat widget does **not** call Anthropic or D-ID from the browser. All calls go through your own backend:

- **`/api/d-id`** — D-ID streaming (create/sdp/ice/talk/destroy). Uses `D_ID_API_KEY` and `source_url` (image URL). Optional: `NEXT_PUBLIC_DID_SOURCE_URL` for your avatar image; else a default presenter image is used.
- **`/api/chat`** — Proxies to Anthropic so The Bartender can reply with AI. Uses `ANTHROPIC_API_KEY` only on the server.

**D-ID diagnostic:** Visit **http://localhost:3000/api/d-id-test** after `npm run dev`. The JSON response shows whether the D-ID key and presenter ID work (e.g. 401 = regenerate key, 402/403 = plan/credits).

On Vercel, API routes run as serverless functions. Set env vars in the Vercel project (Settings → Environment Variables). No API key is ever sent to the client.

## Getting Started

### Run locally

1. **Terminal** — `Ctrl+` ` (backtick) or View → Terminal.
2. **Install** — `npm install`
3. **API keys** — In `.env.local` (or Vercel env) set:
   - `D_ID_API_KEY` or `DID_API_KEY` — D-ID API key (from [D-ID Studio](https://studio.d-id.com/account-settings)).
   - `NEXT_PUBLIC_DID_SOURCE_URL` — (optional) HTTPS URL to your presenter/avatar image. If unset, a default D-ID presenter image is used. From D-ID Studio you can copy your presenter’s image URL.
   - `ANTHROPIC_API_KEY` — For The Bartender AI replies via `/api/chat`.
   - `ELEVENLABS_VOICE_ID` — Optional; used by D-ID for TTS in the avatar.
4. **Run** — `npm run dev`

### The Bartender voice (more natural)

When **`ELEVENLABS_API_KEY`** is set, the app generates speech with **ElevenLabs** and sends that audio to D-ID (so you hear your chosen voice). To use a **different voice**:

1. Open **[ElevenLabs Voice Lab](https://elevenlabs.io/voice-lab)** and sign in.
2. Pick the voice you want (premade or your cloned voice). Open it and copy its **Voice ID** (in the URL or the voice settings).
3. In **Vercel** → your project → **Settings** → **Environment Variables**, set **`ELEVENLABS_VOICE_ID`** to that ID (for Production and Preview). Redeploy so the new value is used.
4. Optional: **`ELEVENLABS_STABILITY`** (0–1, default 0.5) and **`ELEVENLABS_SIMILARITY_BOOST`** (0–1, default 0.75) tune how stable/similar the voice sounds. **`ELEVENLABS_MODEL_ID`** can be set to e.g. `eleven_turbo_v2` for lower latency.

If `ELEVENLABS_API_KEY` is not set, the avatar falls back to **Microsoft TTS** (`en-US-GuyNeural`).

The **Bartender** bubble is bottom right. Click to expand; first connection takes a few seconds. Type a message and he’ll reply with AI (via `/api/chat`) and speak the response (via D-ID). All keys stay server-side.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
