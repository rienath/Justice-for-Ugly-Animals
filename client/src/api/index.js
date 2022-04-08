import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5100/api'});

// Token interceptor
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

// Response interceptor. If token expired, log user out
API.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload()
    }
    return Promise.reject(error);
});

// API calls
export const login = (formData) => API.post('/user/login', formData);
export const register = (formData) => API.post('/user/register', formData);

export const createComment = (comment) => API.post('/comments', comment);
export const deleteComment = (commentID) => API.delete(`/comments/${commentID}`);
export const editComment = (comment) => API.patch(`/comments/`, comment);
export const getComments = async () => API.get('/comments');

export const like = (commentID) => API.post(`/like/${commentID}`);
export const getLikes = (commentID) => API.get(`/like/${commentID}`);