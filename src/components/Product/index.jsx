import React, {
    useEffect,
    useLayoutEffect,
    useState,
    useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../slices/Product/productSlice';
import useNetwork from '../../hooks/useNetwork';
import debouceFunc from '../../utils/debouncFunc';
import Loader from '../Loader';
import Card from '../Card';
import Pagination from '../Pagination';
import MobileFilter from '../MobileFilter';
import DesktopFilter from '../Desktop-Filter';
import PriceRangeSlider from '../Price-Range';
import { total_items } from '../../config';
import Text from '../Text';

export default function Product() {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({});
    const [filter, setFilter] = useState({});
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isPriceRangeSet, setIsPriceRangeSet] = useState(false); // Tracks whether price range is set

    const dispatch = useDispatch();
    const priceRange = useSelector(
        (state) => state.product.priceRange || { minPrice: 0, maxPrice: 1000 }
    );
    const { apiHandler, isLoading } = useNetwork();

    //utility function for creating query strings
    const createQueryString = useCallback(() => {
        let queryString = '';

        //add filter to query string
        for (let key in filter) {
            const categoryValue = filter[key];
            if (categoryValue.length) {
                queryString += `${key}=${categoryValue.join(',')}&`;
            }
        }
        //add sorting to query string
        for (let key in sort) {
            queryString += `_${key}=${sort[key]}&`;
        }

        //add price range to the query string
        if (isPriceRangeSet) {
            queryString += `minPrice=${minPrice}&maxPrice=${maxPrice}&`;
        }

        //add pagination to the query string
        const pagination = { page: page, limit: total_items };
        for (let key in pagination) {
            queryString += `${key}=${pagination[key]}&`;
        }

        return queryString;
    }, [minPrice, maxPrice, filter, sort, page, isPriceRangeSet]);

    //Consolidated API call
    const fetchProducts = useCallback(async () => {
        const queryString = createQueryString();
        const response = await apiHandler(`/product?${queryString}`);
        dispatch(fetchProduct(response.data.data));
    }, [createQueryString, apiHandler, dispatch]);

    // Initial API call (without price filters)
    useEffect(() => {
        if (!isPriceRangeSet) {
            fetchProducts();
        }
    }, [fetchProducts, isPriceRangeSet]);

    //Price range setup(runs only once after initial load)
    useLayoutEffect(() => {
        if (
            priceRange?.minPrice !== undefined &&
            priceRange?.maxPrice !== undefined &&
            !isPriceRangeSet
        ) {
            setMinPrice(Math.floor(priceRange.minPrice));
            setMaxPrice(Math.ceil(priceRange.maxPrice));
            setIsPriceRangeSet(true);
        }
    }, [priceRange, isPriceRangeSet]);

    //Debounced API call for filter and price changes
    useEffect(() => {
        if (isPriceRangeSet) {
            const timeId = setTimeout(() => {
                fetchProducts();
            }, 1000); // 1-second debounce time
            return () => clearTimeout(timeId); // Cleanup timeout on unmount
        }
    }, [minPrice, maxPrice, filter, sort, fetchProducts, isPriceRangeSet]);

    //Handle changes for min and max price
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    // Handler for pagination
    const pageHandler = useCallback((value) => {
        setPage(value);
    }, []);

    // Handler for sorting
    const sortHandler = useCallback((value) => {
        const { sort, order } = value;
        const sortOption = { sort, order };
        setSort(sortOption);
    }, []);

    // Handler for filters
    const filterHandler = useCallback(
        (e, section, option) => {
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
        },
        [filter]
    );

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
                        <DesktopFilter onFilterHandler={filterHandler} />
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
                                    limit={total_items}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
