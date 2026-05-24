import axios from 'axios';

// Get the base URL from environment variables, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL,
  // CRITICAL: This ensures the HttpOnly JWT cookie is sent automatically with every request
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add response interceptors for global error handling (like redirecting on 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server sends a 401 Unauthorized (invalid/expired JWT)
    if (error.response && error.response.status === 401) {
      // We could dispatch a logout action here if we had access to the Redux store,
      // but for now, we'll let the specific services handle it or trigger a window reload.
      console.warn("Unauthorized access - JWT missing or expired.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
