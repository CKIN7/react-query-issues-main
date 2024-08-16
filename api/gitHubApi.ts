import axios from 'axios';

export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: import.meta.env.VITE_BACKEND_URL,
    },
});
