-- Migration 00001: Initial schema for YouTube Focus Saver
-- This migration creates the core tables, indexes, RLS policies, and triggers

-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create videos table
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  video_id text not null,
  title text not null,
  url text not null,
  thumbnail_url text,
  channel_name text,
  description text,
  transcript jsonb,
  summary text,
  date_added timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id, video_id)
);

-- Create watch_sessions table
create table if not exists public.watch_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  video_id text not null,
  video_title text not null,
  start_time timestamp with time zone default now(),
  end_time timestamp with time zone,
  watch_duration integer default 0, -- in seconds
  focus_score float default 0,      -- 0.0 to 1.0
  pause_count integer default 0,
  tab_switch_count integer default 0,
  completion_rate float default 0,  -- 0.0 to 1.0
  created_at timestamp with time zone default now()
);

-- Create user_metrics table for aggregated metrics
create table if not exists public.user_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  total_watch_time integer default 0,  -- in seconds
  average_focus_score float default 0, -- 0.0 to 1.0
  average_completion_rate float default 0, -- 0.0 to 1.0
  total_videos_watched integer default 0,
  last_updated timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  unique (user_id)
);

-- Create user_settings table
create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  cloud_sync_enabled boolean default true,
  auto_save_videos boolean default true,
  dark_mode text default 'system',
  generate_summaries boolean default false,
  api_keys jsonb default '{}',
  notifications_enabled boolean default true,
  notification_frequency text default 'always',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id)
);

-- Create indexes for performance
create index if not exists videos_user_id_idx on public.videos (user_id);
create index if not exists videos_video_id_idx on public.videos (video_id);
create index if not exists watch_sessions_user_id_idx on public.watch_sessions (user_id);
create index if not exists watch_sessions_start_time_idx on public.watch_sessions (start_time);

-- Row Level Security Policies
-- Ensure users can only access their own data

-- Videos table policies
create policy "Users can view their own videos"
  on public.videos for select
  using (auth.uid() = user_id);

create policy "Users can insert their own videos"
  on public.videos for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own videos"
  on public.videos for update
  using (auth.uid() = user_id);

create policy "Users can delete their own videos"
  on public.videos for delete
  using (auth.uid() = user_id);

-- Watch sessions table policies
create policy "Users can view their own watch sessions"
  on public.watch_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own watch sessions"
  on public.watch_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own watch sessions"
  on public.watch_sessions for update
  using (auth.uid() = user_id);

-- User metrics table policies
create policy "Users can view their own metrics"
  on public.user_metrics for select
  using (auth.uid() = user_id);

create policy "Users can insert their own metrics"
  on public.user_metrics for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own metrics"
  on public.user_metrics for update
  using (auth.uid() = user_id);

-- User settings table policies
create policy "Users can view their own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

-- Functions to handle user metrics updates

-- Function to update user metrics when a watch session is created or updated
create or replace function public.update_user_metrics()
returns trigger as $$
begin
  -- Insert or update user metrics
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

-- Trigger to update metrics after watch session is inserted or updated
create trigger update_metrics_after_watch_session_insert
  after insert on public.watch_sessions
  for each row
  execute procedure public.update_user_metrics();

create trigger update_metrics_after_watch_session_update
  after update on public.watch_sessions
  for each row
  execute procedure public.update_user_metrics(); 