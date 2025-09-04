#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Axel & Dani Wedding Website
Tests all RSVP endpoints and MongoDB integration
"""

import requests
import json
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://axeldani-wedding-1.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.created_rsvp_ids = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'message': message,
            'details': details
        })
    
    def test_health_endpoint(self):
        """Test the health check endpoint"""
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'healthy' and data.get('database') == 'connected':
                    self.log_test("Health Check", True, "API and database are healthy", data)
                    return True
                else:
                    self.log_test("Health Check", False, "Health check returned unexpected data", data)
                    return False
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_create_valid_rsvp(self):
        """Test creating a valid RSVP with all required fields"""
        test_data = {
            "name": "María González",
            "email": "maria.gonzalez@example.com",
            "attendance": "si"
        }
        
        try:
            response = requests.post(f"{API_BASE}/rsvp", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('name') == test_data['name']:
                    self.created_rsvp_ids.append(data['id'])
                    self.log_test("Create Valid RSVP", True, "RSVP created successfully", 
                                f"ID: {data['id']}, Name: {data['name']}")
                    return True, data['id']
                else:
                    self.log_test("Create Valid RSVP", False, "Invalid response data", data)
                    return False, None
            else:
                self.log_test("Create Valid RSVP", False, f"HTTP {response.status_code}", response.text)
                return False, None
                
        except Exception as e:
            self.log_test("Create Valid RSVP", False, f"Request error: {str(e)}")
            return False, None
    
    def test_create_rsvp_with_optional_fields(self):
        """Test creating RSVP with all optional fields"""
        test_data = {
            "name": "Carlos Rodríguez",
            "email": "carlos.rodriguez@example.com",
            "phone": "555-0123",
            "attendance": "si",
            "allergies": "Frutos secos",
            "transport": "si",
            "message": "¡Felicidades por su boda! Estamos muy emocionados de celebrar con ustedes."
        }
        
        try:
            response = requests.post(f"{API_BASE}/rsvp", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('id') and data.get('name') == test_data['name'] and 
                    data.get('phone') == test_data['phone'] and 
                    data.get('allergies') == test_data['allergies']):
                    self.created_rsvp_ids.append(data['id'])
                    self.log_test("Create RSVP with Optional Fields", True, 
                                "RSVP with all fields created successfully", 
                                f"ID: {data['id']}, Phone: {data['phone']}")
                    return True, data['id']
                else:
                    self.log_test("Create RSVP with Optional Fields", False, "Missing optional fields in response", data)
                    return False, None
            else:
                self.log_test("Create RSVP with Optional Fields", False, f"HTTP {response.status_code}", response.text)
                return False, None
                
        except Exception as e:
            self.log_test("Create RSVP with Optional Fields", False, f"Request error: {str(e)}")
            return False, None
    
    def test_create_rsvp_not_attending(self):
        """Test creating RSVP for someone not attending"""
        test_data = {
            "name": "Ana López",
            "email": "ana.lopez@example.com",
            "attendance": "no",
            "message": "Lamentablemente no podremos asistir, pero les deseamos lo mejor."
        }
        
        try:
            response = requests.post(f"{API_BASE}/rsvp", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('attendance') == 'no':
                    self.created_rsvp_ids.append(data['id'])
                    self.log_test("Create RSVP Not Attending", True, "Non-attending RSVP created successfully", 
                                f"ID: {data['id']}, Attendance: {data['attendance']}")
                    return True, data['id']
                else:
                    self.log_test("Create RSVP Not Attending", False, "Invalid attendance value", data)
                    return False, None
            else:
                self.log_test("Create RSVP Not Attending", False, f"HTTP {response.status_code}", response.text)
                return False, None
                
        except Exception as e:
            self.log_test("Create RSVP Not Attending", False, f"Request error: {str(e)}")
            return False, None
    
    def test_validation_errors(self):
        """Test various validation error scenarios"""
        validation_tests = [
            {
                "name": "Missing Name",
                "data": {"email": "test@example.com", "attendance": "si"},
                "expected_error": "name is required"
            },
            {
                "name": "Missing Email", 
                "data": {"name": "Test User", "attendance": "si"},
                "expected_error": "email is required"
            },
            {
                "name": "Invalid Email",
                "data": {"name": "Test User", "email": "invalid-email", "attendance": "si"},
                "expected_error": "invalid email format"
            },
            {
                "name": "Missing Attendance",
                "data": {"name": "Test User", "email": "test@example.com"},
                "expected_error": "attendance is required"
            },
            {
                "name": "Invalid Attendance Value",
                "data": {"name": "Test User", "email": "test@example.com", "attendance": "maybe"},
                "expected_error": "attendance must be si or no"
            },
            {
                "name": "Invalid Transport Value",
                "data": {"name": "Test User", "email": "test@example.com", "attendance": "si", "transport": "maybe"},
                "expected_error": "transport must be si, no, or null"
            }
        ]
        
        validation_passed = 0
        for test in validation_tests:
            try:
                response = requests.post(f"{API_BASE}/rsvp", json=test["data"], timeout=10)
                
                if response.status_code == 422:  # Validation error
                    validation_passed += 1
                    self.log_test(f"Validation - {test['name']}", True, "Validation error correctly returned")
                else:
                    self.log_test(f"Validation - {test['name']}", False, 
                                f"Expected validation error, got HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_test(f"Validation - {test['name']}", False, f"Request error: {str(e)}")
        
        return validation_passed == len(validation_tests)
    
    def test_get_all_rsvps(self):
        """Test retrieving all RSVP responses"""
        try:
            response = requests.get(f"{API_BASE}/rsvp", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if our created RSVPs are in the list
                    found_rsvps = [rsvp for rsvp in data if rsvp.get('id') in self.created_rsvp_ids]
                    self.log_test("Get All RSVPs", True, 
                                f"Retrieved {len(data)} RSVPs, {len(found_rsvps)} are our test RSVPs")
                    return True
                else:
                    self.log_test("Get All RSVPs", False, "Response is not a list", data)
                    return False
            else:
                self.log_test("Get All RSVPs", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get All RSVPs", False, f"Request error: {str(e)}")
            return False
    
    def test_get_rsvp_stats(self):
        """Test RSVP statistics endpoint"""
        try:
            response = requests.get(f"{API_BASE}/rsvp/stats", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['total_responses', 'attending', 'not_attending', 'transport_needed']
                
                if all(field in data for field in required_fields):
                    # Validate that numbers make sense
                    total = data['total_responses']
                    attending = data['attending']
                    not_attending = data['not_attending']
                    
                    if attending + not_attending <= total:  # Allow for edge cases
                        self.log_test("Get RSVP Stats", True, 
                                    f"Stats: {total} total, {attending} attending, {not_attending} not attending")
                        return True
                    else:
                        self.log_test("Get RSVP Stats", False, "Invalid statistics calculation", data)
                        return False
                else:
                    self.log_test("Get RSVP Stats", False, "Missing required fields in stats", data)
                    return False
            else:
                self.log_test("Get RSVP Stats", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get RSVP Stats", False, f"Request error: {str(e)}")
            return False
    
    def test_get_rsvp_by_id(self):
        """Test retrieving specific RSVP by ID"""
        if not self.created_rsvp_ids:
            self.log_test("Get RSVP by ID", False, "No RSVP IDs available for testing")
            return False
        
        test_id = self.created_rsvp_ids[0]
        
        try:
            response = requests.get(f"{API_BASE}/rsvp/{test_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') == test_id:
                    self.log_test("Get RSVP by ID", True, f"Successfully retrieved RSVP {test_id}")
                    return True
                else:
                    self.log_test("Get RSVP by ID", False, "ID mismatch in response", data)
                    return False
            else:
                self.log_test("Get RSVP by ID", False, f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get RSVP by ID", False, f"Request error: {str(e)}")
            return False
    
    def test_get_nonexistent_rsvp(self):
        """Test error handling for non-existent RSVP ID"""
        fake_id = str(uuid.uuid4())
        
        try:
            response = requests.get(f"{API_BASE}/rsvp/{fake_id}", timeout=10)
            
            if response.status_code == 404:
                self.log_test("Get Non-existent RSVP", True, "Correctly returned 404 for non-existent RSVP")
                return True
            else:
                self.log_test("Get Non-existent RSVP", False, 
                            f"Expected 404, got HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Non-existent RSVP", False, f"Request error: {str(e)}")
            return False
    
    def test_email_configuration_health_check(self):
        """Test that health check shows email as configured"""
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                email_status = data.get('email')
                
                if email_status == 'configured':
                    self.log_test("Email Configuration Health Check", True, 
                                "Email service is properly configured", 
                                f"Email status: {email_status}")
                    return True
                else:
                    self.log_test("Email Configuration Health Check", False, 
                                f"Email not configured properly. Status: {email_status}", data)
                    return False
            else:
                self.log_test("Email Configuration Health Check", False, 
                            f"HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Email Configuration Health Check", False, f"Request error: {str(e)}")
            return False
    
    def test_rsvp_with_email_notification_attending(self):
        """Test RSVP creation with email notification - attending guest"""
        test_data = {
            "name": "Isabella Martínez",
            "email": "isabella.martinez@example.com",
            "phone": "555-0199",
            "attendance": "si",
            "allergies": "Mariscos",
            "transport": "si",
            "message": "¡Estamos muy emocionados por su boda! Será un día maravilloso."
        }
        
        try:
            print(f"\n📧 Testing RSVP creation with email notification...")
            response = requests.post(f"{API_BASE}/rsvp", json=test_data, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('name') == test_data['name']:
                    self.created_rsvp_ids.append(data['id'])
                    self.log_test("RSVP with Email Notification (Attending)", True, 
                                "RSVP created successfully - email should be sent to axelvalero@gmail.com", 
                                f"ID: {data['id']}, Name: {data['name']}, Attendance: {data['attendance']}")
                    return True, data['id']
                else:
                    self.log_test("RSVP with Email Notification (Attending)", False, 
                                "Invalid response data", data)
                    return False, None
            else:
                self.log_test("RSVP with Email Notification (Attending)", False, 
                            f"HTTP {response.status_code}", response.text)
                return False, None
                
        except Exception as e:
            self.log_test("RSVP with Email Notification (Attending)", False, f"Request error: {str(e)}")
            return False, None
    
    def test_rsvp_with_email_notification_not_attending(self):
        """Test RSVP creation with email notification - not attending guest"""
        test_data = {
            "name": "Roberto Fernández",
            "email": "roberto.fernandez@example.com",
            "attendance": "no",
            "message": "Lamentablemente no podremos asistir debido a compromisos familiares. ¡Les deseamos una boda maravillosa!"
        }
        
        try:
            print(f"\n📧 Testing RSVP creation (not attending) with email notification...")
            response = requests.post(f"{API_BASE}/rsvp", json=test_data, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('attendance') == 'no':
                    self.created_rsvp_ids.append(data['id'])
                    self.log_test("RSVP with Email Notification (Not Attending)", True, 
                                "Non-attending RSVP created successfully - email should be sent to axelvalero@gmail.com", 
                                f"ID: {data['id']}, Name: {data['name']}, Attendance: {data['attendance']}")
                    return True, data['id']
                else:
                    self.log_test("RSVP with Email Notification (Not Attending)", False, 
                                "Invalid response data", data)
                    return False, None
            else:
                self.log_test("RSVP with Email Notification (Not Attending)", False, 
                            f"HTTP {response.status_code}", response.text)
                return False, None
                
        except Exception as e:
            self.log_test("RSVP with Email Notification (Not Attending)", False, f"Request error: {str(e)}")
            return False, None
    
    def test_rsvp_with_email_notification_minimal_data(self):
        """Test RSVP creation with minimal data - email notification should still work"""
        test_data = {
            "name": "Carmen Ruiz",
            "email": "carmen.ruiz@example.com",
            "attendance": "si"
        }
        
        try:
            print(f"\n📧 Testing RSVP creation (minimal data) with email notification...")
            response = requests.post(f"{API_BASE}/rsvp", json=test_data, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('id') and data.get('name') == test_data['name']:
                    self.created_rsvp_ids.append(data['id'])
                    self.log_test("RSVP with Email Notification (Minimal Data)", True, 
                                "Minimal RSVP created successfully - email should be sent to axelvalero@gmail.com", 
                                f"ID: {data['id']}, Name: {data['name']}")
                    return True, data['id']
                else:
                    self.log_test("RSVP with Email Notification (Minimal Data)", False, 
                                "Invalid response data", data)
                    return False, None
            else:
                self.log_test("RSVP with Email Notification (Minimal Data)", False, 
                            f"HTTP {response.status_code}", response.text)
                return False, None
                
        except Exception as e:
            self.log_test("RSVP with Email Notification (Minimal Data)", False, f"Request error: {str(e)}")
            return False, None
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("AXEL & DANI WEDDING BACKEND API TESTS")
        print("=" * 60)
        
        # Test 1: Health Check
        health_ok = self.test_health_endpoint()
        
        if not health_ok:
            print("\n❌ CRITICAL: Health check failed. Cannot proceed with other tests.")
            return False
        
        print("\n" + "-" * 40)
        print("RSVP FUNCTIONALITY TESTS")
        print("-" * 40)
        
        # Test 2: Create valid RSVP
        self.test_create_valid_rsvp()
        
        # Test 3: Create RSVP with optional fields
        self.test_create_rsvp_with_optional_fields()
        
        # Test 4: Create RSVP for non-attending
        self.test_create_rsvp_not_attending()
        
        # Test 5: Validation errors
        print("\n" + "-" * 40)
        print("VALIDATION TESTS")
        print("-" * 40)
        self.test_validation_errors()
        
        # Test 6: Get all RSVPs
        print("\n" + "-" * 40)
        print("DATA RETRIEVAL TESTS")
        print("-" * 40)
        self.test_get_all_rsvps()
        
        # Test 7: Get RSVP stats
        self.test_get_rsvp_stats()
        
        # Test 8: Get RSVP by ID
        self.test_get_rsvp_by_id()
        
        # Test 9: Error handling
        print("\n" + "-" * 40)
        print("ERROR HANDLING TESTS")
        print("-" * 40)
        self.test_get_nonexistent_rsvp()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Tests Passed: {passed}/{total}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if self.created_rsvp_ids:
            print(f"\nCreated {len(self.created_rsvp_ids)} test RSVPs:")
            for rsvp_id in self.created_rsvp_ids:
                print(f"  - {rsvp_id}")
        
        # Detailed results
        print("\nDetailed Results:")
        for result in self.test_results:
            status = "✅" if result['success'] else "❌"
            print(f"{status} {result['test']}: {result['message']}")
        
        return passed == total

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 ALL TESTS PASSED! Backend is working correctly.")
        exit(0)
    else:
        print("\n⚠️  SOME TESTS FAILED. Check the results above.")
        exit(1)