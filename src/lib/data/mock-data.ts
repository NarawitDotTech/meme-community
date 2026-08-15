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
  category: "Foundations" | "Slang" | "Memes" | "Culture" | "Advanced";
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
    title: "The Evolution of 'Doge': From Irony to Post-Irony",
    description: "Trace the lineage of one of the internet's most enduring templates and understand the layers of ironic detachment.",
    category: "Memes",
    level: "Beginner",
    duration: "12:45",
    module_code: "Module 1.1",
    status: "published",
    views: "12.4k",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGMqkf28_REAzhs-3ktOCXfVsVQ1-A9D75DMBs03Fm07T4KlD6YdbEvC55pTJyFRQeJKJn_JyZTGiQROyEPBZKsXwTj3SvAkjYaDVY_fjMALK2C0GrCz6imtBbMcSpcvybxzehCLAOVP8XT39n0Fo6tHSrQepg3TBgXRzB2raalHojyzxFnpcNhY7GQtx3_bXdWka1djU47M93k0pYSlMJl4KVUgj1FTV2UAqwNPmMAhY7lFoqDMpX_A",
    video_url: "https://www.youtube.com/watch?v=kYJydzP-x_0",
    instructor_name: "Memeology Dept.",
    instructor_subscribers: "1.2M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
    curriculum: [
      "2013: Innocent Comic Sans & Kabosu the Shiba",
      "2017: Abstract Doge and Surrealism",
      "2020+: Cheems vs Swole Doge & Crypto Mascot",
      "Classroom Application: How to discuss internet folklore"
    ],
    created_at: "2024-03-01"
  },
  {
    id: "vid-2",
    title: "Decoding Gen Z Slang: Context & Usage",
    description: "A rapid-fire breakdown of current vernacular, regional origins, and how context completely alters meaning.",
    category: "Slang",
    level: "Intermediate",
    duration: "08:20",
    module_code: "Module 2.3",
    status: "published",
    views: "9.8k",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8w0BosXmsRwR_S1Mho4YSomt_wWLfNbuMumLzgzLKq6hpLZARGnbBCrNk9ZQQzpC2kFS7puH8_KF3iR9_EOo449XXpY4DtAAXNRioyGDLRGn1hsUcnZyul7XpP5-jl1SAS0TCXzw9K_keWVzDoLjoi1q-EQgduyi5vUkcXfJWU1WlRzRg-Na3B9wXycKgg5oyZbaXXTl4NsSkgaRvImOXlDJSmyudQ5TwhXlB4dakSwJdamqRHN2QHg",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    instructor_name: "Prof. Lingua",
    instructor_subscribers: "840K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "Terms: 'Rizz', 'No Cap', 'Skibidi', 'Fanum Tax'",
      "Tone indicators and emotional nuance",
      "Teacher Do's and Don'ts: Avoiding forced slang",
      "Student Safety: Catching subtle exclusion patterns"
    ],
    created_at: "2024-03-05"
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
