# Tafsir — Islamic Commentary Reader

A mobile-first Progressive Web App (PWA) for reading Tafsir Ibn Kathir and other Islamic commentary books in a beautiful, distraction-free environment.

## Features

- Dark mode first with warm gold/amber accents
- PDF rendering via PDF.js (no server required)
- Reading progress saved locally (Firestore-ready)
- Bookmarks with page numbers saved locally
- PWA — installable on Android and iOS
- Service worker caches fonts and PDFs for offline reading
- Clean serif typography (Playfair Display + Source Serif 4)
- Mobile-first responsive layout with bottom navigation

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| PDF Rendering | PDF.js 4 |
| Routing | React Router v6 |
| Animations | Framer Motion 11 |
| PWA | vite-plugin-pwa + Workbox |
| Backend (optional) | Firebase (Hosting + Storage + Firestore) |

---

## Quick Start

### 1. Install dependencies

```bash
cd E:/Projects/Tafsir
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 3. Build for production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Card, Badge, etc.)
│   ├── home/         # Home screen cards (CollectionCard, ContinueReadingCard, etc.)
│   └── reader/       # PDF reader components (PDFViewer, PageControls, ReaderToolbar)
├── pages/            # Route-level page components
├── hooks/            # Custom React hooks (useDarkMode, useProgress, useBookmarks, usePWAInstall)
├── services/         # Data layer (localStorage wrappers, Firestore-ready)
├── data/             # mockData.js — collections and books catalog
├── firebase/         # Firebase config, Firestore helpers, Storage helpers
├── types/            # JSDoc type definitions
└── utils/            # Formatters, PDF utilities
```

---

## Adding Your PDFs

### Option A — Use Firebase Storage (recommended for production)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable **Storage** and **Hosting**
3. Upload your PDFs to Storage under a folder, e.g., `tafsir-ibn-kathir/volume-1.pdf`
4. Get the download URL from the Firebase Console
5. Update `src/data/mockData.js` — set each book's `pdfUrl` to the download URL
6. Copy `.env.example` to `.env` and fill in your Firebase config values

### Option B — Use any direct PDF URL

Simply set `pdfUrl` in `mockData.js` to any publicly accessible PDF URL. No Firebase needed.

---

## Firebase Setup

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Firebase project values from:
**Firebase Console → Project Settings → General → Your apps → Web app**

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI (once)
npm install -g firebase-tools

# Login
firebase login

# Update .firebaserc with your project ID
# Then deploy:
npm run deploy
```

---

## Adding a New Tafsir Collection

1. Add a new entry to `COLLECTIONS` array in `src/data/mockData.js`
2. Add the books to `BOOKS` array with the matching `collectionId`
3. Set `isActive: true` when the PDFs are ready
4. No other changes required — the app adapts automatically

---

## PWA Icons

You need to generate PNG icons for PWA installation. See `public/icons/README.txt` for instructions. Use the book SVG from `public/favicon.svg` as the source.

---

## Switching to Firestore (Production)

The app currently uses `localStorage` for progress and bookmarks. To switch to Firestore:

1. Configure Firebase (see above)
2. In `src/services/progressService.js`, replace function bodies with calls to `src/firebase/firestore.js`
3. In `src/services/bookmarkService.js`, do the same for bookmarks
4. Add Firebase Authentication to identify users (required for per-user data)

The Firestore helper functions are already written in `src/firebase/firestore.js` — they just need to be wired up.

---

## Design System

| Token | Value |
|---|---|
| Background (dark) | `#0f1117` |
| Card (dark) | `#1e2436` |
| Accent gold | `#c9a84c` |
| Text primary (dark) | `#f0ead6` |
| Heading font | Playfair Display |
| Body font | Source Serif 4 |
| Arabic font | Amiri |

CSS custom properties are defined in `src/index.css` and automatically switch between dark and light themes based on the `dark` / `light` class on `<html>`.

---

## License

This project is for personal and educational use. The texts of Tafsir Ibn Kathir are in the public domain.
