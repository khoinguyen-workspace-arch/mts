# More Than Strata — website

Plain HTML and CSS. No WordPress, no plugins, no database, no login page.
That is the point: there is nothing on the server for an attacker to break into.

**Live pages in this repo**

| Page | URL path | Source folder |
|---|---|---|
| Responsive service | `/responsive-service-more-than-strata/` | `responsive-service-more-than-strata/` |
| Change strata manager | `/change-strata-manager/` | `change-strata-manager/` |
| Internal page index | `/` | `index.html` (not indexed by Google) |

New to git? Read **[docs/GIT-BASICS.md](docs/GIT-BASICS.md)** first. It covers everything
from "what is a commit" to getting your changes live.

---

## Run it on your computer

Pick one. Option A is fine for a quick look; option B is what the live site actually does.

**A. Just open the file** — double-click `change-strata-manager/index.html`.
Fast, but links like `/assets/css/site.css` will not resolve, so the page looks unstyled.

**B. Run a tiny local web server** (recommended). In Terminal, from the repo folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/> in your browser. Press `Ctrl+C` in Terminal to stop.

If you have Node instead of Python:

```bash
npx serve .
```

Edit a file, save it, refresh the browser. That is the whole loop — no build step, no compile.

---

## What lives where

```
mts/
├── index.html                              Internal page index (noindex)
├── change-strata-manager/index.html        Landing page 1
├── responsive-service-more-than-strata/    Landing page 2
│   └── index.html
├── assets/
│   ├── css/site.css                        Shared base styles (small — keep it that way)
│   ├── css/change-strata-manager.css       Page 1 styles
│   ├── css/responsive-service-...css       Page 2 styles
│   └── js/hubspot-form.js                  Loads the HubSpot form
├── _headers                                Security headers (Netlify / Cloudflare Pages)
├── robots.txt, sitemap.xml                 Search engine instructions
└── docs/GIT-BASICS.md                      Start here if git is new
```

**One rule that keeps this maintainable:** every page's CSS is scoped to that page's
wrapper class (`.mts-lp`, `.mts-rs`). A style change on one page can never leak into
another. Keep it that way — put shared styling in `site.css` only when two pages
genuinely need the same thing.

---

## Before this goes live

Four things are open. The first two are blockers.

**1. HubSpot form IDs — blocker.** Both pages currently show a red
"Form not configured" box instead of a form. Open `assets/js/hubspot-form.js`
and paste the form ID into `FORM_IDS`. The HubSpot account ID (`7407272`) is
already set. Find the form ID in HubSpot: *Marketing → Forms → open the form →
Share → Embed code*.

**2. Images still load from WordPress — blocker.** Every photo and the logo point at
`morethanstrata.com.au/wp-content/...`. They work today because WordPress is still up.
**The day WordPress is switched off, both pages lose every image.** Download them,
put them in `assets/img/`, and change the URLs to `/assets/img/filename.jpg`.

**3. Headline copy on the responsive-service page.** The original code had a broken
tag that made the whole headline one colour. It has been fixed so it renders exactly
as before — but the design intends a second line in accent green. Decide where that
line should start and wrap it in `<span>…</span>`.

**4. No analytics.** Google Analytics / Google Ads conversion tags are not on these
pages yet. They need to be added before any paid traffic points here, or spend will
not be attributable.

---

## Publishing it

Any static host works. All three below deploy straight from this GitHub repo and
redeploy automatically every time you push — no FTP, no server to patch.

- **Cloudflare Pages** or **Netlify** — both read the `_headers` file in this repo as-is.
- **Vercel** — works, but needs the headers translated into a `vercel.json` file.

Connect the repo once, point the `morethanstrata.com.au` DNS at the host, done.

## Why the `_headers` file matters

It tells the host to send security headers with every page: block the site being
embedded in someone else's frame, force HTTPS, and restrict which outside scripts
are allowed to run (HubSpot and Google Fonts only). This is the sort of protection a
WordPress plugin was doing badly. Do not delete it, and if you add a new third-party
script, its domain must be added to the `Content-Security-Policy` line or the browser
will block it.
