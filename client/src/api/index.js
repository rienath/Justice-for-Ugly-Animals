import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5100'});

// Token interceptor
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// API calls
export const login = (formData) => API.post('/user/login', formData);
export const register = (formData) => API.post('/user/register', formData);