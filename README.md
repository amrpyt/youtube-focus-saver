# YouTube Focus Saver

A web application for saving YouTube videos, tracking focus metrics, and enhancing your YouTube learning experience.

## Features

- **Save Videos**: Easily save YouTube videos for later viewing
- **Focus Tracking**: Monitor your focus while watching educational content
- **Dashboard**: View your focus metrics and progress over time
- **Video Management**: Organize your saved videos with status tracking and search
- **Secure Authentication**: User accounts with secure authentication via Supabase

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **APIs**: YouTube Data API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account for backend services
- YouTube Data API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/youtube-focus-saver.git
   cd youtube-focus-saver
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your configuration values
   ```
   cp public/.env.example .env
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser to http://localhost:3000

### Building for Production

```
npm run build
```

The built project will be in the `dist` directory, ready to be deployed to your hosting provider of choice.

## Database Schema

The application uses Supabase for the backend database with the following tables:

- **videos**: Stores saved video information
- **watch_sessions**: Tracks individual video watching sessions
- **user_metrics**: Aggregates daily focus metrics
- **user_settings**: Stores user preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Supabase](https://supabase.io/) for the fantastic backend services
- [YouTube Data API](https://developers.google.com/youtube/v3) for video metadata
- [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
