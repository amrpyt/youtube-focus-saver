# Supabase Setup for YouTube Focus Saver

This guide explains how to set up the Supabase backend for the YouTube Focus Saver extension.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com) if you don't have one already.
2. Create a new Supabase project.

## Setup Steps

### 1. Apply Database Migrations

1. Navigate to the SQL editor in your Supabase dashboard.
2. Apply migrations in numbered order from the `migrations` folder:
   - First run `00001_initial_schema.sql`
   - Then run any additional migrations in sequence

Each migration builds on the previous one, so they must be applied in order.

### 2. Configure Authentication

1. Go to Authentication settings in your Supabase dashboard.
2. Enable Email/Password sign-in method.
3. Configure any additional auth providers as desired (Google, GitHub, etc.)

### 3. Update Environment Variables

Update the Supabase connection details in `src/services/supabase.ts`:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

You can find these values in your Supabase project settings under API.

## Migrations

The database schema is version-controlled through migrations in the `migrations` folder:

- `00001_initial_schema.sql` - Creates the initial tables, RLS policies, and triggers
- Additional migrations will be added as the project evolves

If you need to make changes to the database schema, always create a new migration file rather than modifying existing ones. This ensures that everyone can apply changes in the same order.

## Database Tables

### videos
Stores information about saved YouTube videos.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| video_id | text | YouTube video ID |
| title | text | Video title |
| url | text | Full video URL |
| thumbnail_url | text | URL to video thumbnail |
| channel_name | text | YouTube channel name |
| description | text | Video description |
| transcript | jsonb | Video transcript (if available) |
| summary | text | AI-generated summary (if enabled) |
| date_added | timestamp | When the video was added |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Record update time |

### watch_sessions
Tracks user viewing sessions for videos.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| video_id | text | YouTube video ID |
| video_title | text | Video title |
| start_time | timestamp | When the session started |
| end_time | timestamp | When the session ended |
| watch_duration | integer | Duration in seconds |
| focus_score | float | Focus score (0.0-1.0) |
| pause_count | integer | Number of pauses |
| tab_switch_count | integer | Number of tab switches |
| completion_rate | float | Completion rate (0.0-1.0) |
| created_at | timestamp | Record creation time |

### user_metrics
Stores aggregated metrics for users.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| total_watch_time | integer | Total watch time in seconds |
| average_focus_score | float | Average focus score (0.0-1.0) |
| average_completion_rate | float | Average completion rate (0.0-1.0) |
| total_videos_watched | integer | Count of videos watched |
| last_updated | timestamp | When metrics were last updated |
| created_at | timestamp | Record creation time |

### user_settings
Stores user preferences and settings.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| cloud_sync_enabled | boolean | Whether cloud sync is enabled |
| auto_save_videos | boolean | Whether to auto-save videos |
| dark_mode | text | UI theme preference |
| generate_summaries | boolean | Whether to generate AI summaries |
| api_keys | jsonb | API keys for external services |
| notifications_enabled | boolean | Whether notifications are enabled |
| notification_frequency | text | How often to send notifications |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Record update time |

## Row Level Security

All tables have Row Level Security (RLS) policies that ensure users can only access their own data. This means that each user can only see and modify their own videos, watch sessions, metrics, and settings.

## Automatic Metrics Updates

The schema includes triggers that automatically update the user_metrics table whenever a watch session is created or updated. This ensures that the aggregated metrics are always up-to-date without requiring additional application code. 