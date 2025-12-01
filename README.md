# RCOSCAN Scanner App

Live police scanner feed for Riverside County, CA with audio playback capability.

## 🚀 Live Demo

**Web App:** https://rcoscan-scanner.netlify.app

**Expo Go:** Use Expo Go app and visit the project at `@artichoke/rcoscan-scanner`

## Features

- 📡 Real-time scanner call feed from OpenMHZ API
- 🔊 Audio playback for each call
- 🏷️ Talkgroup names and descriptions
- 🔄 Auto-refresh every 10 seconds
- 📱 Mobile-friendly responsive design
- 🌐 Works on iOS, Android, and Web

## Tech Stack

- React Native + Expo
- TypeScript
- expo-av for audio playback
- OpenMHZ API integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rcoscan-scanner.git

# Navigate to project directory
cd rcoscan-scanner

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

- **iOS Simulator:** Press `i` in terminal
- **Android Emulator:** Press `a` in terminal
- **Web Browser:** Press `w` in terminal
- **Physical Device:** Scan QR code with Expo Go app

## Deployment

### Web Deployment

```bash
# Export web build
npx expo export --platform web

# Deploy to Netlify
netlify deploy --prod --dir dist
```

### Mobile App Updates

```bash
# Publish update via EAS
eas update --branch production --message "Update description"
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
scanner-app/
├── App.tsx              # Main application component
├── app.json             # Expo configuration
├── index.ts             # Entry point
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── assets/              # Images and icons
└── DEPLOYMENT.md        # Deployment guide
```

## API

This app uses the [OpenMHZ API](https://openmhz.com) to fetch scanner calls:
- Calls endpoint: `https://api.openmhz.com/rcoscan/calls/newer`
- Talkgroups endpoint: `https://api.openmhz.com/rcoscan/talkgroups`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- [OpenMHZ](https://openmhz.com) for providing the scanner API
- Built with [Expo](https://expo.dev)
