import axios from "axios";

const API = axios.create({
    baseURL:
        "http://localhost:3000/api/v1"
});

// "http://localhost:3000/api/v1"
// "http://13.201.75.82/api/v1"
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
        setFileUploadProgress(percentCompleted);
    }
});


// export const saveTemplate = (data) => API.post('/config/save-template', data);
export const getTemplates = () => API.get('/config/templates');
export const uploadGlobalTemplate = (data) => API.post('/config/global-template', data);
export const getUploadedFiles = () => API.get('/upload');
export const getFolders = () => API.get('/upload/folders');
export const uploadConfigFile = (data) => API.post('/config/config-file', data);
export const getConfigFile = () => API.get('/config/config-file');
export const disableUser = (userId) => API.post(`/users/disable_user/${userId}`)
export const enableUser = (userId) => API.post(`/users/enable_user/${userId}`);
export const getDownloadLink = (data) => API.post('/upload/download-link', data);
export const getDownloadLinks = (files) => API.post('/upload/download-link/multi', { files });

// export const getDownloadLinks = async (files) => {
//     const response = await axios.post('/upload/download-link/multi', { files });

// };