async function testSuggestMeme() {
  console.log('1. Testing /api/ai/explain with fallback query...');
  const res1 = await fetch('http://localhost:3000/api/ai/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'Rizz', context: 'High school hallway slang' })
  });
  const data1 = await res1.json();
  console.log('AI Explain Response:', data1);

  console.log('2. Testing /api/memes suggest action...');
  const res2 = await fetch('http://localhost:3000/api/memes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'suggest',
      title: data1.data?.title || 'Rizz',
      description: data1.data?.cultural_context || 'Charisma slang',
      category: data1.data?.category || 'Slang & Culture',
      trend_status: 'Trending Up',
      origin: 'Social media',
      slang_terms: ['Rizz', 'Charisma'],
      cultural_context: data1.data?.cultural_context || 'Charm in communication',
      teacher_tips: data1.data?.teacher_tips || 'Good for discussing persuasive speech',
      student_notes: data1.data?.student_notes || 'Use respectfully'
    })
  });
  const data2 = await res2.json();
  console.log('Meme Save Response:', data2);
}

testSuggestMeme();
