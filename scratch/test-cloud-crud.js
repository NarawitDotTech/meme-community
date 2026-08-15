const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testCrud() {
  console.log('1. Fetch current cloud posts...');
  const { data: { publicUrl } } = supabase.storage.from('app-data').getPublicUrl('posts.json');
  const res1 = await fetch(`${publicUrl}?_t=${Date.now()}`);
  let posts = await res1.json();
  console.log('Initial count:', posts.length);

  console.log('2. Create new post in cloud...');
  const newPost = {
    id: `post-${Date.now()}`,
    author_name: 'Test Cloud Author',
    author_handle: '@cloud_tester',
    content: 'Cloud persistence test at ' + new Date().toISOString(),
    category: 'Tech',
    likes_count: 0
  };
  posts = [newPost, ...posts];
  const upload1 = await supabase.storage.from('app-data').upload('posts.json', Buffer.from(JSON.stringify(posts, null, 2)), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log('Upload create error:', upload1.error);

  console.log('3. Re-downloading to verify new post is in cloud...');
  const res2 = await fetch(`${publicUrl}?_t=${Date.now()}`);
  const postsAfterCreate = await res2.json();
  console.log('Count after create:', postsAfterCreate.length);
  const found = postsAfterCreate.find(p => p.id === newPost.id);
  console.log('Found newly created post in cloud:', !!found);

  console.log('4. Delete newly created post from cloud...');
  const postsAfterDelete = postsAfterCreate.filter(p => p.id !== newPost.id);
  const upload2 = await supabase.storage.from('app-data').upload('posts.json', Buffer.from(JSON.stringify(postsAfterDelete, null, 2)), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log('Upload delete error:', upload2.error);

  console.log('5. Re-downloading to verify post is deleted from cloud...');
  const res3 = await fetch(`${publicUrl}?_t=${Date.now()}`);
  const postsFinal = await res3.json();
  console.log('Final count in cloud:', postsFinal.length);
  const foundFinal = postsFinal.find(p => p.id === newPost.id);
  console.log('Post is completely gone from cloud:', !foundFinal);
}

testCrud();
