#!/usr/bin/env node
/**
 * Frontend API Service Test
 * Tests the frontend API service layer communication with backend
 */

const fs = require('fs');
const path = require('path');

// Read the API service file
const apiServicePath = path.join(__dirname, 'frontend/src/services/api.js');
const apiServiceContent = fs.readFileSync(apiServicePath, 'utf8');

// Read environment variables
const envPath = path.join(__dirname, 'frontend/.env');
const envContent = fs.readFileSync(envPath, 'utf8');

console.log('='.repeat(60));
console.log('FRONTEND API SERVICE INTEGRATION TEST');
console.log('='.repeat(60));

// Parse environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line.includes('=')) {
    const [key, value] = line.split('=');
    envVars[key] = value;
  }
});

const backendUrl = envVars.REACT_APP_BACKEND_URL;
console.log(`Backend URL from .env: ${backendUrl}`);

// Test using Node.js fetch (available in Node 18+)
async function testApiService() {
  const API_BASE_URL = backendUrl;
  
  console.log('\n' + '-'.repeat(40));
  console.log('TESTING API SERVICE ENDPOINTS');
  console.log('-'.repeat(40));
  
  // Test 1: Health Check
  try {
    console.log('\n1. Testing Health Check...');
    const response = await fetch(`${API_BASE_URL}/api/health`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Health Check: SUCCESS');
      console.log(`   Status: ${data.status}, Database: ${data.database}`);
    } else {
      console.log(`❌ Health Check: FAILED (HTTP ${response.status})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Health Check: ERROR - ${error.message}`);
    return false;
  }
  
  // Test 2: Create RSVP via API Service pattern
  try {
    console.log('\n2. Testing RSVP Creation...');
    const rsvpData = {
      name: "Frontend Test User",
      email: "frontend.test@example.com",
      attendance: "si",
      message: "Testing frontend API integration"
    };
    
    const response = await fetch(`${API_BASE_URL}/api/rsvp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvpData)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ RSVP Creation: SUCCESS');
      console.log(`   Created RSVP ID: ${data.id}`);
      console.log(`   Name: ${data.name}`);
      return data.id;
    } else {
      const errorText = await response.text();
      console.log(`❌ RSVP Creation: FAILED (HTTP ${response.status})`);
      console.log(`   Error: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ RSVP Creation: ERROR - ${error.message}`);
    return false;
  }
}

// Test 3: Verify API Service Configuration
function testApiServiceConfig() {
  console.log('\n' + '-'.repeat(40));
  console.log('API SERVICE CONFIGURATION CHECK');
  console.log('-'.repeat(40));
  
  // Check if API service uses environment variables correctly
  if (apiServiceContent.includes('process.env.REACT_APP_BACKEND_URL') || 
      apiServiceContent.includes('import.meta.env.REACT_APP_BACKEND_URL')) {
    console.log('✅ Environment Variable Usage: CORRECT');
  } else {
    console.log('❌ Environment Variable Usage: MISSING');
  }
  
  // Check if all required endpoints are present
  const requiredEndpoints = [
    'healthCheck',
    'createRSVP', 
    'getRSVPs',
    'getRSVPStats',
    'getRSVPById'
  ];
  
  let endpointsFound = 0;
  requiredEndpoints.forEach(endpoint => {
    if (apiServiceContent.includes(endpoint)) {
      console.log(`✅ Endpoint ${endpoint}: FOUND`);
      endpointsFound++;
    } else {
      console.log(`❌ Endpoint ${endpoint}: MISSING`);
    }
  });
  
  console.log(`\nEndpoints Coverage: ${endpointsFound}/${requiredEndpoints.length}`);
  
  // Check if proper error handling is implemented
  if (apiServiceContent.includes('catch') && apiServiceContent.includes('throw')) {
    console.log('✅ Error Handling: IMPLEMENTED');
  } else {
    console.log('❌ Error Handling: MISSING');
  }
  
  return endpointsFound === requiredEndpoints.length;
}

// Run tests
async function runTests() {
  const configOk = testApiServiceConfig();
  const apiOk = await testApiService();
  
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  
  if (configOk && apiOk) {
    console.log('🎉 ALL TESTS PASSED! Frontend API service is working correctly.');
    console.log('✅ Configuration is correct');
    console.log('✅ Backend communication is working');
    console.log('✅ RSVP creation through API service is functional');
    return true;
  } else {
    console.log('⚠️  SOME TESTS FAILED:');
    if (!configOk) console.log('❌ API Service configuration issues');
    if (!apiOk) console.log('❌ Backend communication issues');
    return false;
  }
}

// Execute tests
runTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});