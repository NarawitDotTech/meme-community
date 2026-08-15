const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SEED_VIDEOS = [
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
  }
];

async function sync10Videos() {
  const { data, error } = await supabase.storage.from('app-data').upload('videos.json', Buffer.from(JSON.stringify(SEED_VIDEOS, null, 2)), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log('Successfully synced 10 educational videos to Supabase Cloud Storage:', { path: data?.path, error });
}

sync10Videos();
