import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Default API URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: async (credentials: { username: string; password: string }) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },
    
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },
};

// Users API
export const usersAPI = {
    getUsers: async (params?: any) => {
        const response = await api.get('/users', { params });
        return response.data;
    },
    
    getUser: async (id: string) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    
    createUser: async (userData: any) => {
        const response = await api.post('/users', userData);
        return response.data;
    },
    
    updateUser: async (id: string, userData: any) => {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    },
    
    deleteUser: async (id: string) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
};

export default api; 