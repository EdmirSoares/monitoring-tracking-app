# 📍 Monitoring App

A mobile application in **React Native** with **Expo** for real-time tracking and monitoring. The app provides location tracking features and route visualization.

---

## 📱 Description

This application was developed for transport companies with the goal of monitoring drivers/pilots. It offers:

- Real-time GPS tracking with background updates
- Route visualization on Google Maps
- Route history with filters
- Offline coordinate storage (when offline)
- Push notifications about tracking status
- JWT-based authentication

---

## 🛠️ Tech Stack

- **React Native** 0.79.2
- **Expo SDK** 53.0.9
- **TypeScript** 5.3.3
- **Styled Components** 6.1.17
- **React Navigation** 7.x

---

## 📦 Main Libraries

### Core

- `@react-navigation/native`, `@react-navigation/native-stack` - Navigation
- `expo-location` - Location services
- `expo-task-manager` - Background tasks
- `expo-background-task` - Background processing
- `expo-notifications` - Push notifications
- `react-native-maps` - Google Maps
- `@react-native-async-storage/async-storage` - Local storage
- `axios` - HTTP client
- `jwt-decode` - JWT decoding
- `@react-native-community/netinfo` - Connectivity detection

### UI and Styling

- `styled-components` - CSS-in-JS
- `react-native-responsive-fontsize` - Responsive font sizing
- `react-native-safe-area-context` - Safe area
- `@expo/vector-icons` - Icon library

---

## 🚧 Project Status

### ✅ Implemented
- [x] Responsive user interface
- [x] Navigation between screens
- [x] Real-time GPS tracking
- [x] Background processing
- [x] Automatic coordinate collection
- [x] Minimum distance filter
- [x] Google Maps visualization
- [x] Basic offline storage (AsyncStorage)
- [x] Notification system
- [x] JWT authentication (mobile)
- [x] Token decoding, storage and expiration
- [x] Connectivity detection

### 🔄 In Development
- [ ] **Backend API** - Authentication and synchronization services
- [ ] **React Hook Form + Yup** - Form validation migration
- [ ] **SQLite Local Database** - Offline-first database implementation
- [ ] **Data synchronization** - Offline-first strategy with sync
- [ ] **Unit tests** - Critical component coverage

### 📝 Planned Changes
- Replace manual validation with **React Hook Form** + **Yup**
- Migrate AsyncStorage to **SQLite** with **expo-sqlite**
- Implement **offline-first** pattern with automatic synchronization
- Add synchronization queue for pending data

## 🚀 Installation Process

### 📋 Prerequisites

- Node.js (v16+)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or USB debugging enabled on Android device

### 1. Clone the repository

```bash
git clone <repository-url>
cd app-rastreamento
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Google Maps API key
```bash
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_KEY"
        }
      }
    }
  }
}
```

### To get a key:

* Access Google Cloud Console

* Create a project or select an existing one

* Enable the Maps SDK for Android API

* Generate an API Key

* Restrict the key for Android apps (recommended)

##### Note: Make sure to configure your Google Maps API key before running the application. Without it, the map and location features won't work properly.

### 4. Configure Development Build
- ⚠️ This project requires a development build, as it uses libraries that don't work with Expo Go (e.g. notifications and background tasks).

```bash
npm install -g eas-cli
npx expo prebuild
npx expo run:android
```

## 📁 Folder Structure
```bash
app-rastreamento/
├── assets/                      # Static files
│   ├── images/logo/             # Logos
│   ├── icon.png                 # App icon
│   └── splash-icon.png          # Splash screen
├── src/
│   ├── components/              # Reusable components
│   ├── Provider/                # Global contexts (Auth, Font, GPS)
│   ├── routes/                  # Navigation configuration
│   ├── screens/                 # Main screens
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utility functions
├── app.json                     # Expo configuration
├── eas.json                     # Build configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## 📜 Available Scripts

```bash
npm start               # Start development server
npm run android         # Run on Android
npm run ios             # Run on iOS (macOS)
npm run clean-rebuild   # Remove android/ios and rebuild
npm run start-fresh     # Clean + Rebuild + Run
```

## 🔑 Required Permissions
* Android
* ACCESS_FINE_LOCATION

* ACCESS_COARSE_LOCATION

* ACCESS_BACKGROUND_LOCATION

* FOREGROUND_SERVICE