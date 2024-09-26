import React, { useEffect } from 'react';
import useNetwork from '../hooks/useNetwork';
import { Product } from '../components/Product/index';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../slices/Product/productSlice';
import Loader from '../components/Loader';
import { loggedIn } from '../slices/user/userSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { apiHandler, data, isLoading, error } = useNetwork();

    useEffect(() => {
        (async () => {
            const userResponse = await apiHandler('/user');
            dispatch(loggedIn(userResponse.data.data));
        })();
    }, []);

    if (isLoading) return <Loader />;

    if (data) {
        return (
            <>
                <Product />
            </>
        );
    }
};

export default Home;
