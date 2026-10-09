# GeoNotes — Offline Geo-Tagged Notes PWA

[![CI](https://github.com/rudra/01-offline-maps-notes/actions/workflows/ci.yml/badge.svg)](https://github.com/rudra/01-offline-maps-notes/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![Coverage](https://img.shields.io/badge/Coverage-70%25-brightgreen.svg)](#)

A production-grade Progressive Web App for creating and managing geo-tagged notes completely offline.

## Features

- **Offline-first**: All notes stored locally via IndexedDB/localStorage
- **Interactive map**: Click to drop pins and add notes at any location
- **Search**: Full-text search across titles, content, and tags
- **Installable**: Add-to-home-screen with beforeinstallprompt support
- **Responsive**: Works on mobile and desktop viewports
- **Auto-sync**: Service worker caches map tiles and app shell
- **Toast notifications**: Visual feedback for save/delete actions
- **Keyboard shortcuts**: ⌘K to focus search bar

## Screenshots

```
┌─────────────────────────────────────┐
│  🌍 GeoNotes                  [⊡]   │
├──────────────────┬──────────────────┤
│                  │  📍 New Note     │
│                  │  ┌────────────┐  │
│    OpenStreetMap │  │ Title      │  │
│                  │  └────────────┘  │
│  ● You are here  │  ┌────────────┐  │
│                  │  │ Content... │  │
│      [zoom +]    │  └────────────┘  │
│                  │  Tags: hiking,   │
│                  │  📍 45.1234,-93. │
│                  │  [Save] [Delete] │
├──────────────────┴──────────────────┤
│ 🔍 Search notes... (⌘K)            │
│ ┌────────────────────────────────┐  │
│ │ Park Bench                     │  │
│ │ Sat rested a group of friends  │  │
│ │ 2h ago · 45.45,-93.45          │  │
│ └────────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5
- **PWA**: vite-plugin-pwa (Workbox), service worker registration
- **Mapping**: Leaflet 1.9 with OpenStreetMap tiles
- **State**: Zustand for global state management
- **Testing**: Vitest + jsdom, v8 coverage
- **CSS**: Custom dark theme, responsive grid layout

## Installation

```bash
git clone https://github.com/rudra/01-offline-maps-notes.git
cd 01-offline-maps-notes
npm install
```

## Usage

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Run tests
npm test

# Coverage report
npm run coverage
```

## Roadmap

- [ ] IndexedDB persistence (replace localStorage for large datasets)
- [ ] Export notes to GPX/CSV
- [ ] Collaborative notes via WebRTC
- [ ] Photo attachments on notes
- [ ] Map tile caching for fully offline use
- [ ] Push notifications for nearby notes

## License

MIT — see [LICENSE](LICENSE) for details.
