# Database Schema Documentation

This document provides a detailed explanation of the YouTube Focus Saver database schema implemented in Supabase.

## Overview

The database schema consists of four main tables:
- `videos` - Stores information about saved YouTube videos
- `watch_sessions` - Records user viewing sessions and focus metrics
- `user_metrics` - Stores aggregated statistics about user viewing habits
- `user_settings` - Manages user preferences and configuration

All tables are protected by Row Level Security (RLS) policies to ensure users can only access their own data.

## Table Structures

### videos

The `videos` table stores metadata about saved YouTube videos.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (automatically generated) |
| user_id | uuid | Foreign key to auth.users (identifies the owner) |
| video_id | text | YouTube video ID (unique identifier on YouTube) |
| title | text | Video title |
| url | text | Full video URL |
| thumbnail_url | text | URL to video thumbnail |
| channel_name | text | YouTube channel name |
| description | text | Video description |
| transcript | jsonb | Video transcript (if available) as JSON |
| summary | text | AI-generated summary (if enabled) |
| date_added | timestamp | When the video was saved |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Record update time |

**Indexes:**
- `videos_user_id_idx` - Improves query performance when filtering by user
- `videos_video_id_idx` - Speeds up lookups by YouTube video ID

**Constraints:**
- Unique constraint on `(user_id, video_id)` to prevent duplicate videos for a user

### watch_sessions

The `watch_sessions` table tracks viewing sessions and focus metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (automatically generated) |
| user_id | uuid | Foreign key to auth.users (identifies the owner) |
| video_id | text | YouTube video ID |
| video_title | text | Video title (denormalized for convenience) |
| start_time | timestamp | When the session started |
| end_time | timestamp | When the session ended (null if ongoing) |
| watch_duration | integer | Duration watched in seconds |
| focus_score | float | Focus score from 0.0 to 1.0 |
| pause_count | integer | Number of times video was paused |
| tab_switch_count | integer | Number of times user switched tabs |
| completion_rate | float | Percentage of video watched from 0.0 to 1.0 |
| created_at | timestamp | Record creation time |

**Indexes:**
- `watch_sessions_user_id_idx` - Improves query performance when filtering by user
- `watch_sessions_start_time_idx` - Speeds up queries that filter or sort by time

### user_metrics

The `user_metrics` table stores aggregated statistics about user viewing habits.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (automatically generated) |
| user_id | uuid | Foreign key to auth.users (identifies the owner) |
| total_watch_time | integer | Total watch time in seconds |
| average_focus_score | float | Average focus score (0.0-1.0) |
| average_completion_rate | float | Average completion rate (0.0-1.0) |
| total_videos_watched | integer | Count of videos watched |
| last_updated | timestamp | When metrics were last updated |
| created_at | timestamp | Record creation time |

**Constraints:**
- Unique constraint on `user_id` to ensure one metrics record per user

### user_settings

The `user_settings` table stores user preferences and configuration.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (automatically generated) |
| user_id | uuid | Foreign key to auth.users (identifies the owner) |
| cloud_sync_enabled | boolean | Whether cloud sync is enabled |
| auto_save_videos | boolean | Whether to auto-save videos |
| dark_mode | text | UI theme preference (system/light/dark) |
| generate_summaries | boolean | Whether to generate AI summaries |
| api_keys | jsonb | API keys for external services as JSON |
| notifications_enabled | boolean | Whether notifications are enabled |
| notification_frequency | text | How often to send notifications |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Record update time |

**Constraints:**
- Unique constraint on `user_id` to ensure one settings record per user

## Security (Row Level Security)

All tables have Row Level Security (RLS) policies that restrict data access:

### videos Table Policies

- **Select**: Users can only view their own videos
  ```sql
  create policy "Users can view their own videos"
    on public.videos for select
    using (auth.uid() = user_id);
  ```

- **Insert**: Users can only insert videos where user_id matches their auth ID
  ```sql
  create policy "Users can insert their own videos"
    on public.videos for insert
    with check (auth.uid() = user_id);
  ```

- **Update**: Users can only update their own videos
  ```sql
  create policy "Users can update their own videos"
    on public.videos for update
    using (auth.uid() = user_id);
  ```

- **Delete**: Users can only delete their own videos
  ```sql
  create policy "Users can delete their own videos"
    on public.videos for delete
    using (auth.uid() = user_id);
  ```

Similar policies exist for all other tables, ensuring that users can only access and modify their own data.

## Automatic Updates

The schema includes triggers and functions to automatically maintain derived data:

### update_user_metrics Function

This function updates the aggregated metrics in the `user_metrics` table when a watch session is created or updated:

```sql
create or replace function public.update_user_metrics()
returns trigger as $$
begin
  -- Insert or update user metrics based on all watch sessions for the user
  insert into public.user_metrics (
    user_id,
    total_watch_time,
    average_focus_score,
    average_completion_rate,
    total_videos_watched,
    last_updated
  )
  select
    NEW.user_id,
    coalesce(sum(watch_duration), 0),
    coalesce(avg(focus_score), 0),
    coalesce(avg(completion_rate), 0),
    count(distinct video_id),
    now()
  from
    public.watch_sessions
  where
    user_id = NEW.user_id
  on conflict (user_id)
  do update set
    total_watch_time = excluded.total_watch_time,
    average_focus_score = excluded.average_focus_score,
    average_completion_rate = excluded.average_completion_rate,
    total_videos_watched = excluded.total_videos_watched,
    last_updated = excluded.last_updated;
  
  return NEW;
end;
$$ language plpgsql security definer;
```

This function is triggered by:

- **After Insert**: When a new watch session is created
- **After Update**: When an existing watch session is updated

## Best Practices

When working with this schema:

1. Always access data through the Supabase client, which automatically applies RLS policies
2. Never expose sensitive information like API keys in client-side code
3. Use the provided tables according to their purpose:
   - `videos` for long-term storage of saved videos
   - `watch_sessions` for individual viewing events
   - `user_metrics` for aggregated statistics (do not update directly)
   - `user_settings` for user preferences

4. Use database migrations when changing the schema to ensure consistency across environments 