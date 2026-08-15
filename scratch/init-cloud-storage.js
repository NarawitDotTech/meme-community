const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://gegewgrpmqhnhutasjby.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZ2V3Z3JwbXFobmh1dGFzamJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Njc4NjY2NiwiZXhwIjoyMTAyMzYyNjY2fQ.t1xUu_hWfiZ_Z_bQdzOQo9D_Zs10kTr38ab8mT9CEFk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const DATA_DIR = path.join(__dirname, '..', 'data');

async function syncAll() {
  const files = ['posts.json', 'videos.json', 'users.json', 'reports.json', 'trends.json', 'bookmarks.json'];

  for (const f of files) {
    const localPath = path.join(DATA_DIR, f);
    if (fs.existsSync(localPath)) {
      const content = fs.readFileSync(localPath, 'utf-8');
      const { data, error } = await supabase.storage.from('app-data').upload(f, Buffer.from(content), {
        upsert: true,
        contentType: 'application/json'
      });
      console.log(`Synced ${f}:`, { path: data?.path, error });
    }
  }
}

syncAll();
