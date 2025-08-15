#!/usr/bin/env node

import https from 'https';

const DUCKDUCKGO_BANG_URL = 'https://duckduckgo.com/bang.js';

/**
 * Test the DuckDuckGo API
 */
function testAPI() {
  return new Promise((resolve, reject) => {
    console.log('Testing DuckDuckGo API...');
    console.log(`URL: ${DUCKDUCKGO_BANG_URL}`);
    
    const req = https.get(DUCKDUCKGO_BANG_URL, (res) => {
      console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
      console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
      
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const bangData = JSON.parse(data);
          console.log(`✅ API test successful!`);
          console.log(`- Response type: ${Array.isArray(bangData) ? 'Array' : typeof bangData}`);
          console.log(`- Number of bangs: ${Array.isArray(bangData) ? bangData.length : 'N/A'}`);
          console.log(`- First bang: ${Array.isArray(bangData) && bangData.length > 0 ? JSON.stringify(bangData[0], null, 2) : 'N/A'}`);
          
          resolve(bangData);
        } catch (error) {
          console.error(`❌ Failed to parse JSON: ${error.message}`);
          console.log(`Raw response (first 500 chars): ${data.substring(0, 500)}`);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`❌ HTTP request failed: ${error.message}`);
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout after 10 seconds'));
    });
  });
}

/**
 * Main function
 */
async function main() {
  try {
    await testAPI();
    console.log('\n🎉 API test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 API test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
main();
