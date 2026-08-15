const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testCacheBusting() {
  const timestamp = Date.now();
  console.log('1. Uploading updated posts.json with timestamp:', timestamp);

  const posts = [
    { id: 'post-test-' + timestamp, content: 'Cache-busted test post ' + timestamp }
  ];

  const uploadRes = await supabase.storage.from('app-data').upload('posts.json', Buffer.from(JSON.stringify(posts, null, 2)), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });
  console.log('Upload result:', uploadRes);

  console.log('2. Downloading via publicUrl with timestamp cache buster...');
  const { data: { publicUrl } } = supabase.storage.from('app-data').getPublicUrl('posts.json');
  const res = await fetch(`${publicUrl}?_t=${Date.now()}`, {
    cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' }
  });
  const downloaded = await res.json();
  console.log('Downloaded fresh data:', downloaded);
  console.log('Matches uploaded ID:', downloaded[0]?.id === 'post-test-' + timestamp);
}

testCacheBusting();
