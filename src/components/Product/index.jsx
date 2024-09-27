import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import Text from '../Text';
import Pagination from '../Pagination';
import useNetwork from '../../hooks/useNetwork';
import { useDispatch } from 'react-redux';
import { fetchProduct } from '../../slices/Product/productSlice';
import Loader from '../Loader';
import MobileFilter from '../MobileFilter';
import Filter from '../Filter';

const limit = 5;

export function Product() {
    const dispatch = useDispatch();
    const { apiHandler, isLoading } = useNetwork();

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({});

    const pageHandler = (value) => {
        setPage(value);
    };

    useEffect(() => {
        (async function () {
            const responce = await apiHandler(
                `/product?page=${page}&limit=${limit}`
            );
            dispatch(fetchProduct(responce.data.data));
        })();
    }, [page]);

    return (
        <section className="w-full">
            <div className="mx-auto max-w-7xl px-2 py-10 lg:px-10">
                <div className="md:flex md:flex-row md:items-start md:justify-between w-full">
                    <Text elementType="h1" style="text-xl font-bold">
                        Product
                    </Text>
                    <MobileFilter />
                </div>
                <hr className="my-8" />
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
                    <div className="hidden space-y-6 divide-y lg:block lg:col-span-3 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">
                        <Filter />
                    </div>
                    <div className="h-[400px] w-full rounded-lg border-2 border-dashed px-2 lg:col-span-9 lg:h-full">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <Card />
                                <Pagination
                                    onPageHandler={pageHandler}
                                    currentPage={page}
                                    limit={limit}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
