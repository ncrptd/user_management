import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api/v1" });


API.interceptors.request.use(function (config) {
    const profile = localStorage.getItem('user');
    if (profile) {
        const auth = JSON.parse(profile).token;
        config.headers.authorization = 'Bearer ' + auth
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


export const login = (formData) => API.post('/auth/login', formData);
export const logout = () => API.post('/auth/logout');
export const getUsers = () => API.get('/users/all');
export const getOnlyUsers = () => API.get('/users/');
export const getTenants = () => API.get('/tenants');
export const createUser = (formData) => API.post('/users', formData);
export const removeUser = (userId) => API.delete(`/users/${userId}`);
export const passwordReset = (userId, newPassword) => API.post(`/users/${userId}`, { newPassword });
export const manageRoles = (userId, newRole) => API.post(`/users/manage-roles/${userId}`, { newRole });

export const upload = (folderName, formData, setFileUploadProgress) => API.post(`/upload/${folderName}`, formData, {
    onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`${percentCompleted}% uploaded`);
        setFileUploadProgress(percentCompleted);
    }
});


export const saveTemplate = (data) => API.post('/config/save-template', data);
export const getTemplates = () => API.get('/config/templates');

export const getUploadedFiles = () => API.get('/upload');
export const getFolders = () => API.get('/upload/folders');