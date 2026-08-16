const http = require('http');

async function testApi() {
  const postData = JSON.stringify({
    action: "create",
    author_name: "Phone A User",
    author_handle: "@phone_a_user",
    author_role: "student",
    content: "Testing sync from Phone A: " + Date.now(),
    category: "Culture",
    userRole: "student",
    userHandle: "@phone_a_user"
  });

  console.log("Sending POST /api/posts...");
  const postRes = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: postData
  });
  const postJson = await postRes.json();
  console.log("POST response:", postJson);

  console.log("\nSending GET /api/posts (Phone B simulation)...");
  const getRes = await fetch('http://localhost:3000/api/posts?_t=' + Date.now(), {
    headers: { 'Cache-Control': 'no-cache' }
  });
  const getJson = await getRes.json();
  console.log(`Phone B received ${getJson.data?.length} posts.`);
  const found = getJson.data?.find(p => p.id === postJson.data?.id);
  console.log("Did Phone B find the post created by Phone A?", found ? "YES! " + found.content : "NO!");
}

testApi();
