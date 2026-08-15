const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testKV() {
  console.log('Testing storage download public...');
  const { data: { publicUrl } } = supabase.storage.from('app-data').getPublicUrl('posts.json');
  console.log('Public URL:', publicUrl);
  try {
    const res = await fetch(`${publicUrl}?_t=${Date.now()}`);
    const json = await res.json();
    console.log('Fetched posts count:', json.length, 'IDs:', json.map(p => p.id));
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

testKV();
