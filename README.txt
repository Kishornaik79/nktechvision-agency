NKTechVision Web Solutions Agency — Static Website Package

FILES
- logo.jpg, logo-small.jpg, kishor-circle.jpg: NKTechVision logo and founder photo
- index.html: main agency website
- style.css: responsive dark 3D/glassmorphism styling
- script.js: mobile menu, English/Marathi toggle, scroll reveal, desktop card tilt, enquiry form
- general-store.html: ApnaStore local shop demo
- cafe.html: Little Leaf cafe/restaurant demo
- coaching.html: BrightPath coaching academy demo
- demo.css: styles for all three demo websites

IMPORTANT BEFORE PUBLISHING
1. WhatsApp number is already set to +91 93222 82466 (script.js, index.html). To change it, search for 919322282466 in both files.
2. The demo businesses are fictional concept projects, not real client work. Keep the demo labels honest.
3. The enquiry form opens WhatsApp; it does not store or email submissions.
4. Prices shown are indicative starting prices. Confirm scope, hosting, domain and final prices with each client.

PREVIEW ON ANDROID / TERMUX
1. Extract the ZIP into a folder such as ~/nktechvision-agency
2. Open Termux and run:
   pkg update
   pkg install python
   cd ~/nktechvision-agency
   python -m http.server 8000
3. In your phone browser, visit http://127.0.0.1:8000
4. Demo pages are linked from the Our Work section.
5. Stop the server with Ctrl+C in Termux.

FREE STATIC HOSTING
Upload the folder contents to a static host such as GitHub Pages or Cloudflare Pages. No backend is needed for this static site. Test the mobile layout and WhatsApp link before sharing with clients.

3D HERO
The 3D logo uses three.js from cdnjs, so it needs internet. Open the site through a web server or hosting (not by double-clicking index.html), otherwise the logo image is shown instead.
