import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const todoApi = axios.create({
    baseURL: VITE_API_URL,
});

//*Necessary for TOKEN authentication */
todoApi.interceptors.request.use((config: any) => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    };

    return config;
});

export default todoApi;
