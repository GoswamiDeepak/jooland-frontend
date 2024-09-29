import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import instance from '../utils/axios-withCookie';

export default function useNetwork() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const apiHandler = useCallback(
        async (
            url,
            method = 'GET',
            userdata = null,
            message = 'successfully'
        ) => {
            setIsLoading(true);
            const toastId = toast.loading('Loading...');
            try {
                const responce = await instance({
                    method,
                    url,
                    data: userdata,
                });
                toast.success(message);
                setData(responce?.data);
                return responce;
            } catch (error) {
                setError(error.message);
                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
                toast.dismiss(toastId);
            }
        },
        []
    );

    return {
        apiHandler,
        data,
        isLoading,
        error,
    };
}
