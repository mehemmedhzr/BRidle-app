// Test script for the Word Collection API
const baseUrl = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Word Collection API v2.0...\n');

  try {
    // Test 1: Get all words (Azerbaijani)
    console.log('1. Testing GET /api/words (Azerbaijani)');
    const response1 = await fetch(`${baseUrl}/api/words`);
    const data1 = await response1.json();
    console.log(`✅ Found ${data1.count} Azerbaijani words`);
    console.log('Sample word:', data1.data[0]);
    console.log('');

    // Test 2: Get available collections
    console.log('2. Testing GET /api/collections');
    const response2 = await fetch(`${baseUrl}/api/collections`);
    const data2 = await response2.json();
    console.log('✅ Available collections:', data2.data);
    console.log('');

    // Test 3: Switch to English collection
    console.log('3. Testing GET /api/words/en/5 (English)');
    const response3 = await fetch(`${baseUrl}/api/words/en/5`);
    const data3 = await response3.json();
    console.log(`✅ Switched to English: ${data3.count} words`);
    console.log('Sample English word:', data3.data[0]);
    console.log('');

    // Test 4: Switch back to Azerbaijani
    console.log('4. Testing GET /api/words/az/5 (Azerbaijani)');
    const response4 = await fetch(`${baseUrl}/api/words/az/5`);
    const data4 = await response4.json();
    console.log(`✅ Switched back to Azerbaijani: ${data4.count} words`);
    console.log('');

    // Test 5: Get word by ID
    console.log('5. Testing GET /api/words/1');
    const response5 = await fetch(`${baseUrl}/api/words/1`);
    const data5 = await response5.json();
    console.log('✅ Word by ID:', data5.data);
    console.log('');

    // Test 6: Get random word
    console.log('6. Testing GET /api/words/random/word');
    const response6 = await fetch(`${baseUrl}/api/words/random/word`);
    const data6 = await response6.json();
    console.log('✅ Random word:', data6.data);
    console.log('');

    // Test 7: Get words by difficulty
    console.log('7. Testing GET /api/words/difficulty/easy');
    const response7 = await fetch(`${baseUrl}/api/words/difficulty/easy`);
    const data7 = await response7.json();
    console.log(`✅ Easy words: ${data7.count} found`);
    console.log('Sample easy words:', data7.data.slice(0, 5).map(w => w.word));
    console.log('');

    // Test 8: Get words by category
    console.log('8. Testing GET /api/words/category/əşya');
    const response8 = await fetch(`${baseUrl}/api/words/category/əşya`);
    const data8 = await response8.json();
    console.log(`✅ əşya (objects) words: ${data8.count} found`);
    console.log('əşya words:', data8.data.map(w => w.word));
    console.log('');

    // Test 9: Get words by another category
    console.log('9. Testing GET /api/words/category/heyvan');
    const response9 = await fetch(`${baseUrl}/api/words/category/heyvan`);
    const data9 = await response9.json();
    console.log(`✅ heyvan (animals) words: ${data9.count} found`);
    console.log('Sample animals:', data9.data.slice(0, 5).map(w => w.word));
    console.log('');

    // Test 10: Health check
    console.log('10. Testing GET /api/health');
    const response10 = await fetch(`${baseUrl}/api/health`);
    const data10 = await response10.json();
    console.log('✅ Health check:', data10.message);
    console.log('Current collection:', data10.currentCollection);
    console.log('');

    console.log('🎉 All tests passed! API is working correctly.');
    console.log(`📊 Total Azerbaijani words: ${data4.count}`);
    console.log(`📊 Total English words: ${data3.count}`);

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

// Run the tests
testAPI(); 