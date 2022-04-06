import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5100/api'});

// Token interceptor
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

// API calls
export const login = (formData) => API.post('/user/login', formData);
export const register = (formData) => API.post('/user/register', formData);
export const createComment = (newPost) => API.post('/comments', newPost);
export const getAllComments = async() => API.get('/comments');