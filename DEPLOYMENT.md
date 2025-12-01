# Deployment Guide for RCOSCAN Scanner App

## Quick Options to Share Your App

### 1. **Expo Go (Instant Sharing - No Build Required)**

Your app is already shareable! When you run `npm start`, you get:
- **QR Code** - Anyone with Expo Go app can scan it
- **Link** - Share `exp://192.168.1.64:8081` (on same WiFi)
- **Expo Publish** - Share globally (see below)

#### Publish to Expo (Free):
```bash
npm install -g eas-cli
eas login
eas update --auto
```
This gives you a permanent URL anyone can access via Expo Go app.

### 2. **Web Deployment (Easiest for Desktop/Mobile Browser)**

Deploy as a Progressive Web App (PWA):

#### Option A: Netlify (Recommended - Free)
```bash
# Build the web version
npx expo export:web

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir web-build
```
You'll get a URL like `https://your-app.netlify.app`

#### Option B: Vercel (Also Free)
```bash
npm install -g vercel
npx expo export:web
vercel --prod
```

#### Option C: GitHub Pages (Free)
```bash
# In package.json, add:
# "homepage": "https://yourusername.github.io/scanner-app"

npx expo export:web
# Push web-build folder to gh-pages branch
```

### 3. **Native App Stores (Professional Distribution)**

#### Android (Google Play Store):
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build APK (for testing)
eas build --platform android --profile preview

# Build for Play Store
eas build --platform android --profile production
eas submit --platform android
```

#### iOS (Apple App Store):
```bash
# Build for TestFlight/App Store
eas build --platform ios --profile production
eas submit --platform ios
```

**Note**: iOS requires Apple Developer Program ($99/year)

### 4. **Standalone APK (Android Only - No Store)**

Share a single APK file users can install directly:

```bash
eas build --platform android --profile preview
```

Download the APK and share it. Users need to enable "Install from Unknown Sources".

## Recommended Approach for Beginners

**For quick sharing:** Use Netlify web deployment (takes 5 minutes):
```bash
npm install -g netlify-cli
npx expo export:web
netlify deploy --prod --dir web-build
```

**For professional app:** Use EAS Build for app stores

## Current Configuration

Your app is configured as:
- **Name**: RCOSCAN Scanner
- **Bundle ID**: com.yourname.rcoscanscanner (change "yourname")
- **Version**: 1.0.0

## Before Deploying

1. **Update bundle identifier** in `app.json`:
   - Change `com.yourname.rcoscanscanner` to your actual domain/name
   - Example: `com.johnsmith.rcoscanscanner`

2. **Test audio on different devices** - Web audio has some limitations

3. **Add privacy policy** if publishing to app stores

## Costs

- **Expo Go sharing**: Free
- **Web hosting (Netlify/Vercel)**: Free
- **EAS Build**: Free tier includes limited builds
- **Google Play Store**: $25 one-time
- **Apple App Store**: $99/year

## Need Help?

- Expo Docs: https://docs.expo.dev/
- EAS Build: https://docs.expo.dev/build/introduction/
- Web Deploy: https://docs.expo.dev/distribution/publishing-websites/
