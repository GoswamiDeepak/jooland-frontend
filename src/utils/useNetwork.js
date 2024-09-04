import { useCallback, useState } from 'react';
import { axiosApi } from './axios-api';

export default function useNetwork() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const apiHandler = useCallback(async (url, method = 'GET', data = null) => {
        setIsLoading(true);
        try {
            const data = await axiosApi({
                method,
                url,
                data,
            });
            setData(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        apiHandler,
        data,
        isLoading,
        error,
    };
}
