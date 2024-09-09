import React, { useEffect } from 'react';
import useNetwork from '../hooks/useNetwork';
import { Product } from '../components/Product';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../slices/Product/productSlice';
import Loader from '../components/Loader';

const Home = () => {
    const dispatch = useDispatch();
    const { apiHandler, data, isLoading, error } = useNetwork();

    useEffect(() => {
        const fetchData = async () => {
            await apiHandler('auth/me');
            const responce = await apiHandler('products');
            dispatch(fetchProduct(responce?.data?.products));
        };
        fetchData();
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
