import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { Card } from '../Card';
import Text from '../Text';
import Pagination from '../Pagination';
import useNetwork from '../../hooks/useNetwork';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../slices/Product/productSlice';
import Loader from '../Loader';
import MobileFilter from '../MobileFilter';
import Filter from '../Filter';
import PriceRangeSlider from '../Price-Range';
import debouceFunc from '../../utils/debouncFunc';

const limit = 5;

export function Product() {
    const dispatch = useDispatch();
    const priceRange = useSelector(
        (state) => state.product.priceRange || { minPrice: 0, maxPrice: 1000 }
    );

    const { apiHandler, isLoading } = useNetwork();

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({});
    const [filter, setFilter] = useState({});
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isPriceRangeSet, setIsPriceRangeSet] = useState(false); // Tracks whether price range is set

    // Phase 1: First API call without price filters
    useEffect(() => {
        const fetchInitialProducts = async () => {
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

            const response = await apiHandler(`/product?${queryString}`);
            dispatch(fetchProduct(response.data.data));
        };

        if (!isPriceRangeSet) {
            // Call only once at the beginning
            fetchInitialProducts();
        }
    }, [page, sort, filter, dispatch, apiHandler, isPriceRangeSet]);

    // Phase 2: Update minPrice and maxPrice based on priceRange
    useLayoutEffect(() => {
        if (
            priceRange?.minPrice !== undefined &&
            priceRange?.maxPrice !== undefined &&
            !isPriceRangeSet
        ) {
            setMinPrice(Math.floor(priceRange.minPrice));
            setMaxPrice(Math.ceil(priceRange.maxPrice));
            setIsPriceRangeSet(true); // Ensure the second call happens only after price range is set
        }
    }, [priceRange, isPriceRangeSet]);

    // Handle changes for min and max price
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1); // always less than maxPrice
        setMinPrice(value);
    };

    const handleMaxChange = (e) => {
        console.log(e.target.value);
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    // const maxPriceChange = useCallback(debouceFunc(handleMaxChange, 200), []);
    // const maxPriceChange = debouceFunc(handleMaxChange, 200);

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
        setFilter(newFilter);
    };

    // Phase 3: API call with updated minPrice and maxPrice
    useEffect(() => {
        const fetchFilteredProducts = async () => {
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

            // Include minPrice and maxPrice in the query
            if (minPrice && maxPrice) {
                queryString += `minPrice=${minPrice}&maxPrice=${maxPrice}&`;
            }

            const pagination = { page: page, limit: limit };
            for (let key in pagination) {
                queryString += `${key}=${pagination[key]}&`;
            }

            const response = await apiHandler(`/product?${queryString}`);
            dispatch(fetchProduct(response.data.data));
        };

        if (isPriceRangeSet) {
            fetchFilteredProducts();
        }
    }, [
        minPrice,
        maxPrice,
        page,
        sort,
        filter,
        apiHandler,
        dispatch,
        isPriceRangeSet,
    ]);

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
                        <PriceRangeSlider
                            min={Math.floor(priceRange?.minPrice) || ''}
                            max={Math.ceil(priceRange?.maxPrice) || ''}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onMinChange={handleMinChange}
                            onMaxChange={handleMaxChange}
                        />
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
