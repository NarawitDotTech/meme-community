async function testPublicDownload() {
  const publicUrl = 'https://gegewgrpmqhnhutasjby.supabase.co/storage/v1/object/public/app-data/posts.json';
  console.log('Testing public fetch from URL:', publicUrl);

  const res = await fetch(publicUrl);
  console.log('Public fetch status:', res.status, res.statusText);
  if (res.ok) {
    const json = await res.json();
    console.log('Public fetch body length:', json.length, 'data:', json);
  } else {
    const text = await res.text();
    console.log('Public fetch error body:', text);
  }
}

testPublicDownload();
