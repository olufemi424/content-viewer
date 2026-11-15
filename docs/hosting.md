# Hosting

Static export (`next build` -> `out/`) on **Cloudflare Pages**, gated by
**Cloudflare Access** (login). No server, no writable filesystem.

- `npm run build` first runs `scripts/build-static-data.mjs`, which turns
  `content/**/*.md` into `public/data/tree.json` and `public/data/files/*.json`.
  The client fetches those; there are no API routes.
- Deploy: `.github/workflows/deploy.yml` on each push to `main`.
  Repo secrets: `CLOUDFLARE_API_TOKEN` (Pages:Edit), `CLOUDFLARE_ACCOUNT_ID`.

## One-time setup
1. Cloudflare dashboard -> Pages -> create project `content-viewer`
   (Direct Upload), or run `npx wrangler pages project create content-viewer`.
2. Add the two secrets to the GitHub repo.
3. Zero Trust -> Access -> Applications -> add a self-hosted app for the Pages
   domain (and `*.content-viewer-6hq.pages.dev` so preview URLs are covered). Add an
   allow policy for your email(s) (one-time PIN or Google login).
4. Optional: attach a custom domain in Pages, then update the Access app.

Anyone who can see the deploy output can read the content, so keep the Access
policy on both the production and preview hostnames.

## Current setup
- Pages project: `content-viewer` (https://content-viewer-6hq.pages.dev)
- Custom domain: `content.olufemiaf.com` (CNAME in Vercel DNS -> pages.dev)
- Access: protect both hostnames above plus `*.content-viewer-6hq.pages.dev`.
