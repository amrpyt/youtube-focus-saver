# YouTube Focus Saver

A Chrome extension that helps you save and organize YouTube videos for focused learning. This extension automatically extracts video information, including transcripts, and allows you to revisit content when you're ready to focus.

## Features

- **Automatic video saving**: Automatically saves metadata for YouTube videos you watch
- **Transcript extraction**: Saves video transcripts for easy reference
- **Clean, minimalist UI**: Designed for distraction-free browsing of your saved content
- **Cloud sync** (optional): Sync your saved videos across devices with Supabase integration
- **AI summaries** (optional): Generate summaries of video content using Google's Gemini API
- **Dark mode support**: Choose between light, dark, or system theme

## Installation

### Development Mode

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/youtube-focus-saver.git
   cd youtube-focus-saver
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the extension:
   ```
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top-right corner
   - Click "Load unpacked" and select the `dist` directory from this project

### Production Use

The extension will be available on the Chrome Web Store once it's published.

## Development

- Run in watch mode: `npm run dev`
- Build for production: `npm run build`

## Project Structure

```
youtube-focus-saver/
├── dist/               # Built extension files (generated)
├── src/
│   ├── background/     # Background script
│   ├── content/        # Content scripts
│   ├── popup/          # Popup UI
│   ├── services/       # Service modules
│   ├── styles/         # CSS and Tailwind styles
│   └── types/          # TypeScript type definitions
├── icons/              # Extension icons
├── manifest.json       # Extension manifest
├── webpack.config.js   # Webpack configuration
└── README.md           # This file
```

## Technologies Used

- TypeScript
- React
- Tailwind CSS
- Chrome Extension API
- YouTube Data API
- Google Gemini API (optional)
- Supabase (optional)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
