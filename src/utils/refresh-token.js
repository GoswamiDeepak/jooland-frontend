import axios from 'axios';
import memoize from 'memoize';

const refreshTokenfun = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const responce = await axios.post(
            'https://dummyjson.com/auth/refresh',
            {
                refreshToken: refreshToken,
                expiresInMins: 1,
            }
        );
        localStorage.setItem('token', responce?.data?.token);
        localStorage.setItem('refreshToken', responce?.data?.refreshToken);
        return responce;
    } catch (error) {
        console.error(error);
        localStorage.clear();
    }
};

const maxAge = 10000;
export const memoizeRefreshToken = memoize(refreshTokenfun, { maxAge });
