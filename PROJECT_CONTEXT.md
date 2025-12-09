# RCOSCAN Scanner App - Project Context

> **For AI Assistant:** Read this file at the start of each session to understand project context, author info, and working preferences.

## Project Identity

**Project Name:** RCOSCAN Scanner App  
**Current Version:** 1.0.0  
**Type:** Real-time police scanner feed for Riverside County, CA  
**Platform:** React Native / Expo (iOS, Android, Web)

## Author & Contact Information

**Developer:** Leondas Paul, III  
**Company:** Galilee Gallery  
**Email:** leondaspaul3@gmail.com  
**Phone:** (910) 206-4996  
**GitHub Username:** sirspyr0

## Repository Structure

### Public Repository
- **GitHub:** https://github.com/sirspyr0/rcoscan-scanner
- **Contains:** React Native source, Expo config, TypeScript
- **Branch:** main

### Deployed Instances
- **Web App (Live):** https://rcoscan-scanner.netlify.app
- **Mobile (Expo):** https://expo.dev/@artichoke/rcoscan-scanner
- **Expo Dashboard:** https://expo.dev/accounts/artichoke/projects/rcoscan-scanner

## Project Purpose

Provides real-time live police scanner feed for Riverside County, CA with audio playback. Accessible across web, iOS, and Android. Uses OpenMHZ API for call data and Expo for cross-platform development.

## Technology Stack

**Core:**
- React Native 0.81.5
- Expo ~54.0.25
- TypeScript
- React 19.1.0

**APIs & Services:**
- OpenMHZ API (live scanner data)
- expo-av (audio playback)
- Netlify (web hosting)

**Deployment:**
- Expo Go (mobile development)
- Expo Web (web export)
- EAS (native builds)
- Netlify (web production)

## Features

### Implemented
- ✅ Real-time scanner call feed from OpenMHZ API
- ✅ Audio playback for each call
- ✅ Talkgroup names and descriptions
- ✅ Auto-refresh every 10 seconds
- ✅ Mobile-responsive design
- ✅ Cross-platform (iOS, Android, Web)

### Known Limitations
- ⚠️ Riverside County, CA only (API restricted)
- ⚠️ Audio playback dependent on network speed
- ⚠️ No filtering/search yet
- ⚠️ No favorites or history
- ⚠️ No offline mode

## Project Architecture

```
scanner-app/
├── App.tsx              # Root component
├── app.json             # Expo manifest
├── index.ts             # Entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── assets/              # Images, icons
├── dist/                # Build output
├── DEPLOYMENT.md        # Deployment guide
├── GITHUB_SETUP.md      # GitHub instructions
├── README.md            # Quick reference
└── PROJECT_CONTEXT.md   # This file
```

## Working Preferences

### Communication Style
- Direct and action-oriented
- Concise responses
- Proactive implementation
- No unnecessary tool announcements

### Code Style
- TypeScript with strict mode
- React Native best practices
- Functional components with hooks
- Clear component organization
- Performance-conscious (lazy loading, memoization)

### Git Workflow
- Frequent, descriptive commits
- Clear commit messages with bullets
- Test on web/mobile before pushing
- Keep DEPLOYMENT.md up-to-date

## Development Roadmap

### Phase 1: MVP (Complete)
- [x] Real-time call feed integration
- [x] Audio playback
- [x] Talkgroup display
- [x] Auto-refresh
- [x] Responsive UI
- [x] Cross-platform support

### Phase 2: Enhancement
- [ ] Search and filtering (by talkgroup, time)
- [ ] Favorites/bookmarks
- [ ] Call history archive
- [ ] Advanced audio controls (volume, skip)
- [ ] Push notifications for specific talkgroups

### Phase 3: Advanced Features
- [ ] Multi-county support (expand beyond Riverside)
- [ ] Map view of incident locations
- [ ] CAD data integration
- [ ] Offline cache for recent calls
- [ ] User accounts and settings persistence

## Common Tasks

### Starting Development
```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Open in Expo Go on device
# Scan QR code with Expo Go app
```

### Testing
```bash
# Web
npm run web

# Android
npm run android

# iOS
npm run ios
```

### Deployment

#### Web (Netlify - Live)
```bash
npm run build:web
npm run deploy
```

#### Mobile (Expo)
```bash
# Development via Expo Go
npx expo start

# Production native build
eas build --platform ios
eas build --platform android
```

See `DEPLOYMENT.md` for detailed build instructions.

## Integration Points

**Connects to:**
- **OpenMHZ API** – Scanner call data provider
- **Netlify** – Web hosting
- **Expo Services** – Build, publishing, updates
- **GitHub** – Source control, CI/CD

**Accessed by:**
- Web users via https://rcoscan-scanner.netlify.app
- Mobile users via Expo Go or native apps

## Performance Considerations

- Auto-refresh interval: 10 seconds (tunable)
- Audio playback: Depends on network, may buffer
- Web: Optimized for mobile-first responsive design
- Native: Full hardware acceleration via Expo

## Session Log

### Session: December 7, 2025 - Portfolio Visibility Initiative
**Work Completed:**
- Created PROJECT_CONTEXT.md for gap-filling initiative
- Documented live status and roadmap
- Established patterns for consistency with portfolio

**Key Notes:**
- Currently live and production-ready
- OpenMHZ API provides reliable data
- Expansion beyond Riverside County potential future feature
- Part of developer's multi-project ecosystem

---

**Last Updated:** December 7, 2025  
**Status:** v1.0.0 Live, ready for feature enhancements
