LUXTECH CONTACT CARD V5.6 — INSTALL COMPATIBILITY FIX

Issue: Chrome displayed "This app cannot be installed" on https://lxtech.ro/card/.
The precise root cause could not be confirmed remotely. This update uses a standard JSON manifest, explicit launch and scope paths, and robust offline caching. It includes an on-device diagnostic checker.

DEPLOYMENT
1. Unzip the package.
2. Upload the CONTENTS of this folder, not the folder itself, into the web root folder /card/ on lxtech.ro.
3. Replace existing index.html and sw.js, upload manifest.json and check.html, plus all icons/ PNGs and Tudor_Neamtu_Contact.vcf. Do not upload the ZIP as the website.
4. Ensure your webserver serves manifest.json as application/json and icons/*.png as image/png. The alternative manifest.webmanifest is retained but not linked.
5. Open https://lxtech.ro/card/check.html in Android Chrome. ALL files should show green check marks; browser-mode is expected until installed.
6. Visit https://lxtech.ro/card/ in Chrome, reload it, and choose the three-dot menu > Install and create shortcut > Install.
7. Launch LUXTECH Card from your home screen. The manifest asks for fullscreen mode. Android may leave system navigation overlays depending on the OS version.

IF STILL DISABLED
1. Check results at /card/check.html, especially icons and manifest.json MIME.
2. Try Chrome Settings > Site settings > All sites > lxtech.ro > Clear & reset *only if you are comfortable clearing site data for this domain*, then revisit /card/.
3. Try closing all Chrome tabs for /card/ and reopening in a new tab. The browser can cache PWA installation metadata.
4. If there is still a problem with all diagnostic checks passing, the exact installability failure needs Chrome DevTools (Application > Manifest) or Android Remote Debugging. The diagnostic page checks file delivery, not Android WebAPK server errors.

SHARING
- Share contact: native Android chooser with scannable vCard QR PNG, recipient uses Google Lens / compatible QR app > Add contact.
- Share card: branded PNG with QR; VCF attachment/link remains an optional secondary method.
