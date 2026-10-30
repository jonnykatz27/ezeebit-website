# Production is AWS (CloudFront + S3), not Netlify.
# netlify.toml does not control ezeebit.com. Apply the steps below
# to the distribution that serves the apex domain.

## 1. Publish only `dist/`

`npm run build:all` writes the static site to `dist/` and the SSR bundle to `.ssr/` (gitignored, outside `dist/`). Sync `dist/` only. Do not sync the repo root, `.ssr/`, or a leftover `dist/server/`.

```bash
npm run build:all

# HTML, sitemap, robots, llms.txt — short cache so title and meta updates show up
aws s3 sync dist/ s3://BUCKET/ \
  --delete \
  --exclude '*' \
  --include '*.html' --include 'sitemap.xml' --include 'robots.txt' --include 'llms.txt' --include 'site.webmanifest' \
  --cache-control 'public, max-age=300, must-revalidate'

# Hashed Vite assets
aws s3 sync dist/assets/ s3://BUCKET/assets/ \
  --delete \
  --cache-control 'public, max-age=31536000, immutable'

# Everything else (images, fonts, icons)
aws s3 sync dist/ s3://BUCKET/ \
  --delete \
  --exclude '*.html' --exclude 'sitemap.xml' --exclude 'robots.txt' --exclude 'llms.txt' --exclude 'site.webmanifest' --exclude 'assets/*' \
  --cache-control 'public, max-age=86400'
```

Replace `BUCKET` with the production bucket. `--delete` removes the old `dist/server/` objects if they were uploaded before. After the first deploy of this change, confirm `s3://BUCKET/server/entry-server.js` is gone.

Create a CloudFront invalidation for `/*` after the sync. HTML cached at the edge will keep the old title until it expires or is invalidated.

## 2. Origin

- Origin: the S3 **REST** endpoint (`BUCKET.s3.REGION.amazonaws.com`), not the S3 website endpoint.
- Origin access: Origin Access Control (or the existing OAI). The bucket blocks public access.
- Default root object: `index.html`.

Do not add a CloudFront Function or Lambda@Edge that rewrites every miss to `/index.html`. That returns HTTP 200 for unknown URLs (a soft 404).

## 3. Viewer-request function

Create a CloudFront Function, runtime **cloudfront-js-2.0**, from `viewer-request.js` in this directory. Associate it with the **viewer request** event on the default behavior.

The function:

1. 301s `https://www.ezeebit.com{uri}{query}` to `https://ezeebit.com{uri}{query}`.
2. 301s any path with a trailing slash, except `/`, to the same path without the slash.
3. Rewrites extensionless paths to the pre-rendered object: `/in-store` becomes `/in-store/index.html`, `/` becomes `/index.html`. Files with an extension (`/assets/...`, `/sitemap.xml`, `/favicon.ico`) are left alone.

Publish the function, then attach the published version. A draft function does not run.

Also set the distribution's **Viewer protocol policy** to **Redirect HTTP to HTTPS**.

Alternate domain names (CNAMEs) must include both `ezeebit.com` and `www.ezeebit.com`, with the certificate covering both, otherwise the www 301 never runs. DNS for both names points at this distribution.

## 4. Real 404s

Pre-render writes `dist/404.html` (and `dist/404/index.html`). In the distribution, create **custom error responses**:

| HTTP error code | Response page path | HTTP response code |
| --- | --- | --- |
| 403 | `/404.html` | 404 |
| 404 | `/404.html` | 404 |

S3 with Origin Access Control returns **403** for a missing key, so both rows are required. Error caching minimum TTL: 10 seconds, so a newly published page is not stuck on the 404 for long.

Do not point these at `/index.html`, and do not set the response code to 200.

## 5. Cache behavior

- Path pattern `/assets/*`: CachingOptimized (or a policy with a long default TTL). Origin request policy can be the default, since the filenames are hashed.
- Default behavior (`*`): CachingDisabled, or a custom policy with minimum TTL 0 that forwards the `Cache-Control` header from S3. The HTML sync above sets `max-age=300`.

Response headers policy (optional, both behaviors):

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` once www and apex both serve HTTPS

## 6. Check after deploy

```bash
# Apex serves the homepage
curl -sI https://ezeebit.com/ | head -n 15

# www is a single hop to the apex
curl -sI https://www.ezeebit.com/in-store | head -n 15

# Unknown URLs are 404, and the body is the not-found page
curl -sI https://ezeebit.com/this-page-does-not-exist | head -n 15

# Pre-rendered route is 200 and is not the SSR bundle
curl -sI https://ezeebit.com/payouts | head -n 15
curl -sI https://ezeebit.com/server/entry-server.js | head -n 15
```

Expect `301` for www, `404` for the unknown URL and for `/server/entry-server.js`, and `200` for `/payouts`.
