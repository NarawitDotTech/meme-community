-- Database Schema for Meme Community

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'educator', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Posts / Memes table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_handle TEXT NOT NULL,
  author_avatar TEXT,
  is_verified BOOLEAN DEFAULT false,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'general',
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_handle TEXT NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Learning Videos table
CREATE TABLE IF NOT EXISTS learning_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Slang' CHECK (category IN ('Foundations', 'Slang', 'Memes', 'Culture', 'Advanced')),
  level TEXT NOT NULL DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  duration TEXT NOT NULL DEFAULT '10:00',
  module_code TEXT DEFAULT 'Module 1.0',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  views TEXT NOT NULL DEFAULT '1.2k',
  thumbnail_url TEXT,
  video_url TEXT,
  instructor_name TEXT DEFAULT 'Memeology Dept.',
  instructor_subscribers TEXT DEFAULT '1.2M Scholars',
  instructor_avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Meme Trends / Tracker table
CREATE TABLE IF NOT EXISTS meme_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Tech & Culture',
  trend_status TEXT NOT NULL DEFAULT 'Trending Up' CHECK (trend_status IN ('Trending Up', 'Peaking', 'Niche Rising')),
  image_url TEXT,
  description TEXT NOT NULL,
  origin TEXT,
  slang_terms TEXT[] DEFAULT ARRAY[]::TEXT[],
  cultural_context TEXT,
  teacher_tips TEXT,
  student_notes TEXT,
  source_url TEXT,
  is_ai_explained BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Meme Reports table
CREATE TABLE IF NOT EXISTS meme_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_name TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
