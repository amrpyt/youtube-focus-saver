# YouTube Focus Saver - Tech Stack Document

This document outlines the complete technical stack used in the YouTube Focus Saver Chrome extension, including frameworks, libraries, APIs, and development tools.

## 1. Core Technologies

### Languages
- **TypeScript** (v4.9.5): Main programming language
- **HTML5**: Structure for extension popup
- **CSS3**: Base styling (with Tailwind)

### Frameworks & Libraries
- **React** (v18.2.0): UI component library
- **React DOM** (v18.2.0): React renderer for the DOM
- **Tailwind CSS** (v3.0.0): Utility-first CSS framework

## 2. Chrome Extension Framework

### Manifest Version
- **Manifest V3**: Latest Chrome extension architecture

### Extension Components
- **Popup**: User interface shown when clicking the extension icon
- **Background Service Worker**: Long-running scripts for event handling
- **Content Scripts**: Scripts that run in the context of web pages
- **Storage API**: For local data persistence

### Chrome API Usage
- `chrome.storage.local`: Stores videos and settings
- `chrome.tabs`: Manages browser tabs
- `chrome.runtime`: Handles messaging between components
- `chrome.scripting`: Executes scripts in web page contexts

## 3. Build System & Development Tools

### Package Management
- **npm**: Node package manager for dependencies

### Build Tools
- **Webpack** (v5.75.0): Module bundler
- **Babel** (v7.20.12): JavaScript compiler
  - `@babel/preset-env`: For modern JavaScript features
  - `@babel/preset-react`: For JSX compilation
  - `@babel/preset-typescript`: For TypeScript compilation

### CSS Processing
- **PostCSS** (v8.4.21): CSS transformer
- **Autoprefixer**: Adds vendor prefixes to CSS
- **Mini CSS Extract Plugin**: Extracts CSS into separate files

### Development Workflow
- **Webpack Dev Server**: For local development
- **Watch Mode**: Auto-rebuilds on file changes

## 4. External APIs

### YouTube Data API v3
- **Purpose**: Fetch video metadata
- **Endpoints Used**:
  - `/videos`: Get video details
- **Authentication**: API key
- **Rate Limits**: 10,000 units per day (standard quota)
- **Fallback**: DOM extraction when API unavailable

### Google Gemini API
- **Purpose**: Generate AI summaries of video content
- **Implementation**: Optional feature requiring user API key
- **Models Used**: Gemini 1.0 Pro for text generation
- **Endpoints**: Text generation API

## 5. Optional Backend Integration

### Supabase
- **Purpose**: Cloud storage and synchronization
- **Features Used**:
  - Authentication
  - Postgres Database
  - Real-time subscriptions
- **Implementation**: Optional feature requiring user setup

## 6. Project Structure

```
youtube-focus-saver/
├── src/
│   ├── background/     # Background service workers
│   ├── content/        # Content scripts for YouTube pages
│   ├── popup/          # React components for popup UI
│   ├── services/       # Shared services (YouTube, Supabase)
│   ├── styles/         # Tailwind and custom CSS
│   └── types/          # TypeScript type definitions
├── dist/               # Compiled extension (generated)
├── icons/              # Extension icons
├── manifest.json       # Extension manifest
└── webpack.config.js   # Webpack configuration
```

## 7. Type System

### Core Types
- `VideoMetadata`: Structure of video metadata
- `TranscriptItem`: Structure of transcript segments
- `Video`: Complete video object structure
- `AppSettings`: User settings configuration

### Type Libraries
- `@types/chrome`: Chrome API type definitions
- `@types/react`: React type definitions
- `@types/react-dom`: React DOM type definitions

## 8. Performance Considerations

### Storage Optimization
- Efficient transcript storage
- Lazy loading of video content
- Pagination for large collections

### Code Splitting
- Separate bundles for popup, content scripts, and background
- Shared utilities and services

### Rendering Optimization
- React memo for list items
- Virtualized lists for large collections

## 9. Security Measures

### API Key Management
- API keys stored in local storage only
- No server-side storage of user credentials
- Optional: API key validation before storage

### Data Security
- All data stored locally by default
- Optional cloud sync with user-provided credentials
- No tracking or analytics
