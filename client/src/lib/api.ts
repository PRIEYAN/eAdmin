import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://e-venue-backend.onrender.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('admin');
      window.location.href = '/login';
    }
    
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      const customError = error as any;
      customError.message = 'Request timed out. Please try again.';
    }
    
    if (!error.response) {
      const customError = error as any;
      customError.message = 'Network error. Please check your connection.';
    }
    
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: async (adminId: string, password: string) => {
      const response = await apiClient.post('/api/admin/auth/login', {
        adminId,
        password,
      });
      return response.data;
    },
  },

  verifiedTeachers: {
    getAll: async () => {
      const response = await apiClient.get('/api/admin/verified/verifiedTeachers');
      return response.data;
    },
  },

  pendingTeachers: {
    getAll: async () => {
      const response = await apiClient.get('/api/admin/pending/pendingTeachers');
      return response.data;
    },
    verify: async (TeacherId: string) => {
      const response = await apiClient.post(`/api/admin/pending/verify`, { TeacherId });
      return response.data;
    },
    resetBookings: async () => {
      const response = await apiClient.post('/api/admin/pending/resetBookings');
      return response.data;
    },
  },

  venues: {
    getAll: async () => {
      const response = await apiClient.get('/api/admin/venue/getVenue');
      return response.data;
    },
    getAllDetails: async () => {
      const response = await apiClient.get('/api/admin/venue/allDetails');
      return response.data;
    },
    add: async (venue: { Examdate: string; Examtime: string; numberOfTeachersCanBook: number }) => {
      const response = await apiClient.post('/api/admin/venue/addVenue', venue);
      return response.data;
    },
    delete: async (id: string) => {
      const response = await apiClient.post(`/api/admin/venue/deleteVenue`, { id });
      return response.data;
    },
    getAllExamVenuesWithDetails: async () => {
      const response = await apiClient.get('/api/admin/venue/getAllExamVenuesWithDetails');
      return response.data;
    },
    resetTeachersBookings: async () => {
      const response = await apiClient.post('/api/admin/venue/resetTeachersBookings');
      return response.data;
    },
  },
};
