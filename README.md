# DV Easy Loan Landing Page

Static corporate landing page for DV Easy Loan Sdn Bhd.

## Project files

- `index.html` — page content and structure
- `styles.css` — responsive styling
- `script.js` — language switching, carousel, FAQ, validation, WhatsApp and tracking hooks
- `assets/dv-logo.png` — production DV Easy Loan logo
- `assets/hero/hero-eligibility-cat.webp` — WhatsApp eligibility hero image
- `assets/hero/hero-zero-upfront-cat.webp` — no-upfront-payment hero image
- `assets/hero/hero-document-review-cat.webp` — document-review hero image

Each slide uses a full-width campaign image with a small HTML overlay:

```html
<a
  class="campaign-banner"
  href="https://wa.me/60194844444"
>
  <img src="assets/hero/hero-eligibility-cat.webp" alt="...">
</a>
```

Hero images use contained sizing so the full composition remains visible on desktop and mobile.

## Run locally

From the project directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`.

## Deploy to Vercel

1. Push this directory to a GitHub repository.
2. Import the repository in Vercel.
3. Select **Other** as the framework preset.
4. Leave the build command empty.
5. Set the output directory to `.` and deploy.

The project uses relative asset paths and requires no build step.

The `reference/` directory is excluded by `.vercelignore` and must not contain live-site assets.

## Form delivery

The form currently validates the five required fields and opens WhatsApp with the submitted details.

To send JSON to a future API or Telegram bridge, set the form's `data-endpoint` attribute in `index.html`:

```html
<form class="application-form" data-endpoint="https://example.com/api/enquiry">
```

When an endpoint is configured, `script.js` sends a `POST` request with a JSON body. Failed submissions retain the entered values.

## Tracking hooks

No advertising or conversion IDs are hardcoded.

- WhatsApp: `.js-whatsapp`, `[data-track="whatsapp_click"]`
- Form CTA links: `.js-form-cta`, `[data-track="form_cta"]`
- Form submit: `#short-form-submit`, `.js-form-submit`, `[data-track="form_submit"]`

If `gtag` exists, the page emits:

- `whatsapp_click` with the source section
- `form_submit` with the label `short_form`

These selectors and events can also be used as Google Tag Manager triggers.

## Pre-deployment checklist

- Test all WhatsApp links on a physical phone.
- Verify analytics events in Google Tag Manager Preview mode.
- Configure the form API endpoint if WhatsApp fallback is not sufficient.
- Replace the temporary privacy and terms anchors with final legal-page URLs.
- Confirm the published licence, permit and company details remain current.
