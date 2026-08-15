const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testBucket() {
  console.log('1. Creating or getting bucket "app-data"...');
  const createRes = await supabase.storage.createBucket('app-data', {
    public: true
  });
  console.log('Create bucket res:', createRes);

  console.log('2. Uploading test posts.json...');
  const testData = JSON.stringify([{ id: 'test-1', content: 'Cloud saved post' }], null, 2);
  const uploadRes = await supabase.storage.from('app-data').upload('posts.json', Buffer.from(testData), {
    upsert: true,
    contentType: 'application/json'
  });
  console.log('Upload res:', uploadRes);

  console.log('3. Downloading posts.json...');
  const { data, error } = await supabase.storage.from('app-data').download('posts.json');
  if (data) {
    const text = await data.text();
    console.log('Downloaded content:', text);
  } else {
    console.error('Download error:', error);
  }
}

testBucket();
