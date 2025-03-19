# YouTube Focus Saver - Project Requirements Document (PRD)

## 1. App Overview

YouTube Focus Saver is a Chrome extension designed to help users save and organize YouTube videos for focused learning. The extension automatically captures metadata and transcripts from YouTube videos that a user watches, allowing them to revisit the content later without distractions.

The primary goal is to create a distraction-free environment for learning from YouTube content by:
- Automatically saving videos while browsing
- Providing easy access to video transcripts
- Enabling organization of saved videos
- Supporting offline viewing (via saved metadata and transcripts)
- Optionally generating AI summaries of video content

## 2. User Flow

### Primary User Flows:

1. **Automatic Video Saving**
   - User watches a YouTube video
   - Extension automatically extracts metadata and transcript
   - Video is saved to local storage
   - User receives a subtle notification that the video was saved

2. **Browsing Saved Videos**
   - User clicks on the extension icon
   - Extension popup shows a list of saved videos
   - User can search or filter their saved videos
   - User can click on a video to view details

3. **Viewing Video Details**
   - User can view video metadata (title, description, etc.)
   - User can read the full transcript
   - User can read AI-generated summary (if enabled)
   - User can open the video on YouTube

4. **Configuration**
   - User can enable/disable dark mode
   - User can configure auto-save settings
   - User can enable/disable cloud sync
   - User can enable/disable AI summaries

## 3. Tech Stack & APIs

### Frontend
- **TypeScript**: For type-safe code
- **React**: For building the user interface
- **Tailwind CSS**: For styling
- **Chrome Extension API**: For browser integration

### Backend (Optional)
- **Supabase**: For cloud storage and synchronization

### External APIs
- **YouTube Data API v3**: For fetching video metadata
- **Google Gemini API**: For generating AI summaries

### Development Tools
- **Webpack**: For bundling
- **Babel**: For JavaScript transpilation
- **Git**: For version control

## 4. Core Features

### Must-Have Features
- Browser extension for Chrome
- Automatic YouTube video saving
- Video metadata extraction
- Transcript extraction
- Local storage of saved videos
- Clean, minimalist UI
- Dark mode support
- Search functionality

### Should-Have Features
- Video organization (tags, folders)
- Video notes
- Export functionality (to markdown, etc.)
- Keyboard shortcuts

### Could-Have Features
- Cloud synchronization with Supabase
- AI-generated summaries using Gemini API
- Browser support beyond Chrome (Firefox, Edge)
- Mobile companion app

## 5. In-scope & Out-of-scope

### In-scope
- Chrome extension development
- Automatic video saving
- Metadata and transcript extraction
- Local storage functionality
- Basic UI for browsing and viewing saved videos
- Settings configuration
- Basic offline support

### Out-of-scope
- Full-fledged video player
- Social sharing features
- Content recommendation algorithms
- Video downloading (to comply with YouTube ToS)
- Support for non-YouTube video platforms

## 6. Technical Requirements

### Storage
- Use Chrome's local storage for saved videos
- Optional Supabase integration for cloud storage

### Performance
- Minimal impact on browser performance
- Efficient transcript storage
- Responsive UI even with many saved videos

### Security
- Secure handling of API keys
- Data privacy considerations
- No collection of user data beyond necessary functionality

### Compliance
- Adherence to YouTube Terms of Service
- Compliance with Chrome Web Store policies
