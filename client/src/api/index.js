import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5100/api'});
//const API = axios.create({baseURL: 'https://justice-for-uglies.herokuapp.com/api'});

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
export const getUserStats = async () => API.get('/user/stats'); // Get number of comments abd likes user made
export const deleteUser = () => API.delete('/user');
export const updateUser = (formData) => API.patch('/user', formData);

export const createComment = (comment) => API.post('/comments', comment);
export const deleteComment = (commentID) => API.delete(`/comments/${commentID}`);
export const editComment = (comment) => API.patch(`/comments/`, comment);
export const getComments = async () => API.get('/comments');

export const like = (commentID) => API.post(`/like/${commentID}`);
export const getLikes = async (commentID) => API.get(`/like/${commentID}`);

export const addShopItem = (item) => API.post(`/shop`, item);
export const getAllItems = async () => API.get(`/shop`);
export const editItem = async (item) => API.put(`/shop`, item);