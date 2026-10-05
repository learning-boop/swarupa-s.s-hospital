# Sri Swarupa Super Speciality Hospital — React + Vite

Homepage in the Swarupa Fertility design language: scroll-driven arch hero (GSAP ScrollTrigger),
10th-anniversary section, department slider, accordions, testimonials, appointment form.

## Run
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview
```

## Structure
```
index.html                 fonts + root
src/main.jsx, App.jsx      entry and section order
src/index.css              all styles (tokens at top of :root)
src/data/site.js           ALL content: contact, departments, doctors, FAQ, quotes, anniversary toggle
src/hooks.js               useReveal (IntersectionObserver) + reduced-motion helper
src/components/            one file per section
public/img/                logo, photos, 10th-anniversary cut-out
```

## Edit content
Everything editable lives in `src/data/site.js`. Set `anniversary.enabled = false` to hide the anniversary section.
Set `site.formEndpoint = '/api/appointment.php'` to POST the form as JSON to your PHP backend
(fields: name, phone, email, date, dept, doc, msg). Without an endpoint the form just validates and shows a success state.

## Deploy
- **Vercel/Netlify:** import the repo, framework = Vite. Done.
- **Shared PHP host:** `npm run build`, upload the contents of `dist/` to `public_html/`, put the PHP API under `public_html/api/`.
  If the site lives in a sub-folder, set `base: '/subfolder/'` in `vite.config.js` and change image paths in `site.js` accordingly.

## Before launch
Replace the low-res OT and doctor photos, add the hospital video to the Watch card, confirm bed count / phone / address with the client,
add canonical + Open Graph tags and MedicalOrganization JSON-LD in `index.html`.
