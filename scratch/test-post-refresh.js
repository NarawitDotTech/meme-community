async function testPostRefresh() {
  const user = {
    userHandle: '@admin',
    userRole: 'admin',
    author_name: 'Super Admin',
    author_handle: '@admin',
    author_role: 'admin',
    content: 'Live Test Post: Testing refresh persistence!',
    category: 'Culture',
    slang_tags: ['LiveTest', 'Culture']
  };

  // 1. Post creation
  const postRes = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create', ...user })
  });
  const created = await postRes.json();
  console.log('Post created successfully:', created.data?.id);

  // 2. Fetch "For You" feed (simulating page reload)
  const foryouRes = await fetch('http://localhost:3000/api/posts?tab=foryou&user_handle=@admin');
  const foryouData = await foryouRes.json();
  console.log('For You top 2 posts:', foryouData.data?.slice(0, 2).map(p => ({ id: p.id, content: p.content.slice(0, 30) })));

  // 3. Fetch "Latest" feed (simulating page reload)
  const latestRes = await fetch('http://localhost:3000/api/posts?tab=latest');
  const latestData = await latestRes.json();
  console.log('Latest top 2 posts:', latestData.data?.slice(0, 2).map(p => ({ id: p.id, content: p.content.slice(0, 30) })));

  // 4. Fetch "Following" feed (simulating page reload)
  const followRes = await fetch('http://localhost:3000/api/posts?tab=following&user_handle=@admin');
  const followData = await followRes.json();
  console.log('Following top post:', followData.data?.[0]?.id);
}

testPostRefresh();
