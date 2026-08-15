const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const ALL_VIDEOS = [
  {
    id: "vid-1",
    title: "CTRL + LOL: Using memes to teach and reach your learners",
    description: "Memes often capture attention in ways that written comments cannot. This webinar session shows you how to use them for feedback that students actually read and remember. We'll look at how to address common learning mistakes through memes that make the point without feeling harsh. You'll learn when meme feedback works well and when traditional comments are better, explore quick meme-making tools, and start building a reusable collection for your courses. The goal is better communication with students, not just adding jokes to grading.",
    category: "Classroom",
    level: "Beginner",
    duration: "45:20",
    module_code: "Module 1.1",
    status: "published",
    views: "24.8k",
    thumbnail_url: "https://i.ytimg.com/an_webp/nrTC2l3MYVk/mqdefault_6s.webp?du=3000&sqp=CJXKgtQG&rs=AOn4CLAM905utnlycVie7OHvxq-nLuD6_g",
    video_url: "https://www.youtube.com/watch?v=nrTC2l3MYVk",
    instructor_name: "Dr. Memeology",
    instructor_subscribers: "1.2M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "Meme feedback vs traditional grading comments",
      "Addressing learning mistakes without harsh tone",
      "Building a reusable meme collection for your LMS",
      "Classroom communication strategies"
    ],
    created_at: "2024-03-01"
  },
  {
    id: "vid-2",
    title: "What is a Compiler? 🤔 | Explained with Memes 😂",
    description: "Uses quick, visual meme formats to directly explain what a compiler does in computer science and how it translates code into a language machines understand.",
    category: "Technology",
    level: "Beginner",
    duration: "04:15",
    module_code: "Module 1.2",
    status: "published",
    views: "18.2k",
    thumbnail_url: "https://img.youtube.com/vi/Pi5r0fEZoS8/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=Pi5r0fEZoS8",
    instructor_name: "CodeMemes Lab",
    instructor_subscribers: "450K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw",
    curriculum: [
      "High-level source code vs Machine binary",
      "Compilation steps: Lexical analysis, Parsing, Optimization",
      "Why syntax errors happen (and the memes that explain them)"
    ],
    created_at: "2024-03-03"
  },
  {
    id: "vid-3",
    title: "3 FUNNY History Facts You Won’t Believe",
    description: "Teaches obscure and funny historical events by pairing the factual history with modern meme templates to perfectly describe the situations.",
    category: "Culture",
    level: "Beginner",
    duration: "03:45",
    module_code: "Module 1.3",
    status: "published",
    views: "31.5k",
    thumbnail_url: "https://img.youtube.com/vi/qk3rjG-dc_k/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=qk3rjG-dc_k",
    instructor_name: "History Buffs",
    instructor_subscribers: "890K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    curriculum: [
      "Fact 1: The Great Emu War of 1932",
      "Fact 2: Medieval battle tactics & miscommunications",
      "Fact 3: Strange royal treaties and comedic blunders"
    ],
    created_at: "2024-03-05"
  },
  {
    id: "vid-4",
    title: "Science Memes",
    description: "A compilation of science memes that cleverly explain complex biology, chemistry, and physics concepts through visual humor—the memes themselves deliver the scientific punchline.",
    category: "Memes",
    level: "Intermediate",
    duration: "06:30",
    module_code: "Module 2.1",
    status: "published",
    views: "42.1k",
    thumbnail_url: "https://img.youtube.com/vi/ZO53RSN2OqM/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=ZO53RSN2OqM",
    instructor_name: "StemMemes Lab",
    instructor_subscribers: "1.1M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
    curriculum: [
      "Physics: Gravity, relativity, and quantum mechanics memes",
      "Chemistry: Organic chemistry reaction memes",
      "Biology: Genetics and cellular respiration humor"
    ],
    created_at: "2024-03-08"
  },
  {
    id: "vid-5",
    title: "Science Memes (STEM Concepts)",
    description: "Focuses on STEM subjects, using popular internet image macros and video edits to illustrate scientific laws and anatomical facts in a highly visual way that is easy to memorize.",
    category: "Foundations",
    level: "Intermediate",
    duration: "07:15",
    module_code: "Module 2.2",
    status: "published",
    views: "28.4k",
    thumbnail_url: "https://img.youtube.com/vi/ykkoLeBKjXs/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=ykkoLeBKjXs",
    instructor_name: "StemMemes Lab",
    instructor_subscribers: "1.1M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
    curriculum: [
      "Engineering laws: Torque, stress, and strain visual aids",
      "Anatomy: Neurological pathways and reflex arcs",
      "Mathematical proofs via meme formats"
    ],
    created_at: "2024-03-10"
  },
  {
    id: "vid-6",
    title: "Memes That Broke the Grammar",
    description: "Teaches English grammar rules by showcasing hilarious examples of catastrophic grammar found in memes online, actively demonstrating the importance of syntax, spelling, and punctuation.",
    category: "Slang",
    level: "Beginner",
    duration: "08:40",
    module_code: "Module 2.3",
    status: "published",
    views: "39.0k",
    thumbnail_url: "https://img.youtube.com/vi/Uq_vnEMM1xA/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=Uq_vnEMM1xA",
    instructor_name: "Prof. Lingua",
    instructor_subscribers: "840K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "The Oxford Comma: Why it saves lives in memes",
      "Homophones: They're, Their, and There catastrophic errors",
      "Dangling modifiers and humorous ambiguities",
      "How to use memes to teach sentence structure"
    ],
    created_at: "2024-03-12"
  },
  {
    id: "vid-7",
    title: "History Memes (World History)",
    description: "A rapid-fire collection of historical scenarios contextualized entirely by modern meme formats, making complex historical timelines and geopolitical relationships easier to grasp for visual learners.",
    category: "Culture",
    level: "Intermediate",
    duration: "05:50",
    module_code: "Module 3.1",
    status: "published",
    views: "22.7k",
    thumbnail_url: "https://img.youtube.com/vi/nuvLxgYfsoo/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=nuvLxgYfsoo",
    instructor_name: "History Buffs",
    instructor_subscribers: "890K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    curriculum: [
      "Ancient civilizations: Rome, Greece, and Egypt",
      "The Age of Exploration & Trade routes",
      "World Wars: Alliances, treaties, and diplomatic maneuvers"
    ],
    created_at: "2024-03-15"
  },
  {
    id: "vid-8",
    title: "Science Memes (Thermodynamics & Cells)",
    description: "Another educational compilation that relies on core scientific principles (like thermodynamics and cellular biology) to deliver the humor, effectively drilling real STEM facts into the viewer's memory.",
    category: "Foundations",
    level: "Advanced",
    duration: "09:10",
    module_code: "Module 3.2",
    status: "published",
    views: "19.3k",
    thumbnail_url: "https://img.youtube.com/vi/lSJP5z5S8T4/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=lSJP5z5S8T4",
    instructor_name: "StemMemes Lab",
    instructor_subscribers: "1.1M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
    curriculum: [
      "First & Second Laws of Thermodynamics explained with memes",
      "Entropy: Why your room and the universe tend toward disorder",
      "Mitochondria: The Powerhouse of the Cell and beyond"
    ],
    created_at: "2024-03-18"
  },
  {
    id: "vid-9",
    title: "Science Memes (Chemistry Reactions)",
    description: "Uses relatable meme formats to visually describe complex physical laws and chemical reactions, substituting dry textbook diagrams with internet humor to teach the curriculum.",
    category: "Memes",
    level: "Intermediate",
    duration: "06:45",
    module_code: "Module 3.3",
    status: "published",
    views: "26.1k",
    thumbnail_url: "https://img.youtube.com/vi/rWBnA8lEYi0/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=rWBnA8lEYi0",
    instructor_name: "StemMemes Lab",
    instructor_subscribers: "1.1M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
    curriculum: [
      "Exothermic vs Endothermic reactions",
      "Noble gases: The aloof elements of the Periodic Table",
      "Acid-base titrations and indicator color shifts"
    ],
    created_at: "2024-03-20"
  },
  {
    id: "vid-10",
    title: "DOM vs BOM 🔥 JavaScript Explained with Memes!",
    description: "Uses clever internet humor to clearly teach the difference between the Document Object Model (DOM) and the Browser Object Model (BOM) in JavaScript. The memes act as a visual aid to help you remember how different parts of a browser's architecture interact with your code.",
    category: "Technology",
    level: "Intermediate",
    duration: "08:05",
    module_code: "Module 4.1",
    status: "published",
    views: "35.6k",
    thumbnail_url: "https://img.youtube.com/vi/v2cUJ3gkuEg/hqdefault.jpg",
    video_url: "https://www.youtube.com/watch?v=v2cUJ3gkuEg",
    instructor_name: "CodeMemes Lab",
    instructor_subscribers: "450K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw",
    curriculum: [
      "Document Object Model (DOM): Nodes, Elements, Tree Structure",
      "Browser Object Model (BOM): window, navigator, history, location",
      "Event listeners and DOM manipulation best practices"
    ],
    created_at: "2024-03-22"
  },
  {
    id: "vid-11",
    title: "Chill Guy: The Psychology of Unbothered Stoicism in Youth Culture",
    description: "Explore why the 'Chill Guy' cartoon became a defining viral mantra. Analyzes the cultural pivot from hyper-performative hustle culture to unbothered emotional resilience and modern stoicism.",
    category: "Memes",
    level: "Beginner",
    duration: "11:20",
    module_code: "Module 5.1",
    status: "published",
    views: "58.2k",
    thumbnail_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=kYJydzP-x_0",
    instructor_name: "Dr. Memeology",
    instructor_subscribers: "1.2M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "Origins: Phil Banks illustration and viral TikTok audio adoption",
      "Socio-Emotional Analysis: Why students resonate with 'unbothered' personas",
      "Classroom Discussion: Stoicism vs healthy emotional expression"
    ],
    created_at: "2024-04-01"
  },
  {
    id: "vid-12",
    title: "Brat Summer & Chaotic Authenticity: Deconstructing the Anti-Perfection Trend",
    description: "How the Brat aesthetic shifted digital marketing and visual design. We dissect why lime-green minimalism and raw, imperfect authenticity conquered algorithmic feeds.",
    category: "Culture",
    level: "Intermediate",
    duration: "14:40",
    module_code: "Module 5.2",
    status: "published",
    views: "64.7k",
    thumbnail_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    instructor_name: "Prof. Lingua",
    instructor_subscribers: "840K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "Color Psychology: Why low-contrast lime green broke visual clutter",
      "The death of curated millennial aesthetics in favor of Gen Z raw media",
      "Case Study: Political campaigns and global brands adopting Brat typography"
    ],
    created_at: "2024-04-05"
  },
  {
    id: "vid-13",
    title: "The Anatomy of Brainrot: Dadaism, Absurdism, and Short-Form Lore",
    description: "From 'Skibidi' and 'Fanum Tax' to 'Totr', analyze how the 5-second attention loop gave birth to modern internet Dadaism. Features sociolinguistic and cognitive retention research.",
    category: "Slang",
    level: "Advanced",
    duration: "16:15",
    module_code: "Module 5.3",
    status: "published",
    views: "82.0k",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    instructor_name: "Dr. Sophia Vance",
    instructor_subscribers: "620K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    curriculum: [
      "The 1920 Dadaist Art Movement vs 2020s Absurdist Micro-Videos",
      "Semantic Bleaching: How slang words lose literal meaning and gain social tone",
      "Teacher Guidance: Addressing Brainrot jargon in student writing"
    ],
    created_at: "2024-04-08"
  },
  {
    id: "vid-14",
    title: "Aura Farming & Points: Gamification of Social Capital",
    description: "Breaking down the '+10,000 Aura / -5,000 Aura' sensation. How digital gaming metrics migrated into everyday adolescent social hierarchies and conversational banter.",
    category: "Culture",
    level: "Beginner",
    duration: "09:35",
    module_code: "Module 6.1",
    status: "published",
    views: "49.5k",
    thumbnail_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=Pi5r0fEZoS8",
    instructor_name: "Tech & Culture Lab",
    instructor_subscribers: "950K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw",
    curriculum: [
      "Game mechanics in real-life: How RPG stats influenced social status",
      "The humor of losing Aura: Self-deprecating comedy and humility",
      "Positive classroom reinforcement through mock Aura points"
    ],
    created_at: "2024-04-12"
  },
  {
    id: "vid-15",
    title: "The '6-7' Phenomenon: Phatic Communication in Digital Slang",
    description: "Why did an arbitrary number pair become Word of the Year? We explore Phatic Linguistic Theory—words whose primary function is establishing emotional connection rather than conveying literal facts.",
    category: "Slang",
    level: "Advanced",
    duration: "12:50",
    module_code: "Module 6.2",
    status: "published",
    views: "37.8k",
    thumbnail_url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=Uq_vnEMM1xA",
    instructor_name: "Prof. Lingua",
    instructor_subscribers: "840K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "Linguistic theory: Phatic tokens vs Lexical definitions",
      "TikTok algorithm soundbite feedback mechanics",
      "Understanding student in-jokes without feeling excluded"
    ],
    created_at: "2024-04-15"
  },
  {
    id: "vid-16",
    title: "Lookalike Competitions: When Digital Memes Become Real-Life Gatherings",
    description: "From the Timothée Chalamet lookalike contest in Washington Square Park to global imitator meetups, examine how irony-fueled online memes are reversing digital isolation by driving offline community events.",
    category: "Culture",
    level: "Intermediate",
    duration: "13:10",
    module_code: "Module 6.3",
    status: "published",
    views: "45.3k",
    thumbnail_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=qk3rjG-dc_k",
    instructor_name: "History Buffs",
    instructor_subscribers: "890K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    curriculum: [
      "The 'Flash Mob 2.0': How algorithmic coordination drives IRL gatherings",
      "Costume satire, public performance art, and spontaneous community",
      "Engaging students in participatory public projects"
    ],
    created_at: "2024-04-18"
  },
  {
    id: "vid-17",
    title: "The Costco Guys: Family Influencing & Retail Absurdism",
    description: "How a father-son duo turning warehouse bulk shopping into catchphrase theatre ('Five Big Booms!') redefined wholesome algorithmic virality and retail consumerist satire.",
    category: "Memes",
    level: "Beginner",
    duration: "08:45",
    module_code: "Module 7.1",
    status: "published",
    views: "51.9k",
    thumbnail_url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=ZO53RSN2OqM",
    instructor_name: "Dr. Memeology",
    instructor_subscribers: "1.2M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "The 'Wholesome Anti-Hero': Why hyper-earnest content cuts through cynicism",
      "Catchphrase mechanics and acoustic repetition on TikTok",
      "Using food and retail memes to teach economics and consumer marketing"
    ],
    created_at: "2024-04-20"
  },
  {
    id: "vid-18",
    title: "Jet2Holiday Subversions: Audio Juxtaposition & Disaster Comedy",
    description: "Dissecting the trend of taking cheerful vacation commercial jingles and pairing them with chaotic life failures. Explores dramatic irony and audiovisual cognitive dissonance.",
    category: "Memes",
    level: "Intermediate",
    duration: "10:15",
    module_code: "Module 7.2",
    status: "published",
    views: "33.4k",
    thumbnail_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=nuvLxgYfsoo",
    instructor_name: "StemMemes Lab",
    instructor_subscribers: "1.1M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
    curriculum: [
      "Cognitive dissonance: Happy audio layered over unfortunate situations",
      "Irony as an emotional coping mechanism for modern challenges",
      "Sound design and media editing pedagogy"
    ],
    created_at: "2024-04-22"
  },
  {
    id: "vid-19",
    title: "Labubu & Ugly-Cute Aesthetics: The Psychology of Modern Status Symbols",
    description: "Why did a toothy plush monster explode into a luxury collectible status symbol? We investigate the 'Kimo-Kawaii' (ugly-cute) psychological attraction and FOMO influencer economics.",
    category: "Culture",
    level: "Intermediate",
    duration: "12:00",
    module_code: "Module 7.3",
    status: "published",
    views: "56.8k",
    thumbnail_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=lSJP5z5S8T4",
    instructor_name: "Dr. Sophia Vance",
    instructor_subscribers: "620K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    curriculum: [
      "K-Pop cross-pollination: Lisa (BLACKPINK) and organic celebrity virality",
      "The 'Ugly-Cute' psychology: Flawed character design and emotional attachment",
      "Artificial scarcity, blind box consumerism, and youth trends"
    ],
    created_at: "2024-04-25"
  },
  {
    id: "vid-20",
    title: "FOOH & Synthetic Media: Dissecting Fake-Out-Of-Home & AI Hyper-Realism",
    description: "Giant 3D digital objects walking down city streets: how CGI and Generative AI marketing tricks users into double-taking, and how media literacy protects students from synthetic misinformation.",
    category: "Technology",
    level: "Advanced",
    duration: "15:30",
    module_code: "Module 8.1",
    status: "published",
    views: "68.0k",
    thumbnail_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    video_url: "https://www.youtube.com/watch?v=v2cUJ3gkuEg",
    instructor_name: "Tech & Culture Lab",
    instructor_subscribers: "950K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw",
    curriculum: [
      "Defining FOOH: Blurring the boundary between real geography and CGI",
      "Critical Media Literacy: 5 signs a viral video spectacle is synthetic",
      "Teaching deepfake awareness and digital evidence evaluation"
    ],
    created_at: "2024-04-28"
  }
];

const ALL_TRENDS = [
  {
    id: "trend-chill-guy",
    title: "Chill Guy",
    category: "Pop Culture & Stoicism",
    trend_status: "Trending Up",
    image_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
    description: "The cartoon dog in a sweater with hands in pockets representing a relaxed, unbothered approach to chaotic life events.",
    origin: "Phil Banks character illustration adopted on TikTok/Reels.",
    slang_terms: ["Chill Guy", "Unbothered", "Low Stress", "Stoic"],
    cultural_context: "Students embrace this as a humorous rejection of performative stress and academic burnout.",
    teacher_tips: "Great for icebreaker discussions on coping mechanisms and prioritizing mental well-being.",
    student_notes: "A fun, harmless format for group study humor.",
    is_ai_explained: true,
    created_at: "2024-04-01"
  },
  {
    id: "trend-brat",
    title: "Brat Summer",
    category: "Aesthetics & Culture",
    trend_status: "Peak Viral",
    image_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
    description: "Lime-green, low-fidelity, unpolished aesthetic celebrating messy authenticity over curated perfectionism.",
    origin: "Charli XCX 2024 album launch and viral TikTok design wave.",
    slang_terms: ["Brat", "365", "Chaotic", "Authentic"],
    cultural_context: "Signifies a generational shift away from high-gloss social media feeds toward raw self-expression.",
    teacher_tips: "Use to teach branding, color theory, and the evolution of digital minimalism.",
    student_notes: "Keep references constructive and respectful in school contexts.",
    is_ai_explained: true,
    created_at: "2024-04-05"
  },
  {
    id: "trend-aura",
    title: "Aura Points (+10,000 / -5,000 Aura)",
    category: "Slang & Vernacular",
    trend_status: "Trending Up",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    description: "Gamified social currency where embarrassing blunders lose Aura and smooth accomplishments gain Aura.",
    origin: "Football / basketball highlight edits transferred into everyday school situations.",
    slang_terms: ["Aura", "Aura Farming", "+1000", "-5000"],
    cultural_context: "Allows students to laugh at their own minor failures with self-deprecating humility.",
    teacher_tips: "Award playful 'Aura points' for insightful answers to boost student participation.",
    student_notes: "Avoid using Aura negatives to single out or exclude peers.",
    is_ai_explained: true,
    created_at: "2024-04-12"
  },
  {
    id: "trend-67",
    title: "The '6-7' Phenomenon",
    category: "Linguistic Vernacular",
    trend_status: "Trending Up",
    image_url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    description: "A viral phatic token used across online channels as a burst of shared energy and group cohesion.",
    origin: "Short-form video audio trends on TikTok/Instagram.",
    slang_terms: ["6-7", "Six-Seven", "Energy", "Phatic"],
    cultural_context: "Exemplifies phatic communication in modern linguistics: words used for social bonding rather than dictionary meaning.",
    teacher_tips: "Use to introduce sociolinguistics and the purpose of greeting rituals across cultures.",
    student_notes: "Harmless in-group bonding phrase.",
    is_ai_explained: true,
    created_at: "2024-04-15"
  },
  {
    id: "trend-corporate-void",
    title: "The Corporate Void",
    category: "Workplace & Tech Culture",
    trend_status: "Trending Up",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuDg_HiECfLPYtI7JjUxN0mLnczGreCwu_t88pCijTYlkt1MSTVmm2hJfSlUBAP2YM2Dx4gwq4BVUSfVVKlW34B6tFqcT0rNzrbwXNLtCZK4yphDVwQoj3_T9ovxxKrKTzoo1gdK7Wd-Wz760bylciO2-IE_CVQ5_q0V_7aNx7TwONpvRR5R92BVDxZ_01q3LTPWmhJKxWeHijYVDdmHydjQ_iyD4h48dUq7vHsj8ZouihltMftETXRg",
    description: "Juxtaposes hyper-corporate jargon ('synergize synergies', 'touch base') with existential dread.",
    origin: "Emerged across tech student and internship satire pages.",
    slang_terms: ["Corporate Speak", "Quiet Quitting", "Circle Back"],
    cultural_context: "Students satirize the sterile language and unrealistic expectations of modern corporate culture.",
    teacher_tips: "Use when teaching business writing and rhetorical satire.",
    student_notes: "A safe, relatable way to vent about heavy workloads.",
    is_ai_explained: true,
    created_at: "2024-03-12"
  }
];

async function syncAll() {
  const vRes = await supabase.storage.from('app-data').upload('videos.json', Buffer.from(JSON.stringify(ALL_VIDEOS, null, 2)), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log('Synced 20 Videos to Supabase Storage:', { path: vRes.data?.path, error: vRes.error });

  const tRes = await supabase.storage.from('app-data').upload('trends.json', Buffer.from(JSON.stringify(ALL_TRENDS, null, 2)), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log('Synced Latest Trends to Supabase Storage:', { path: tRes.data?.path, error: tRes.error });
}

syncAll();
