const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SEED_VIDEOS = [
  {
    id: "vid-1",
    title: "The Evolution of 'Doge': From Irony to Post-Irony",
    description: "Trace the lineage of one of the internet's most enduring templates and understand the layers of ironic detachment.",
    category: "Memes",
    level: "Beginner",
    duration: "12:45",
    module_code: "Module 1.1",
    status: "published",
    views: "14.2k",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGMqkf28_REAzhs-3ktOCXfVsVQ1-A9D75DMBs03Fm07T4KlD6YdbEvC55pTJyFRQeJKJn_JyZTGiQROyEPBZKsXwTj3SvAkjYaDVY_fjMALK2C0GrCz6imtBbMcSpcvybxzehCLAOVP8XT39n0Fo6tHSrQepg3TBgXRzB2raalHojyzxFnpcNhY7GQtx3_bXdWka1djU47M93k0pYSlMJl4KVUgj1FTV2UAqwNPmMAhY7lFoqDMpX_A",
    video_url: "https://www.youtube.com/watch?v=kYJydzP-x_0",
    instructor_name: "Memeology Dept.",
    instructor_subscribers: "1.2M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBelj7BrJI8cTV1RQfXWPDdnAfP4lGYfs5Y0kks60GBMNLhCdyCyaWnsE-f6GA8s9hLezKiU6um7NNQWzn7nBj_WXH28wBMIlZYIVLFKKfIoj7IVYO_zyM4MbTKhxRW7spnNUtd3p8aNA1FtKJVwioNIFBSb_ykel-mDi0PNhp9CgdBMCl8HARsYV-bABqHnXwtjtVMle3mjkGP8EEUSYFCdYtLbfJzxIKxcJ2x-NxVKAZDjOig6HD7OA",
    curriculum: [
      "2013: Innocent Comic Sans & Kabosu the Shiba",
      "2017: Abstract Doge and Surrealism",
      "2020+: Cheems vs Swole Doge & Crypto Mascot",
      "Classroom Application: How to discuss internet folklore without losing students"
    ],
    created_at: "2024-03-01"
  },
  {
    id: "vid-2",
    title: "Decoding Gen Z Slang: Context, Etymology & Safe Usage",
    description: "A rapid-fire breakdown of current vernacular, regional origins, and how context completely alters meaning.",
    category: "Slang",
    level: "Intermediate",
    duration: "08:20",
    module_code: "Module 2.3",
    status: "published",
    views: "10.5k",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8w0BosXmsRwR_S1Mho4YSomt_wWLfNbuMumLzgzLKq6hpLZARGnbBCrNk9ZQQzpC2kFS7puH8_KF3iR9_EOo449XXpY4DtAAXNRioyGDLRGn1hsUcnZyul7XpP5-jl1SAS0TCXzw9K_keWVzDoLjoi1q-EQgduyi5vUkcXfJWU1WlRzRg-Na3B9wXycKgg5oyZbaXXTl4NsSkgaRvImOXlDJSmyudQ5TwhXlB4dakSwJdamqRHN2QHg",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    instructor_name: "Prof. Lingua",
    instructor_subscribers: "840K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "Core Terms: 'Rizz', 'No Cap', 'Skibidi', 'Fanum Tax', 'Crashout'",
      "Tone indicators and digital emotional nuances",
      "Teacher Do's and Don'ts: Avoiding forced slang",
      "Student Safety: Catching subtle exclusion and dogwhistles"
    ],
    created_at: "2024-03-05"
  },
  {
    id: "vid-3",
    title: "Cyberbullying vs. Friendly Banter: The Empathy Matrix",
    description: "Practical frameworks to identify when meme culture crosses the line from harmless humor into targeted digital harassment.",
    category: "Culture",
    level: "Beginner",
    duration: "15:10",
    module_code: "Module 3.1",
    status: "published",
    views: "18.9k",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    instructor_name: "Dr. Sophia Vance",
    instructor_subscribers: "620K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQG5761Gj_1MBYEKsKmG6v1l_xubjpj9-wE-L_U49q7dJp68cPrsiRYMTcguMQzVazkkZ3QTvf3_IL4xj7S4P28uti0ZlZ5FbKzLIGVQiDzEq_91prMzWLNu1LsluA4mtcFAf3xMoM7VVqIfT1bYEXSv89DnIcgjUdvkogngcj1SohZyr9VZqUxibTMxaAljSxN_AoXHG6BTL3K7dvupXfRiZvBaINxwz5fLz5_lyLvyjE5W98E3IYKw",
    curriculum: [
      "Defining Intent vs. Impact in digital text",
      "The bystander effect in Discord and group chats",
      "Roleplay Scenarios: Responding to passive-aggressive memes",
      "Creating inclusive digital learning spaces"
    ],
    created_at: "2024-03-10"
  },
  {
    id: "vid-4",
    title: "Meme Rhetoric in Education: Satire, Irony, and Pedagogy",
    description: "How forward-thinking educators leverage internet satire to enhance student retention and critical analytical skills.",
    category: "Classroom",
    level: "Advanced",
    duration: "14:00",
    module_code: "Module 4.2",
    status: "published",
    views: "7.3k",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUgayW8eGcEd3NHbwVDlpECrSayVBvT-Pdpt9TvK7G1co-SDiYXyUXDVRbpknx0WlLx0HpTvkgpFeh_jqpvvUQwhyMSFFMMUB6SRL0rfWvTGK3jCiR_40n-_R1BELylLXllQA_1oWkN3defrhCUKnenMtp-aFufHV0BFoMKgWy6tXGjNM8ZYCBujml-NWY_HaPze2IOTblCf78qOp7awb58St1NLDNI-jxHZSvQYWNMJNsPVjIjXakKQ",
    video_url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    instructor_name: "Dr. Memeology",
    instructor_subscribers: "1.2M Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    curriculum: [
      "Classical Rhetoric (Ethos, Pathos, Logos) in Image Macros",
      "Designing meme-based formative assignments",
      "Assessing student understanding without traditional multiple-choice tests",
      "Case Studies: High School AP English & Science implementations"
    ],
    created_at: "2024-03-14"
  },
  {
    id: "vid-5",
    title: "The Algorithms of Virality: Why Certain Memes Win",
    description: "Explore how machine learning feed recommendation engines shape internet humor and cultural transmission.",
    category: "Technology",
    level: "Intermediate",
    duration: "11:15",
    module_code: "Module 5.1",
    status: "published",
    views: "16.1k",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZpT3RkWavLP7XqlhVll5RwnD1UV8d-KrfnH4V_VZqGW6sNAjF998qlJIw8RE5iu4zzHuHdQI4-KHWWSBaOqbeVSB4OkuN6ZVqHvAVuyGdNsx3N-SX2P-ceCDi7a1DK5nZyDk2oml1v51AAYdg2ymPRd9RRjeBTf5Ahp4vjYMTIwDaruOvZCSK2TWpCQqgfBt_pV8WcDW9BEuHBgvxAu2bbq70mo9-zky64LDMh5quuAtkpin2WdeBQ",
    video_url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    instructor_name: "Tech & Culture Lab",
    instructor_subscribers: "950K Scholars",
    instructor_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnTEL7t8O_0vf0JSgEv4BnefcIoBxRj6srJ5dq71TVWwvNVmn94lh2dvrc64-W18HWQSI19OmhkaTCkn-dUVERt2u8lJqakIGuLqUQ41VZzzfzMCR5s9eS98NVLITrXngEuU1k4XFJlFSB9u965hFpw_FMejbEDD4Cd8YLSCiXNZNymA7j2exZxOPIptjBvbF7FRZsYX7Hw6sMW_NGSWpdt0tZfLRsj7_MJJUFIoXmmosfgKUtYZYAw",
    curriculum: [
      "Attention Economy: The 3-second retention hook",
      "Audio memetics: How soundbites drive TikTok and Shorts",
      "Algorithmic feedback loops and micro-trends",
      "Ethical implications of algorithmically driven culture"
    ],
    created_at: "2024-03-20"
  }
];

async function syncVideos() {
  const { data, error } = await supabase.storage.from('app-data').upload('videos.json', Buffer.from(JSON.stringify(SEED_VIDEOS, null, 2)), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log('Synced videos to Supabase Cloud Storage:', { path: data?.path, error });
}

syncVideos();
