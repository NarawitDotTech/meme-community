const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
  console.log('Testing Supabase connection...');
  const { data, error } = await supabase.from('posts').select('*').limit(5);
  console.log('Posts query result:', { data, error });

  const buckets = await supabase.storage.listBuckets();
  console.log('Storage buckets:', buckets);
}

test();
