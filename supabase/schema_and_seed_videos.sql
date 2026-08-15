-- ==============================================================================
-- Meme Community - Educational Video Curriculum SQL Migration & Seed Script
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Create the `videos` table if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Memes',
    level TEXT NOT NULL DEFAULT 'Beginner',
    duration TEXT NOT NULL DEFAULT '10:00',
    module_code TEXT NOT NULL DEFAULT 'Module 1.0',
    status TEXT NOT NULL DEFAULT 'published',
    views TEXT NOT NULL DEFAULT '1.0k',
    thumbnail_url TEXT NOT NULL,
    video_url TEXT NOT NULL,
    instructor_name TEXT NOT NULL DEFAULT 'Memeology Dept.',
    instructor_subscribers TEXT NOT NULL DEFAULT '1.0M Scholars',
    instructor_avatar TEXT NOT NULL,
    curriculum JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all published videos
DROP POLICY IF EXISTS "Public can view published videos" ON public.videos;
CREATE POLICY "Public can view published videos" ON public.videos
    FOR SELECT USING (true);

-- Allow authenticated admins and service role to manage videos
DROP POLICY IF EXISTS "Admin and Service Role can manage videos" ON public.videos;
CREATE POLICY "Admin and Service Role can manage videos" ON public.videos
    FOR ALL USING (true) WITH CHECK (true);

-- 2. Insert or Update All Educational Video Modules
INSERT INTO public.videos (
    id,
    title,
    description,
    category,
    level,
    duration,
    module_code,
    status,
    views,
    thumbnail_url,
    video_url,
    instructor_name,
    instructor_subscribers,
    instructor_avatar,
    curriculum,
    created_at
) VALUES
(
    'vid-1',
    'The Evolution of ''Doge'': From Irony to Post-Irony',
    'Trace the lineage of one of the internet''s most enduring templates and understand the layers of ironic detachment.',
    'Memes',
    'Beginner',
    '12:45',
    'Module 1.1',
    'published',
    '14.2k',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCGMqkf28_REAzhs-3ktOCXfVsVQ1-A9D75DMBs03Fm07T4KlD6YdbEvC55pTJyFRQeJKJn_JyZTGiQROyEPBZKsXwTj3SvAkjYaDVY_fjMALK2C0GrCz6imtBbMcSpcvybxzehCLAOVP8XT39n0Fo6tHSrQepg3TBgXRzB2raalHojyzxFnpcNhY7GQtx3_bXdWka1djU47M93k0pYSlMJl4KVUgj1FTV2UAqwNPmMAhY7lFoqDMpX_A',
    'https://www.youtube.com/watch?v=kYJydzP-x_0',
    'Memeology Dept.',
    '1.2M Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA',
    '[
        "2013: Innocent Comic Sans & Kabosu the Shiba",
        "2017: Abstract Doge and Surrealism",
        "2020+: Cheems vs Swole Doge & Crypto Mascot",
        "Classroom Application: How to discuss internet folklore without losing students"
    ]'::jsonb,
    '2024-03-01 00:00:00+00'
),
(
    'vid-2',
    'Decoding Gen Z Slang: Context, Etymology & Safe Usage',
    'A rapid-fire breakdown of current vernacular, regional origins, and how context completely alters meaning.',
    'Slang',
    'Intermediate',
    '08:20',
    'Module 2.3',
    'published',
    '10.5k',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD8w0BosXmsRwR_S1Mho4YSomt_wWLfNbuMumLzgzLKq6hpLZARGnbBCrNk9ZQQzpC2kFS7puH8_KF3iR9_EOo449XXpY4DtAAXNRioyGDLRGn1hsUcnZyul7XpP5-jl1SAS0TCXzw9K_keWVzDoLjoi1q-EQgduyi5vUkcXfJWU1WlRzRg-Na3B9wXycKgg5oyZbaXXTl4NsSkgaRvImOXlDJSmyudQ5TwhXlB4dakSwJdamqRHN2QHg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'Prof. Lingua',
    '840K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw',
    '[
        "Core Terms: ''Rizz'', ''No Cap'', ''Skibidi'', ''Fanum Tax'', ''Crashout''",
        "Tone indicators and digital emotional nuances",
        "Teacher Do''s and Don''ts: Avoiding forced slang",
        "Student Safety: Catching subtle exclusion and dogwhistles"
    ]'::jsonb,
    '2024-03-05 00:00:00+00'
),
(
    'vid-3',
    'Cyberbullying vs. Friendly Banter: The Empathy Matrix',
    'Practical frameworks to identify when meme culture crosses the line from harmless humor into targeted digital harassment.',
    'Culture',
    'Beginner',
    '15:10',
    'Module 3.1',
    'published',
    '18.9k',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Dr. Sophia Vance',
    '620K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw',
    '[
        "Defining Intent vs. Impact in digital text",
        "The bystander effect in Discord and group chats",
        "Roleplay Scenarios: Responding to passive-aggressive memes",
        "Creating inclusive digital learning spaces"
    ]'::jsonb,
    '2024-03-10 00:00:00+00'
),
(
    'vid-4',
    'Meme Rhetoric in Education: Satire, Irony, and Pedagogy',
    'How forward-thinking educators leverage internet satire to enhance student retention and critical analytical skills.',
    'Classroom',
    'Advanced',
    '14:00',
    'Module 4.2',
    'published',
    '7.3k',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUgayW8eGcEd3NHbwVDlpECrSayVBvT-Pdpt9TvK7G1co-SDiYXyUXDVRbpknx0WlLx0HpTvkgpFeh_jqpvvUQwhyMSFFMMUB6SRL0rfWvTGK3jCiR_40n-_R1BELylLXllQA_1oWkN3defrhCUKnenMtp-aFufHV0BFoMKgWy6tXGjNM8ZYCBujml-NWY_HaPze2IOTblCf78qOp7awb58St1NLDNI-jxHZSvQYWNMJNsPVjIjXakKQ',
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    'Dr. Memeology',
    '1.2M Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw',
    '[
        "Classical Rhetoric (Ethos, Pathos, Logos) in Image Macros",
        "Designing meme-based formative assignments",
        "Assessing student understanding without traditional multiple-choice tests",
        "Case Studies: High School AP English & Science implementations"
    ]'::jsonb,
    '2024-03-14 00:00:00+00'
),
(
    'vid-5',
    'The Algorithms of Virality: Why Certain Memes Win',
    'Explore how machine learning feed recommendation engines shape internet humor and cultural transmission.',
    'Technology',
    'Intermediate',
    '11:15',
    'Module 5.1',
    'published',
    '16.1k',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpT3RkWavLP7XqlhVll5RwnD1UV8d-KrfnH4V_VZqGW6sNAjF998qlJIw8RE5iu4zzHuHdQI4-KHWWSBaOqbeVSB4OkuN6ZVqHvAVuyGdNsx3N-SX2P-ceCDi7a1DK5nZyDk2oml1v51AAYdg2ymPRd9RRjeBTf5Ahp4vjYMTIwDaruOvZCSK2TWpCQqgfBt_pV8WcDW9BEuHBgvxAu2bbq70mo9-zky64LDMh5quuAtkpin2WdeBQ',
    'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    'Tech & Culture Lab',
    '950K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw',
    '[
        "Attention Economy: The 3-second retention hook",
        "Audio memetics: How soundbites drive TikTok and Shorts",
        "Algorithmic feedback loops and micro-trends",
        "Ethical implications of algorithmically driven culture"
    ]'::jsonb,
    '2024-03-20 00:00:00+00'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    duration = EXCLUDED.duration,
    module_code = EXCLUDED.module_code,
    status = EXCLUDED.status,
    views = EXCLUDED.views,
    thumbnail_url = EXCLUDED.thumbnail_url,
    video_url = EXCLUDED.video_url,
    instructor_name = EXCLUDED.instructor_name,
    instructor_subscribers = EXCLUDED.instructor_subscribers,
    instructor_avatar = EXCLUDED.instructor_avatar,
    curriculum = EXCLUDED.curriculum;
