import React, { useEffect } from 'react';
import useNetwork from '../hooks/useNetwork';
import Product from '../components/Product/index';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../slices/user/userSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { apiHandler } = useNetwork();

    useEffect(() => {
        (async () => {
            const userResponse = await apiHandler('/user');
            dispatch(loggedIn(userResponse.data.data));
        })();
    }, []);

    return (
        <>
            <Product />
        </>
    );
};

export default Home;
