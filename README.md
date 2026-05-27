# Bodelwyddan Residential Care Home - Flat Homepage Build

This version does not use folders or HTML component fetches, so it works more reliably when opening `index.html` directly or using Live Server.

## Files
- `index.html` - homepage
- `about.html`, `services.html`, `contact.html`, `annual-report.html` - placeholder pages
- `privacy-policy.html`, `cookie-policy.html` - footer policy pages
- `styles.css` - global styling
- `main.js` - global JavaScript, Web3Forms + SweetAlert, cookie notice, active nav

## Important
Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html` with the live Web3Forms access key before launch.

The navbar and footer are now included directly in every HTML file. This avoids browser blocking from local `fetch()` calls. If you want truly global navbar/footer editing later, use a server-side include, PHP template, build tool, or the earlier component/folder version with Live Server/hosting.
