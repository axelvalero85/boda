// API service for wedding website
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // RSVP endpoints
  async createRSVP(rsvpData) {
    return this.request('/api/rsvp', {
      method: 'POST',
      body: JSON.stringify(rsvpData),
    });
  }

  async getRSVPs() {
    return this.request('/api/rsvp');
  }

  async getRSVPStats() {
    return this.request('/api/rsvp/stats');
  }

  async getRSVPById(id) {
    return this.request(`/api/rsvp/${id}`);
  }

  // Legacy status endpoints (for backward compatibility)
  async createStatusCheck(clientName) {
    return this.request('/api/status', {
      method: 'POST',
      body: JSON.stringify({ client_name: clientName }),
    });
  }

  async getStatusChecks() {
    return this.request('/api/status');
  }
}

export default new ApiService();