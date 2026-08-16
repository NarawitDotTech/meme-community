const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testUploadAndDownload() {
  console.log("1. Downloading current posts.json...");
  const { data: dlData, error: dlErr } = await supabase.storage.from('app-data').download('posts.json');
  let posts = [];
  if (!dlErr && dlData) {
    posts = JSON.parse(await dlData.text());
  }
  console.log("Current count:", posts.length);

  console.log("2. Adding new post from Phone A...");
  const newPost = {
    id: `post-${Date.now()}`,
    author_name: "Phone A Tester",
    author_handle: "@phone_a",
    author_avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOB1PHfFe7Ii08nY5KY258LkIJpo5gcfO7WaPYR9NEpQVNFJmdgFVBMtgCxljCyw3X08ktMVsMT9DUkBGv6kse-zg1d1OG0EgVE0OjkKqX8YeHcSIQ295cnK0-JBfAH6BgSPlTTNE1uVaXywZ-BFPBbLi7D29kR-_8aapRHQvBewmr__qJrs2qWmMNLNi6JVXQAFEISJyhHFw2V-L_29MYJ8Xl_KTxCywaToBQPI6NWdGZRJIQlbpvw",
    author_role: "student",
    author_bio: "Student tester",
    author_followers: 1,
    is_following_author: false,
    is_verified: false,
    content: "Live sync test between phones " + new Date().toISOString(),
    category: "Culture",
    slang_tags: ["#sync", "#realtime"],
    likes_count: 0,
    comments_count: 0,
    shares_count: 0,
    bookmarks_count: 0,
    created_at: "Just now",
    is_liked: false,
    is_bookmarked: false,
    is_reposted: false,
    is_pinned: false,
    comments: []
  };

  const updatedPosts = [newPost, ...posts];
  const buffer = Buffer.from(JSON.stringify(updatedPosts, null, 2), 'utf-8');

  console.log("3. Uploading updated posts.json to Supabase Storage...");
  const { data: upData, error: upErr } = await supabase.storage.from('app-data').upload('posts.json', buffer, {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log("Upload result:", { upData, upErr });

  console.log("4. Simulating Phone B download immediately...");
  const { data: bData, error: bErr } = await supabase.storage.from('app-data').download('posts.json');
  const bPosts = JSON.parse(await bData.text());
  console.log(`Phone B fetched ${bPosts.length} posts.`);
  console.log("Is the newest post present?", bPosts[0]?.id === newPost.id ? "YES!" : "NO!");
}

testUploadAndDownload();
