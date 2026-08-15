export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  total_votes: number;
  user_voted_option?: string;
}

export interface SlangBreakdownItem {
  term: string;
  definition: string;
  for_teachers: string;
}

export interface CommentItem {
  id: string;
  post_id: string;
  author_name: string;
  author_handle: string;
  author_avatar: string;
  author_role?: "student" | "educator" | "admin";
  content: string;
  likes_count: number;
  is_liked?: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  author_id?: string;
  author_name: string;
  author_handle: string;
  author_avatar: string;
  author_role: "student" | "educator" | "admin";
  author_bio?: string;
  author_followers?: number;
  is_following_author?: boolean;
  is_verified?: boolean;
  content: string;
  image_url?: string;
  video_url?: string;
  category?: string;
  slang_tags?: string[];
  slang_breakdown?: SlangBreakdownItem[];
  poll?: Poll;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  bookmarks_count: number;
  created_at: string;
  is_liked?: boolean;
  is_bookmarked?: boolean;
  is_reposted?: boolean;
  is_pinned?: boolean;
  comments?: CommentItem[];
}

export interface LearningVideo {
  id: string;
  title: string;
  description: string;
  category: "Foundations" | "Slang" | "Memes" | "Culture" | "Advanced" | "Classroom" | "Technology" | string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  module_code: string;
  status: "published" | "draft";
  views: string;
  thumbnail_url: string;
  video_url?: string;
  instructor_name: string;
  instructor_subscribers: string;
  instructor_avatar: string;
  curriculum?: string[];
  created_at: string;
}

export interface MemeTrend {
  id: string;
  title: string;
  category: string;
  trend_status: "Trending Up" | "Peaking" | "Niche Rising";
  image_url: string;
  description: string;
  origin?: string;
  slang_terms?: string[];
  cultural_context?: string;
  teacher_tips?: string;
  student_notes?: string;
  source_url?: string;
  is_ai_explained: boolean;
  created_at: string;
}

export interface MemeReport {
  id: string;
  post_id?: string;
  trend_name: string;
  reported_by?: string;
  reported_by_role?: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  display_name?: string;
  email: string;
  role: "student" | "educator" | "admin";
  avatar_url: string;
  is_active: boolean;
  bio?: string;
  followers_count: number;
  following_count: number;
  following_handles?: string[];
  bookmarked_post_ids?: string[];
  liked_post_ids?: string[];
  created_at: string;
}

// Clean initial starter posts representing each role type
export const INITIAL_POSTS: Post[] = [
  {
    id: "post-welcome-1",
    author_id: "u-1",
    author_name: "Dr. Memeology",
    author_handle: "@philosopher_king",
    author_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    author_role: "educator",
    author_bio: "Professor of Digital Media & Memetic Philosophy. Bridging academic rigor and internet culture.",
    author_followers: 1420,
    is_following_author: false,
    is_verified: true,
    is_pinned: true,
    content: "Welcome to Meme Community! 🎉\n\nThis platform connects students and educators through shared meme literacy. Feel free to post memes, vote on polls, and use the AI Slang Decoder to decode modern internet slang for classroom contexts.",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUgayW8eGcEd3NHbwVDlpECrSayVBvT-Pdpt9TvK7G1co-SDiYXyUXDVRbpknx0WlLx0HpTvkgpFeh_jqpvvUQwhyMSFFMMUB6SRL0rfWvTGK3jCiR_40n-_R1BELylLXllQA_1oWkN3defrhCUKnenMtp-aFufHV0BFoMKgWy6tXGjNM8ZYCBujml-NWY_HaPze2IOTblCf78qOp7awb58St1NLDNI-jxHZSvQYWNMJNsPVjIjXakKQ",
    category: "Philosophy",
    slang_tags: ["Welcome", "MemeTheory", "Classroom"],
    slang_breakdown: [
      {
        term: "Meme Literacy",
        definition: "The ability to critically understand, interpret, and contextualize viral internet formats.",
        for_teachers: "Use as a tool for teaching satire, rhetoric, and media analysis."
      }
    ],
    poll: {
      id: "poll-welcome",
      question: "Teachers: How often do you encounter slang in homework or class discussions?",
      options: [
        { id: "opt-1", text: "Every single day (Rizz, No Cap, Brainrot)", votes: 34 },
        { id: "opt-2", text: "A few times a week", votes: 21 },
        { id: "opt-3", text: "Rarely / Only in hallways", votes: 8 },
        { id: "opt-4", text: "I speak fluent slang myself 😎", votes: 15 }
      ],
      total_votes: 78,
    },
    likes_count: 58,
    comments_count: 1,
    shares_count: 12,
    bookmarks_count: 9,
    created_at: "Just now",
    is_liked: false,
    is_bookmarked: false,
    is_reposted: false,
    comments: [
      {
        id: "c-welcome-1",
        post_id: "post-welcome-1",
        author_name: "Alex",
        author_handle: "@anon_lurker",
        author_role: "student",
        author_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
        content: "Excited to share our study group memes here!",
        likes_count: 4,
        is_liked: false,
        created_at: "Just now"
      }
    ]
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: "u-admin-main",
    username: "@admin",
    display_name: "Super Admin",
    email: "admin@admin.admin",
    role: "admin",
    avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw",
    is_active: true,
    bio: "Head Administrator & Platform Director for Meme Community.",
    followers_count: 5000,
    following_count: 10,
    following_handles: ["@philosopher_king", "@anon_lurker"],
    bookmarked_post_ids: [],
    liked_post_ids: [],
    created_at: "2023-01-01"
  },
  {
    id: "u-1",
    username: "@philosopher_king",
    display_name: "Dr. Memeology",
    email: "teacher@memecommunity.edu",
    role: "educator",
    avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    is_active: true,
    bio: "Teaching cultural literacy through viral internet phenomena. High School AP Lit teacher.",
    followers_count: 1420,
    following_count: 12,
    following_handles: ["@admin"],
    bookmarked_post_ids: [],
    liked_post_ids: [],
    created_at: "2024-01-15"
  },
  {
    id: "u-2",
    username: "@anon_lurker",
    display_name: "Alex",
    email: "student@memecommunity.edu",
    role: "student",
    avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    is_active: true,
    bio: "Student exploring memes and STEM coursework.",
    followers_count: 85,
    following_count: 34,
    following_handles: ["@philosopher_king"],
    bookmarked_post_ids: [],
    liked_post_ids: [],
    created_at: "2024-02-01"
  }
];

export const INITIAL_VIDEOS: LearningVideo[] = [
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

export const INITIAL_MEME_TRENDS: MemeTrend[] = [
  {
    id: "trend-1",
    title: "The Corporate Void",
    category: "Workplace & Tech Culture",
    trend_status: "Trending Up",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuDg_HiECfLPYtI7JjUxN0mLnczGreCwu_t88pCijTYlkt1MSTVmm2hJfSlUBAP2YM2Dx4gwq4BVUSfVVKlW34B6tFqcT0rNzrbwXNLtCZK4yphDVwQoj3_T9ovxxKrKTzoo1gdK7Wd-Wz760bylciO2-IE_CVQ5_q0V_7aNx7TwONpvRR5R92BVDxZ_01q3LTPWmhJKxWeHijYVDdmHydjQ_iyD4h48dUq7vHsj8ZouihltMftETXRg",
    description: "Originating from tech layoff anxiety, this meme juxtaposes hyper-corporate jargon ('synergize synergies') with existential dread.",
    origin: "Emerged in late 2023 across tech student and internship satire pages.",
    slang_terms: ["Corporate Speak", "Quiet Quitting", "Circle Back"],
    cultural_context: "Students use this to satirize the high expectations and sterile language of modern career tracks.",
    teacher_tips: "Use when teaching business writing or satire. Acknowledge the humor in corporate buzzwords to build rapport.",
    student_notes: "A safe, relatable way to vent about homework deadlines and career stress.",
    is_ai_explained: true,
    created_at: "2024-03-12"
  }
];

export const INITIAL_MEME_REPORTS: MemeReport[] = [
  {
    id: "rep-1",
    trend_name: "Post ID: #post-welcome-1",
    reason: "Quality Check for School Safety",
    reported_by: "@anon_lurker",
    reported_by_role: "student",
    status: "pending",
    created_at: "2h ago"
  }
];
