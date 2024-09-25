// src/axios.js
import axios from 'axios';
import { base_url } from '../config';

// Create the Axios instance
const instance = axios.create({
    baseURL: base_url,
    withCredentials: true, // Enable cookies by default
});

// Response interceptor for handling token refresh and retries
instance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        // Handle 403 errors (Access Token expiration)
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token using the refresh token cookie
                const { data } = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                // Update the Authorization header with the new Access Token
                instance.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${data.accessToken}`;
                
                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${data.accessToken}`;

                // Retry the original request
                return instance(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure
                console.error('Failed to refresh token:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Forward other errors
    }
);

/**
 * Custom request handler to allow conditional cookie usage.
 * @param {Object} config - Axios request config.
 * @param {boolean} useCookies - Should cookies be included in the request.
 */
instance.requestWithCookies = (config, useCookies = true) => {
    return instance({
        ...config,
        withCredentials: useCookies, // Conditionally include cookies
    });
};

export default instance;
