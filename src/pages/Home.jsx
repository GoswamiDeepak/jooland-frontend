import React, { useEffect } from 'react';
import useNetwork from '../hooks/useNetwork';
import { Navbar } from '../components/Navbar';
import { Product } from '../components/Product';

const Home = () => {
    const { apiHandler, data, isLoading, error } = useNetwork();
    useEffect(() => {
        apiHandler('auth/me');
    }, []);

    if (isLoading) return <div>Loading...</div>;

    if (data) {
        return (
            <>
                <Navbar />
                <Product />
            </>
        );
    }
};

export default Home;
