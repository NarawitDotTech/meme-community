const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testDownload() {
  console.log("Testing supabase.storage.download('posts.json')...");
  const { data, error } = await supabase.storage.from('app-data').download('posts.json');
  if (error) {
    console.error("Download error:", error);
    return;
  }
  const text = await data.text();
  const parsed = JSON.parse(text);
  console.log("Downloaded parsed posts count:", parsed.length);
  console.log("Post IDs:", parsed.map(p => p.id));
}

testDownload();
