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
    const [filter, setFilter] = useState({});

    const pageHandler = (value) => {
        setPage(value);
    };

    const sortHandler = (value) => {
        const { sort, order } = value;
        const sortOption = { sort, order };
        setSort(sortOption);
    };

    const filterHandler = (e, section, option) => {
        const newFilter = { ...filter };
        if (e.target.checked) {
            if (newFilter[section.id]) {
                newFilter[section.id].push(option.value);
            } else {
                newFilter[section.id] = [option.value];
            }
        } else {
            const index = newFilter[section.id].findIndex(
                (el) => el === option.value
            );
            newFilter[section.id].splice(index, 1);
        }
        console.log(newFilter);
        setFilter(newFilter);
    };

    useEffect(() => {
        (async function () {
            // filter = {"category":["smartphone","laptops"]}
            // sort = {_sort:"price",_order="desc"}
            // pagination = {page:1,limit=10}

            let queryString = '';

            for (let key in filter) {
                const categoryValue = filter[key];
                if (categoryValue.length) {
                    queryString += `${key}=${categoryValue.join(',')}&`;
                }
            }
            for (let key in sort) {
                queryString += `_${key}=${sort[key]}&`;
            }
            const pagination = { page: page, limit: limit };
            for (let key in pagination) {
                queryString += `${key}=${pagination[key]}&`;
            }

            const responce = await apiHandler(`/product?${queryString}`);
            dispatch(fetchProduct(responce.data.data));
        })();
    }, [page, sort, filter]);

    return (
        <section className="w-full">
            <div className="mx-auto max-w-7xl px-2 py-10 lg:px-10">
                <div className="md:flex md:flex-row md:items-start md:justify-between w-full">
                    <Text elementType="h1" style="text-xl font-bold">
                        Product
                    </Text>
                    <MobileFilter onSortFilter={sortHandler} />
                </div>
                <hr className="my-8" />
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
                    <div className="hidden space-y-6 divide-y lg:block lg:col-span-3 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">
                        <Filter onFilterHandler={filterHandler} />
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
