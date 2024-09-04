import axios from 'axios';
import { base_url } from '../config';
import { memoizeRefreshToken } from './refresh-token';

export const axiosApi = axios.create({
    // withCredentials: true,
    baseURL: base_url,
});

axiosApi.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        // console.log({ config });
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log({ error });
        let config = error?.config;
        if (error?.status === 401) {
            localStorage.removeItem('token');
            const result = await memoizeRefreshToken();
            if (result?.data?.token) {
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result?.data?.token}`,
                };
            }
            return axios(config);
        }

        return Promise.reject(error);
    }
);

// axios.defaults.withCredentials = true;
// const withCredentials = {
//     withCredentials: true,
// };
