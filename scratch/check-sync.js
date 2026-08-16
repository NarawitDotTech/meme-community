const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testStorage() {
  console.log('1. Checking bucket files:');
  const { data: list, error: listErr } = await supabase.storage.from('app-data').list();
  console.log('Files in app-data:', list, listErr);

  console.log('2. Downloading posts.json from storage:');
  const { data: fileData, error: dlErr } = await supabase.storage.from('app-data').download('posts.json');
  if (dlErr) {
    console.error('Download error:', dlErr);
  } else {
    const text = await fileData.text();
    const json = JSON.parse(text);
    console.log(`posts.json has ${json.length} posts. First post id:`, json[0]?.id, 'title:', json[0]?.content?.slice(0, 30));
  }

  console.log('3. Checking Supabase Database Tables:');
  const { data: postsTable, error: tableErr } = await supabase.from('posts').select('*').limit(5);
  console.log('Supabase posts table query:', { count: postsTable?.length, error: tableErr });
}

testStorage();
