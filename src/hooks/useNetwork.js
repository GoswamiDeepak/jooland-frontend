import { useCallback, useState } from 'react';
import { axiosApi } from '../utils/axios-api';

import toast from 'react-hot-toast';

export default function useNetwork() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const apiHandler = useCallback(
        async (url, method = 'GET', userdata = null) => {
            setIsLoading(true);
            const toastId = toast.loading('Loading...');
            try {
                const responce = await axiosApi({
                    method,
                    url,
                    data: userdata,
                });
                toast.success('Successfully');
                setData(responce?.data);
                return responce;
            } catch (error) {
                setError(error.message);
                toast.error('error!');
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
