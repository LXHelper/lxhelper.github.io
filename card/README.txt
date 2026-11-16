LUXTECH DIGITAL BUSINESS CARD — INSTALLABLE PWA
==============================================

WHAT YOU HAVE
- A responsive animated business card with a scannable vCard QR and working contact download
- A home-screen app icon and true app-style launch (no browser toolbar)
- One-tap Install button on compatible Android Chrome browsers
- An install-guide fallback for Android and iOS
- Offline operation after first online visit (thanks to the service worker)
- No third-party frameworks, analytics or external assets

HOW TO PUBLISH
1. Upload ALL files in this ZIP to your website folder /card/ (not only index.html).
2. Open https://lxtech.ro/card/ in Chrome on Android or Safari on iPhone.
3. Make sure HTTPS works, including https://lxtech.ro/card/manifest.json and /card/sw.js.
4. Android: tap Install inside the card; or use the Chrome menu > Add to Home screen > Install.
5. iPhone: Safari > Share > Add to Home Screen > Open as Web App > Add.
6. Launch the new Tudor Card icon on the phone. It opens independently of the browser interface.

IMPORTANT
- Opening the included index.html as a local file gives you an animated view, but the
  full PWA install and offline caching features REQUIRE publishing the folder over HTTPS.
- This ZIP does not deploy the website; only someone with access to lxtech.ro can upload it.
- If hosting at any other address, update og:url / og:image in index.html.
- Fullscreen/status bar behavior varies by browser and phone operating system.
- When changing the app, increment CACHE_NAME in sw.js to refresh cached files.
- The QR encodes a vCard directly; a second person can scan it without opening the website.
- The .vcf file is included and also embedded in the HTML for tap-to-save.
- No unconfirmed phone number is included.

CONTACT
Tudor Neamțu — Senior ICT Project Manager, LUXTECH Innovation
Tudor.Neamtu@lxtech.ro | https://lxtech.ro
