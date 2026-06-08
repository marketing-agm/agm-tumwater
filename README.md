# Tumwater Brewery — Acquisition Microsite

**Confidential pre-market acquisition materials.** Built for AGM Real Estate Group's exclusive presentation of the former Olympia Brewery site to a select group of Pacific Northwest tribal nations.

Static HTML/CSS site. No build step. No JavaScript framework. Ready to deploy as-is.

---

## Contents

```
.
├── index.html              Home
├── summary.html            Executive Summary
├── site.html               The Site
├── vision.html             The Vision
├── path.html               Acquisition & Development Path
├── partnership.html        The Partnership
├── css/site.css            Shared stylesheet (design system)
├── js/reveal.js            Scroll-reveal animations (progressive enhancement)
├── images/                 8 figures (brewhouse, master plans, estuary map, etc.)
├── _headers                Cloudflare Pages: security headers, cache rules, noindex
├── _redirects              Cloudflare Pages: clean URLs (/summary instead of /summary.html)
├── robots.txt              Disallow all crawlers
├── .gitignore              Standard exclusions
└── README.md               This file
```

---

## Local preview

Just open `index.html` in a browser. The nav handles the rest.

If you want the live-reload experience while editing, run any static server:

```bash
# Python (built into macOS)
python3 -m http.server 8080

# Or Node
npx serve .
```

Then visit `http://localhost:8080`.

---

## Deploying to Cloudflare Pages via GitHub

### Step 1 — Create a GitHub repository

1. Go to <https://github.com/new>
2. Name it something like `tumwater-brewery` (private repository recommended)
3. **Do not** initialize with a README — we already have one
4. Create the repository

### Step 2 — Push these files to GitHub

In a terminal, from inside this folder:

```bash
git init
git add .
git commit -m "Initial commit — Tumwater Brewery acquisition microsite"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tumwater-brewery.git
git push -u origin main
```

Replace `YOUR-USERNAME` with the actual GitHub username/org.

### Step 3 — Connect Cloudflare Pages

1. Go to <https://dash.cloudflare.com/?to=/:account/pages>
2. Click **Create a project** → **Connect to Git**
3. Authorize Cloudflare to access GitHub (first time only) and select the `tumwater-brewery` repo
4. On the build settings page:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (leave as default)
   - **Root directory:** (leave empty)
5. Click **Save and Deploy**

First deploy takes 30–60 seconds. You'll get a URL like `https://tumwater-brewery.pages.dev`.

### Step 4 — Test the live site

Visit the `*.pages.dev` URL. Confirm all six pages load, images render, and the nav works. Test the clean URLs too: `/summary`, `/site`, `/vision`, `/path`, `/partnership` should all resolve.

### Step 5 (recommended) — Lock it behind Cloudflare Access

Because this is confidential material, you should require email verification before anyone can view it. Cloudflare Access is free for up to 50 users.

1. In the Cloudflare dashboard: **Zero Trust** → **Access** → **Applications**
2. Click **Add an application** → **Self-hosted**
3. Application name: `Tumwater Brewery`
4. Session duration: pick something like 24 hours
5. Application domain: paste your `*.pages.dev` URL (or your custom domain)
6. Click **Next** to add a policy:
   - Policy name: `Authorized parties`
   - Action: `Allow`
   - Include: **Emails** → enter the specific email addresses of authorized contacts at each tribal nation (and your internal team)
   - (Optionally also include: **Emails ending in** → for `@agmrealestate.com` to give the whole AGM team access)
7. Save the application

Now anyone visiting the site is challenged for an email, sent a one-time PIN, and only granted access if their email is on the allowlist. No accounts to create, no passwords to manage. You can add/remove addresses anytime.

### Step 6 (optional) — Custom domain

If you want `tumwater.agmrealestate.com` instead of `*.pages.dev`:

1. In the Pages project → **Custom domains** → **Set up a custom domain**
2. Enter the subdomain
3. Cloudflare will guide you through the DNS step (it's automatic if the domain is already on Cloudflare; otherwise you add a CNAME)

---

## Updating content

The site is just HTML and CSS. To edit:

1. Open the relevant `.html` file in any editor
2. Make your changes
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Describe what changed"
   git push
   ```
4. Cloudflare Pages auto-deploys the new version in ~30 seconds

**Design tokens** — all colors, fonts, spacing variables live in the `:root { }` block at the top of `css/site.css`. Change once, applies everywhere.

**Image swaps** — replace files in `images/` keeping the same filenames, and they'll appear everywhere they're referenced. The `_headers` file caches images for a year (`immutable`), so if you replace an image with the same filename, give it a new filename (e.g. `hero_brewhouse_v2.jpg`) and update the references in the HTML — or briefly bump the cache rule.

---

## What's still placeholder

A few things flagged for follow-up before the site goes to a real tribal contact:

- **Asking price** is shown as "Available upon request under NDA"
- **Tulalip reference** is anonymized as "Sovereign Tribal Client, Puget Sound Region"
- **AGM's role** is shown as "Selling principal · Post-development management partner" — confirm whether this matches the actual seller relationship (Heartland LLC, City of Tumwater, or AGM as principal)
- **Indian Land Counsel** team slot shows "To Be Engaged"
- **GCH/KPFF attribution** — make sure both firms are OK being named in pre-market materials

These are scattered throughout the HTML files; search for the placeholder text to find them.

---

## Contact

AGM Real Estate Group  
170 120th Avenue NE, Suite 203, Bellevue, WA 98005  
425.301.4422
