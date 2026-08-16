const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testAppState() {
  console.log("Checking if app_state or posts table can be queried...");
  const { data: postsData, error: postsErr } = await supabase.from('posts').select('*').limit(2);
  console.log("posts table:", { count: postsData?.length, error: postsErr?.message });

  const { data: vData, error: vErr } = await supabase.from('videos').select('*').limit(2);
  console.log("videos table:", { count: vData?.length, error: vErr?.message });
}

testAppState();
