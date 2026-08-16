-- ==============================================================================
-- Meme Community - Complete Multi-Device Real-Time Database Setup & Seed
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gegewgrpmqhnhutasjby/sql
-- ==============================================================================

-- 1. Universal Real-Time Key-Value Sync Table (Guarantees instant sync across Phone A, Phone B, etc.)
CREATE TABLE IF NOT EXISTS public.app_state (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.app_state ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view app state" ON public.app_state;
CREATE POLICY "Public can view app state" ON public.app_state FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service can write app state" ON public.app_state;
CREATE POLICY "Service can write app state" ON public.app_state FOR ALL USING (true) WITH CHECK (true);

-- 2. Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
    id TEXT PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_handle TEXT NOT NULL,
    author_avatar TEXT,
    author_role TEXT NOT NULL DEFAULT 'student',
    author_bio TEXT,
    author_followers INT DEFAULT 0,
    is_following_author BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    content TEXT NOT NULL,
    image_url TEXT,
    video_url TEXT,
    category TEXT DEFAULT 'Culture',
    slang_tags JSONB DEFAULT '[]'::jsonb,
    poll JSONB DEFAULT NULL,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    bookmarks_count INT DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    comments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view posts" ON public.posts;
CREATE POLICY "Public can view posts" ON public.posts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can insert posts" ON public.posts;
CREATE POLICY "Anyone can insert posts" ON public.posts FOR ALL USING (true) WITH CHECK (true);

-- 3. Meme Trends Table
CREATE TABLE IF NOT EXISTS public.meme_trends (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Culture',
    trend_status TEXT NOT NULL DEFAULT 'Trending Up',
    image_url TEXT,
    description TEXT NOT NULL,
    origin TEXT,
    slang_terms JSONB DEFAULT '[]'::jsonb,
    cultural_context TEXT,
    teacher_tips TEXT,
    student_notes TEXT,
    source_url TEXT,
    is_ai_explained BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.meme_trends ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view trends" ON public.meme_trends;
CREATE POLICY "Public can view trends" ON public.meme_trends FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service can manage trends" ON public.meme_trends;
CREATE POLICY "Service can manage trends" ON public.meme_trends FOR ALL USING (true) WITH CHECK (true);

-- 4. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    email TEXT,
    role TEXT NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    bio TEXT,
    reputation INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
CREATE POLICY "Public can view profiles" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service can manage profiles" ON public.profiles;
CREATE POLICY "Service can manage profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

-- 5. Meme Reports Table
CREATE TABLE IF NOT EXISTS public.meme_reports (
    id TEXT PRIMARY KEY,
    trend_name TEXT NOT NULL,
    reason TEXT NOT NULL,
    reported_by TEXT NOT NULL,
    reported_by_role TEXT NOT NULL DEFAULT 'student',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.meme_reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view reports" ON public.meme_reports;
CREATE POLICY "Public can view reports" ON public.meme_reports FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service can manage reports" ON public.meme_reports;
CREATE POLICY "Service can manage reports" ON public.meme_reports FOR ALL USING (true) WITH CHECK (true);

-- 6. User Bookmarks Table
CREATE TABLE IF NOT EXISTS public.bookmarks (
    user_handle TEXT NOT NULL,
    post_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_handle, post_id)
);
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view bookmarks" ON public.bookmarks;
CREATE POLICY "Public can view bookmarks" ON public.bookmarks FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service can manage bookmarks" ON public.bookmarks;
CREATE POLICY "Service can manage bookmarks" ON public.bookmarks FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Initial Posts
INSERT INTO public.posts (
    id, author_name, author_handle, author_avatar, author_role, author_bio, author_followers, is_following_author, is_verified, content, image_url, category, slang_tags, likes_count, comments_count, shares_count, bookmarks_count, is_pinned, comments, created_at
) VALUES
(
    'post-welcome-1',
    'Dr. Sophia Vance',
    '@sophia_linguist',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw',
    'educator',
    'Socio-linguist & Internet Culture Researcher. Studying the syntax of memes.',
    1240,
    true,
    true,
    'Welcome to Meme Community! 🎉 This is a collaborative platform bridging digital culture, slang literacy, and empathetic communication between educators and students. Feel free to share trending memes, ask about modern slang, or explore our curriculum modules in the Learn Hub!',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    'Culture',
    '["#slangliteracy", "#digitalculture", "#welcome", "#pedagogy"]'::jsonb,
    42,
    5,
    12,
    18,
    true,
    '[
        {
            "id": "c-1",
            "author_name": "Marcus Chen",
            "author_handle": "@marcus_c",
            "author_avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
            "author_role": "student",
            "content": "Excited to be here! The AI Lesson generator is super helpful.",
            "created_at": "1h ago"
        }
    ]'::jsonb,
    '2024-03-01 00:00:00+00'
),
(
    'post-admin-announcement',
    'System Admin',
    '@admin',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw',
    'admin',
    'Community Platform Administrator & Safety Coordinator.',
    5000,
    true,
    true,
    '📢 Community Guidelines Reminder: Please ensure all posted memes and slang explanations remain school-appropriate, inclusive, and culturally enriching. Verified educators can create interactive polls and publish video modules!',
    NULL,
    'Foundations',
    '["#announcement", "#safety", "#community"]'::jsonb,
    89,
    14,
    27,
    35,
    true,
    '[]'::jsonb,
    '2024-03-02 00:00:00+00'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Profiles
INSERT INTO public.profiles (
    id, username, display_name, email, role, avatar_url, bio, reputation
) VALUES
(
    'usr-1',
    '@admin',
    'System Admin',
    'admin@memecommunity.edu',
    'admin',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw',
    'Community Platform Administrator & Safety Coordinator.',
    1000
),
(
    'usr-2',
    '@philosopher_king',
    'Dr. Sophia Vance',
    'sophia.vance@university.edu',
    'educator',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw',
    'Socio-linguist & Internet Culture Researcher. Studying the syntax of memes.',
    850
),
(
    'usr-3',
    '@student_scholar',
    'Marcus Chen',
    'marcus@student.edu',
    'student',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA',
    'Computer Science Major & Meme Historian. Exploring algorithmic culture.',
    320
)
ON CONFLICT (username) DO NOTHING;
