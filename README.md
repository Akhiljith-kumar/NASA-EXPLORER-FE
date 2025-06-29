# NASA Explorer – Front end

This is the frontend React application built to explore NASA data. The app features various sections including Media Library Search, Tech Transfer Patents, Neo Asteroids Chart, APOD (Astronomy Picture of the Day), and Space Weather Alerts.

Live Application:  
https://nasa-explorer-fe-8pvo.onrender.com/
⚠️ Please note: The backend is hosted on Render (free tier), so if inactive for a while, it may take a few seconds to wake up. A quick page refresh may be needed on first load.


  
File structure 
```bash
src/
├── api/ # Axios instance and NASA API functions
│ ├── axiosInstance.js
│ └── nasaApi.js
├── components/ # All UI components are modular and reusable
│ ├── APOD.jsx
│ ├── Header.jsx
│ ├── MediaExplorer.jsx
│ ├── NeoAsteroidChart.jsx
│ ├── popup.jsx # A reusable popup used across all cards
│ ├── SpaceWeatherAlerts.jsx
│ └── TechTransferExplorer.jsx
│ └── components.css # Main CSS file for all styling (having just one style file keeps things simple and manageable in this small-scale app)
├── utils/
│ └── dateUtils.js # Utility functions (e.g., date formatting)
├── App.js
├── App.css
├── index.js
├── index.css # Global app theme styling (entire theme of app styled here)
```

---

## 🎨 UI/UX Design Philosophy

As someone passionate about user interface and experience design, I’ve:

- Ensured **color consistency and theme control** through `index.css`, allowing you to change the entire app's theme by editing this one file.
- Used **optimized GIFs/images**
- Maintained a **professional and elegant look** using a harmonious color palette and clean layout.

---

## Reusability & Modularity

- **Popup Component**: A single popup component handles all "Read More" interactions across cards (media, tech transfer, etc.).
- **Axios Instance**: Created in `axiosInstance.js` for consistent API calls and easier scaling.
- **Utility Functions**: Placed in `utils/dateUtils.js` for formatting and common logic.

---

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Akhiljith-kumar/NASA-EXPLORER-FE
   cd NASA-EXPLORER-BE
2. Create a .env file in the root directory and add urls (emailed)
3. Install dependencies: npm install
4. Start app: npm start
