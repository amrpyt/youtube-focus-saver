# YouTube Focus Saver - Backend Structure Document

This document outlines the backend structure for the YouTube Focus Saver Chrome extension, focusing on the Supabase integration for cloud storage and synchronization.

## 1. Backend Overview

YouTube Focus Saver primarily operates as a client-side application, with most functionality implemented directly in the Chrome extension. However, the optional Supabase integration provides cloud storage capabilities for cross-device synchronization and backup.

### Key Points

- Backend integration is **optional** and requires user setup
- All core functionality works without backend connection
- User authentication is required for cloud features
- Data is stored both locally and in the cloud when enabled

## 2. Supabase Integration

### What is Supabase?

Supabase is an open-source Firebase alternative providing ready-to-use backend services including:
- PostgreSQL Database
- Authentication
- Storage
- Realtime subscriptions
- Edge Functions

### Why Supabase?

- **Open Source**: Transparent and extendable
- **PostgreSQL**: Built on proven database technology
- **Realtime**: Enables syncing across devices
- **Free Tier**: Generous free tier for most users
- **Self-Hostable**: Option for advanced users

## 3. Database Schema

### Tables Structure

#### Users Table
```sql
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  
  constraint users_email_key unique (email)
);

-- Enable RLS
alter table public.users enable row level security;
-- Create policies
create policy "Users can view their own data." 
  on users for select using (auth.uid() = id);
```

#### Videos Table
```sql
create table public.videos (
  id uuid default gen_random_uuid() not null primary key,
  user_id uuid references public.users not null,
  video_id text not null,
  title text not null,
  url text not null,
  thumbnail_url text,
  channel_name text,
  description text,
  date_added timestamp with time zone default now() not null,
  status text default 'saved' not null,
  last_synced timestamp with time zone default now() not null,
  
  constraint videos_user_id_video_id_key unique (user_id, video_id)
);

-- Enable RLS
alter table public.videos enable row level security;
-- Create policies
create policy "Users can CRUD their own videos." 
  on videos for all using (auth.uid() = user_id);
```

#### Transcripts Table
```sql
create table public.transcripts (
  id uuid default gen_random_uuid() not null primary key,
  video_id uuid references public.videos on delete cascade not null,
  transcript jsonb not null,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.transcripts enable row level security;
-- Create policies
create policy "Users can CRUD their own transcripts." 
  on transcripts for all using (
    auth.uid() = (select user_id from public.videos where id = transcripts.video_id)
  );
```

#### Summaries Table
```sql
create table public.summaries (
  id uuid default gen_random_uuid() not null primary key,
  video_id uuid references public.videos on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default now() not null,
  
  constraint summaries_video_id_key unique (video_id)
);

-- Enable RLS
alter table public.summaries enable row level security;
-- Create policies
create policy "Users can CRUD their own summaries." 
  on summaries for all using (
    auth.uid() = (select user_id from public.videos where id = summaries.video_id)
  );
```

#### Settings Table
```sql
create table public.settings (
  user_id uuid references public.users not null primary key,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.settings enable row level security;
-- Create policies
create policy "Users can CRUD their own settings." 
  on settings for all using (auth.uid() = user_id);
```

## 4. Authentication Flow

### Setup

1. User enables cloud sync in extension settings
2. Extension redirects to Supabase hosted auth page
3. User creates account or signs in
4. Supabase returns authentication token
5. Extension stores token securely in Chrome storage

### Ongoing Authentication

1. Extension checks for token validity on startup
2. If token is expired, silent refresh is attempted
3. If refresh fails, user is prompted to sign in again
4. Access and refresh tokens are updated in storage

## 5. Synchronization Process

### Initial Sync

When a user first enables cloud sync:

1. Extension retrieves all locally saved videos
2. For each video, the extension:
   - Checks if video already exists in the cloud
   - Uploads new videos to Supabase
   - Updates existing videos with local changes
3. Extension downloads any videos from cloud not present locally
4. Conflict resolution favors most recently updated version

### Incremental Sync

After the initial sync:

1. When a new video is saved locally:
   - Video is marked for sync with status "pending"
   - Background script attempts to upload to Supabase
   - Status updated to "synced" or "failed"

2. When extension is opened:
   - Background script checks for new videos in cloud
   - New videos are downloaded and merged with local storage
   - Failed uploads are retried

### Realtime Updates

For simultaneous use across devices:

1. Extension subscribes to realtime changes on videos table
2. When changes occur in the cloud, extension updates local storage
3. Conflicts are resolved based on timestamp

## 6. API Endpoints and Functions

### Supabase REST API

The extension uses the following Supabase endpoints:

#### Authentication
- `POST /auth/v1/token`: Sign in and token refresh
- `POST /auth/v1/signup`: Create new account

#### Videos
- `GET /rest/v1/videos`: Retrieve videos
- `POST /rest/v1/videos`: Create new video
- `PATCH /rest/v1/videos`: Update existing video
- `DELETE /rest/v1/videos`: Delete video

#### Transcripts and Summaries
- `GET /rest/v1/transcripts`: Retrieve transcripts
- `POST /rest/v1/transcripts`: Create new transcript
- `GET /rest/v1/summaries`: Retrieve summaries
- `POST /rest/v1/summaries`: Create new summary

#### Settings
- `GET /rest/v1/settings`: Retrieve user settings
- `POST /rest/v1/settings`: Create/update settings

## 7. Security Considerations

### Data Privacy

- All data is encrypted in transit (HTTPS)
- Authentication tokens stored in Chrome's secure storage
- Row-Level Security (RLS) ensures users can only access their own data
- API keys never sent to Supabase

### Supabase Security

- JWT-based authentication
- PostgreSQL RLS for data access control
- Encrypted data in transit and at rest
- Optional self-hosting for complete control

## 8. Implementation in Extension

### Service Structure

```
src/
└── services/
    ├── youtube.ts       # YouTube API service
    ├── supabase.ts      # Supabase client and methods
    └── sync.ts          # Synchronization logic
```

### Main Supabase Service Components

```typescript
// supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Video, TranscriptItem } from '../types';

export class SupabaseService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private supabase: any;
  
  constructor(url: string, key: string) {
    this.supabaseUrl = url;
    this.supabaseKey = key;
    this.supabase = createClient(url, key);
  }
  
  // Authentication methods
  async signIn(email: string, password: string) { /* ... */ }
  async signUp(email: string, password: string) { /* ... */ }
  async signOut() { /* ... */ }
  
  // Video methods
  async getVideos() { /* ... */ }
  async saveVideo(video: Video) { /* ... */ }
  async updateVideo(video: Video) { /* ... */ }
  async deleteVideo(videoId: string) { /* ... */ }
  
  // Transcript methods
  async getTranscript(videoId: string) { /* ... */ }
  async saveTranscript(videoId: string, transcript: TranscriptItem[]) { /* ... */ }
  
  // Summary methods
  async getSummary(videoId: string) { /* ... */ }
  async saveSummary(videoId: string, summary: string) { /* ... */ }
  
  // Settings methods
  async getSettings() { /* ... */ }
  async saveSettings(settings: any) { /* ... */ }
  
  // Sync methods
  async startRealtimeSubscription() { /* ... */ }
  async syncAllVideos() { /* ... */ }
}
```

## 9. Fallback and Offline Support

### Local-First Approach

- All data is stored locally first
- Extension functions fully without internet connection
- Sync happens in background when connection is available

### Conflict Resolution

- Last-write-wins strategy for basic conflicts
- More complex conflicts resolved with three-way merge
- User notification for unresolvable conflicts

### Retry Mechanism

- Failed API requests are queued for retry
- Exponential backoff for repeated failures
- Manual sync option in settings
