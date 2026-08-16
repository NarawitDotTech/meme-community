const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testStorageEngine() {
  console.log("1. Checking current app_state / storage...");
  const { data: fileData, error: dlErr } = await supabase.storage.from('app-data').download('posts.json');
  console.log("Download result error:", dlErr);
  if (fileData) {
    const posts = JSON.parse(await fileData.text());
    console.log(`Current posts count in storage: ${posts.length}`);
  }
}

testStorageEngine();
