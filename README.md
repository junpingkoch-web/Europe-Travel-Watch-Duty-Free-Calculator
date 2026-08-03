# Europe Travel Watch Duty-Free Calculator

A free, static (no build step) tool for estimating how much a duty-free
watch purchase in Europe actually nets you: pick the country of purchase,
enter the tag price, and it estimates the VAT-refund cash-back, the net
price after refund, and — optionally — how that compares against the
home-country retail price and home-country customs duty. Trilingual UI:
中文 / English / Deutsch.

## Run locally

Just open `index.html` in a browser, or serve the folder with any static
server, e.g.:

```
npx serve .
```

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages,
S3, etc.) — upload the folder as-is.

Before going live:

1. ✅ Real AdSense publisher ID (`ca-pub-4830421367394194`) is already wired in
   `index.html` and `ads.txt`.
2. Add your AdSense `<ins>` snippet inside the three `.ad-slot`
   placeholders in `index.html` (marked with comment blocks).
3. Update the `buymeacoffee.com` link in `index.html` if you want the
   support button to point elsewhere.
4. Country VAT rates and refund-rate estimates in `script.js`
   (`COUNTRY_FACTS`) are approximate and change over time — double-check
   before relying on them.

## Structure

- `index.html` — page markup, SEO meta tags, ad slot placeholders.
- `style.css` — styling (light/dark auto via `prefers-color-scheme`,
  responsive, 3D-style language switch, gradient title).
- `script.js` — zh/en/de text dictionary, per-country VAT/refund presets,
  the refund/customs math, and the auto-fit title sizing.
