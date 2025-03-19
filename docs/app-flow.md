# YouTube Focus Saver - App Flow Document

This document details the complete user flow through the YouTube Focus Saver Chrome extension, showcasing how users interact with the various features and screens.

## 1. Installation & Onboarding

### First-Time Installation
1. User installs extension from Chrome Web Store
2. Extension icon appears in browser toolbar
3. Default settings are applied automatically:
   - Auto-save videos: Enabled
   - Dark mode: System default
   - Cloud sync: Disabled
   - AI summaries: Disabled

### First-Time Usage
1. User clicks on extension icon
2. Welcome screen appears with:
   - Brief description of extension functionality
   - Quick tour of features
   - Link to settings

## 2. Content Script Activation

### Automatic Activation
1. User navigates to a YouTube video page
2. Content script automatically activates
3. Script checks if the current page is a YouTube watch page
4. If yes, the script begins monitoring the video

### Video Processing
1. When a video loads completely, extension extracts:
   - Video ID and URL
   - Title, description, channel name
   - Thumbnail images
   - Transcript (if available)
2. Data is saved to Chrome's local storage
3. Subtle notification appears confirming the save

## 3. Popup UI Navigation

### Main Video List
1. User clicks extension icon in toolbar
2. Popup opens showing list of saved videos
3. Videos are displayed in a grid with:
   - Thumbnail
   - Title
   - Channel name
   - Date saved
   - Sync status indicator (if enabled)

### Search & Filter
1. User enters text in search box
2. Results filter in real-time as user types
3. Videos matching title, channel, or description are shown
4. Empty state appears if no videos match search

### Selecting a Video
1. User clicks on a video card
2. UI transitions to video details view

## 4. Video Details View

### Basic Information Tab
1. Video details screen shows:
   - Larger thumbnail
   - Full title
   - Channel name
   - Tabs for Info, Transcript, and Summary
2. Info tab selected by default, showing:
   - Full description
   - Date saved
   - "Watch on YouTube" button

### Transcript Tab
1. User clicks on Transcript tab
2. Tab displays full video transcript with:
   - Timestamped segments
   - Scrollable container for long transcripts
3. If no transcript is available, shows message and reason

### Summary Tab
1. User clicks on Summary tab
2. If summary exists, it is displayed
3. If no summary exists:
   - Message indicates no summary available
   - "Generate Summary" button appears (if API key configured)
   - Clicking button initiates summary generation

### Video Actions
1. "Watch on YouTube" button opens video in new tab
2. Back button returns to video list

## 5. Settings Navigation

### Accessing Settings
1. User clicks settings icon in main popup
2. UI transitions to settings screen

### Settings Categories
1. General settings:
   - Dark mode toggle (Light/Dark/System)
   - Auto-save videos toggle
2. Cloud sync settings:
   - Enable Supabase sync toggle
3. AI features:
   - Generate AI summaries toggle
   - Gemini API key input field (visible when summaries enabled)
4. Notification settings:
   - Show notifications toggle
   - Notification frequency dropdown

### Saving Settings
1. User modifies settings
2. Clicks "Save Settings" button
3. Settings are saved to Chrome storage
4. UI returns to previous screen

## 6. Background Processes

### Video Syncing
When cloud sync is enabled:
1. Background script detects new video saved
2. Checks if Supabase sync is enabled in settings
3. If enabled, attempts to sync video to Supabase
4. Updates sync status in local storage

### Summary Generation
When AI summaries are enabled:
1. Background script detects new video with transcript
2. Checks if summary generation is enabled in settings
3. If enabled and API key exists, calls Gemini API
4. Generated summary is saved back to the video object
5. Local storage is updated with summary
