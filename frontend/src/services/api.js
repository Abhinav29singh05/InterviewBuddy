import axios from 'axios';

// Use environment variables with fallback to production URL
const API_URL = import.meta.env.VITE_API_URL || 'https://your-vercel-backend-url.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  signup: (userData) => api.post('/api/auth/signup', userData),
};

export const interviewAPI = {
  generateQuestions: (description) => api.post('/api/services/questionGenerator', { description }),
  analyzeInterview: (data) => api.post('/api/services/analyzeInterview', data),
};

export default api; 