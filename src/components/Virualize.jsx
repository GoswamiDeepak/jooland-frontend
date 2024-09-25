import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DynamiceText from './DynamiceText';
import ButtonType from './Button-Type';
import Loader from './Loader';
import { FixedSizeList as List } from 'react-window';

export function Card() {
    const productData = useSelector((state) => state.product.product);
    const [columns, setColumns] = useState(1);

    // Dynamically set columns based on screen size
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth >= 1024) {
                setColumns(3); // 3 columns for large screens
            } else if (window.innerWidth >= 768) {
                setColumns(2); // 2 columns for medium screens
            } else {
                setColumns(1); // 1 column for small screens
            }
        };

        window.addEventListener('resize', updateColumns);
        updateColumns();

        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Calculate row count by dividing total products by columns
    const rowCount = Math.ceil(productData.length / columns);

    // Render each product item inside the grid
    const ProductItem = ({ index, style }) => {
        const startIndex = index * columns; // Start index for each row
        const items = productData.slice(startIndex, startIndex + columns); // Get items for the row

        return (
            <div
                style={style}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((product, i) => (
                    <Link
                        key={product?.id}
                        to={`product/${startIndex + i + 1}`}>
                        <div className="rounded-md border">
                            <img
                                src={product?.thumbnail}
                                alt="Laptop"
                                className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[200px] lg:h-[200px]"
                                loading="lazy"
                            />
                            <div className="p-4">
                                <DynamiceText
                                    elementType="h1"
                                    style="inline-flex items-center text-lg font-semibold">
                                    {product?.title}
                                </DynamiceText>
                                <DynamiceText
                                    elementType="p"
                                    style="mt-3 text-sm text-gray-600">
                                    {product?.description}
                                </DynamiceText>
                                <div className="mt-4">
                                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                        #{product?.tags[0]}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center space-x-2">
                                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
                                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
                                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
                                </div>
                                <div className="mt-5 flex items-center space-x-2">
                                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                        8 UK
                                    </span>
                                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                        9 UK
                                    </span>
                                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                        10 UK
                                    </span>
                                </div>
                                <ButtonType
                                    type="button"
                                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                    Add to Cart
                                </ButtonType>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-2 py-10">
            {productData.length > 0 ? (
                <List
                    height={600} // The height of the window area
                    itemCount={rowCount} // Total number of rows
                    itemSize={350} // Height of each row
                    width={'100%'} // Set to full width
                >
                    {ProductItem}
                </List>
            ) : (
                <Loader />
            )}
        </div>
    );
}
