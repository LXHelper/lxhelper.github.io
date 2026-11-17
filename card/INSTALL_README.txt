LUXTECH CONTACT CARD V5.5 — INSTALLATION

INSTALL AS A FULLSCREEN HOME-SCREEN APP (RECOMMENDED)
1. Unzip this package.
2. On your website, create the folder /card/ at the web root of lxtech.ro.
3. Upload EVERYTHING INSIDE the LUXTECH_Contact_Card_V5_5_PWA folder into /card/,
   keeping index.html, manifest.webmanifest, sw.js, Tudor_Neamtu_Contact.vcf and icons/ together.
4. On your Android phone, open https://lxtech.ro/card/ in Google Chrome.
5. In Chrome ⋮ menu, choose "Install app" or "Add to Home screen".
   You can also tap Connections > Settings > Add to home screen.
6. Tap the new LUXTECH Card icon on your home screen. The PWA requests fullscreen
   (no Chrome address bar), falling back to standalone if the device requires it.
7. After the first successful online opening, the card is cached for offline use.

SHARING
- Share contact: sends a dedicated large QR PNG through Android's native share chooser.
  The recipient opens the image with Google Lens / compatible QR scanner, then
  chooses Add contact. Their phone controls the import confirmation.
- Share card: sends a branded PNG with embedded QR. It optionally includes the
  public VCF link if the contact information matches the hosted contact file.
- Share VCF file / link: secondary method; tries a .vcf attachment where allowed,
  otherwise shares a hosted link. Android Chrome may block direct .vcf attachments.
- Save QR image: keeps a PNG that can be sent from Gallery if a browser blocks sharing.

ALTERNATIVE: STANDALONE HTML
LUXTECH_Liquid_Brush_Card_V5_5_QR_Share.html can be opened as a local file and
can display its QR without internet. However, Android Chrome cannot install
file:// documents as a standalone fullscreen PWA. For a true app-like shortcut,
use the hosted PWA folder. Sharing from local files also depends on Android's browser.

TECHNICAL NOTES
- Use HTTPS; PWA installation and service workers do not work from file://.
- PWA scope is /card/; if you deploy elsewhere, update manifest.webmanifest id.
- Do not remove sw.js or the icons folder; offline and app install need them.
- The uploaded VCF uses the original number 0752 186 436. If you change the phone
  inside the card, the QR image updates, but the hosted VCF file does not update.
  Update the VCF file on the server before sharing its link with the new number.
- Browser and Android versions vary in whether fullscreen hides system bars.
  The app retains the existing fullscreen control where supported.
