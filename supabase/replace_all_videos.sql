-- ==============================================================================
-- Meme Community - Wipe & Replace All Videos with 10 Curated Learning Videos
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Ensure the `videos` table exists
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

DROP POLICY IF EXISTS "Public can view published videos" ON public.videos;
CREATE POLICY "Public can view published videos" ON public.videos
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin and Service Role can manage videos" ON public.videos;
CREATE POLICY "Admin and Service Role can manage videos" ON public.videos
    FOR ALL USING (true) WITH CHECK (true);

-- 2. Clear all existing video records
DELETE FROM public.videos;

-- 3. Insert the 10 Curated Educational Video Modules
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
    'CTRL + LOL: Using memes to teach and reach your learners',
    'Memes often capture attention in ways that written comments cannot. This webinar session shows you how to use them for feedback that students actually read and remember. We''ll look at how to address common learning mistakes through memes that make the point without feeling harsh. You''ll learn when meme feedback works well and when traditional comments are better, explore quick meme-making tools, and start building a reusable collection for your courses. The goal is better communication with students, not just adding jokes to grading.',
    'Classroom',
    'Beginner',
    '45:20',
    'Module 1.1',
    'published',
    '24.8k',
    'https://i.ytimg.com/an_webp/nrTC2l3MYVk/mqdefault_6s.webp?du=3000&sqp=CJXKgtQG&rs=AOn4CLAM905utnlycVie7OHvxq-nLuD6_g',
    'https://www.youtube.com/watch?v=nrTC2l3MYVk',
    'Dr. Memeology',
    '1.2M Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw',
    '[
        "Meme feedback vs traditional grading comments",
        "Addressing learning mistakes without harsh tone",
        "Building a reusable meme collection for your LMS",
        "Classroom communication strategies"
    ]'::jsonb,
    '2024-03-01 00:00:00+00'
),
(
    'vid-2',
    'What is a Compiler? 🤔 | Explained with Memes 😂',
    'Uses quick, visual meme formats to directly explain what a compiler does in computer science and how it translates code into a language machines understand.',
    'Technology',
    'Beginner',
    '04:15',
    'Module 1.2',
    'published',
    '18.2k',
    'https://img.youtube.com/vi/Pi5r0fEZoS8/hqdefault.jpg',
    'https://www.youtube.com/watch?v=Pi5r0fEZoS8',
    'CodeMemes Lab',
    '450K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw',
    '[
        "High-level source code vs Machine binary",
        "Compilation steps: Lexical analysis, Parsing, Optimization",
        "Why syntax errors happen (and the memes that explain them)"
    ]'::jsonb,
    '2024-03-03 00:00:00+00'
),
(
    'vid-3',
    '3 FUNNY History Facts You Won’t Believe',
    'Teaches obscure and funny historical events by pairing the factual history with modern meme templates to perfectly describe the situations.',
    'Culture',
    'Beginner',
    '03:45',
    'Module 1.3',
    'published',
    '31.5k',
    'https://img.youtube.com/vi/qk3rjG-dc_k/hqdefault.jpg',
    'https://www.youtube.com/watch?v=qk3rjG-dc_k',
    'History Buffs',
    '890K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw',
    '[
        "Fact 1: The Great Emu War of 1932",
        "Fact 2: Medieval battle tactics & miscommunications",
        "Fact 3: Strange royal treaties and comedic blunders"
    ]'::jsonb,
    '2024-03-05 00:00:00+00'
),
(
    'vid-4',
    'Science Memes',
    'A compilation of science memes that cleverly explain complex biology, chemistry, and physics concepts through visual humor—the memes themselves deliver the scientific punchline.',
    'Memes',
    'Intermediate',
    '06:30',
    'Module 2.1',
    'published',
    '42.1k',
    'https://img.youtube.com/vi/ZO53RSN2OqM/hqdefault.jpg',
    'https://www.youtube.com/watch?v=ZO53RSN2OqM',
    'StemMemes Lab',
    '1.1M Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA',
    '[
        "Physics: Gravity, relativity, and quantum mechanics memes",
        "Chemistry: Organic chemistry reaction memes",
        "Biology: Genetics and cellular respiration humor"
    ]'::jsonb,
    '2024-03-08 00:00:00+00'
),
(
    'vid-5',
    'Science Memes (STEM Concepts)',
    'Focuses on STEM subjects, using popular internet image macros and video edits to illustrate scientific laws and anatomical facts in a highly visual way that is easy to memorize.',
    'Foundations',
    'Intermediate',
    '07:15',
    'Module 2.2',
    'published',
    '28.4k',
    'https://img.youtube.com/vi/ykkoLeBKjXs/hqdefault.jpg',
    'https://www.youtube.com/watch?v=ykkoLeBKjXs',
    'StemMemes Lab',
    '1.1M Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA',
    '[
        "Engineering laws: Torque, stress, and strain visual aids",
        "Anatomy: Neurological pathways and reflex arcs",
        "Mathematical proofs via meme formats"
    ]'::jsonb,
    '2024-03-10 00:00:00+00'
),
(
    'vid-6',
    'Memes That Broke the Grammar',
    'Teaches English grammar rules by showcasing hilarious examples of catastrophic grammar found in memes online, actively demonstrating the importance of syntax, spelling, and punctuation.',
    'Slang',
    'Beginner',
    '08:40',
    'Module 2.3',
    'published',
    '39.0k',
    'https://img.youtube.com/vi/Uq_vnEMM1xA/hqdefault.jpg',
    'https://www.youtube.com/watch?v=Uq_vnEMM1xA',
    'Prof. Lingua',
    '840K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw',
    '[
        "The Oxford Comma: Why it saves lives in memes",
        "Homophones: They''re, Their, and There catastrophic errors",
        "Dangling modifiers and humorous ambiguities",
        "How to use memes to teach sentence structure"
    ]'::jsonb,
    '2024-03-12 00:00:00+00'
),
(
    'vid-7',
    'History Memes (World History)',
    'A rapid-fire collection of historical scenarios contextualized entirely by modern meme formats, making complex historical timelines and geopolitical relationships easier to grasp for visual learners.',
    'Culture',
    'Intermediate',
    '05:50',
    'Module 3.1',
    'published',
    '22.7k',
    'https://img.youtube.com/vi/nuvLxgYfsoo/hqdefault.jpg',
    'https://www.youtube.com/watch?v=nuvLxgYfsoo',
    'History Buffs',
    '890K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw',
    '[
        "Ancient civilizations: Rome, Greece, and Egypt",
        "The Age of Exploration & Trade routes",
        "World Wars: Alliances, treaties, and diplomatic maneuvers"
    ]'::jsonb,
    '2024-03-15 00:00:00+00'
),
(
    'vid-8',
    'Science Memes (Thermodynamics & Cells)',
    'Another educational compilation that relies on core scientific principles (like thermodynamics and cellular biology) to deliver the humor, effectively drilling real STEM facts into the viewer''s memory.',
    'Foundations',
    'Advanced',
    '09:10',
    'Module 3.2',
    'published',
    '19.3k',
    'https://img.youtube.com/vi/lSJP5z5S8T4/hqdefault.jpg',
    'https://www.youtube.com/watch?v=lSJP5z5S8T4',
    'StemMemes Lab',
    '1.1M Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA',
    '[
        "First & Second Laws of Thermodynamics explained with memes",
        "Entropy: Why your room and the universe tend toward disorder",
        "Mitochondria: The Powerhouse of the Cell and beyond"
    ]'::jsonb,
    '2024-03-18 00:00:00+00'
),
(
    'vid-9',
    'Science Memes (Chemistry Reactions)',
    'Uses relatable meme formats to visually describe complex physical laws and chemical reactions, substituting dry textbook diagrams with internet humor to teach the curriculum.',
    'Memes',
    'Intermediate',
    '06:45',
    'Module 3.3',
    'published',
    '26.1k',
    'https://img.youtube.com/vi/rWBnA8lEYi0/hqdefault.jpg',
    'https://www.youtube.com/watch?v=rWBnA8lEYi0',
    'StemMemes Lab',
    '1.1M Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA',
    '[
        "Exothermic vs Endothermic reactions",
        "Noble gases: The aloof elements of the Periodic Table",
        "Acid-base titrations and indicator color shifts"
    ]'::jsonb,
    '2024-03-20 00:00:00+00'
),
(
    'vid-10',
    'DOM vs BOM 🔥 JavaScript Explained with Memes!',
    'Uses clever internet humor to clearly teach the difference between the Document Object Model (DOM) and the Browser Object Model (BOM) in JavaScript. The memes act as a visual aid to help you remember how different parts of a browser''s architecture interact with your code.',
    'Technology',
    'Intermediate',
    '08:05',
    'Module 4.1',
    'published',
    '35.6k',
    'https://img.youtube.com/vi/v2cUJ3gkuEg/hqdefault.jpg',
    'https://www.youtube.com/watch?v=v2cUJ3gkuEg',
    'CodeMemes Lab',
    '450K Scholars',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw',
    '[
        "Document Object Model (DOM): Nodes, Elements, Tree Structure",
        "Browser Object Model (BOM): window, navigator, history, location",
        "Event listeners and DOM manipulation best practices"
    ]'::jsonb,
    '2024-03-22 00:00:00+00'
);
