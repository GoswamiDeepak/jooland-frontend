import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DynamiceText from './DynamiceText';
import ButtonType from './Button-Type';
import Loader from './Loader';
import { FixedSizeList } from 'react-window';

export function Card() {
    const productData = useSelector((state) => {
        return state.product.product;
    });

    const Tags = ({ tag }) => {
        return (
            <>
                {tag?.length > 0 &&
                    tag.map((tag) => (
                        <span
                            className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                            key={tag}>
                            #{tag}
                        </span>
                    ))}
            </>
        );
    };

    const Colors = () => {
        return (
            <>
                <div className="mt-3 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">
                        Colors :{' '}
                    </span>
                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
                </div>
            </>
        );
    };

    const Size = () => {
        return (
            <>
                <div className="mt-5 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">Size : </span>
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
            </>
        );
    };

    return (
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
            {productData?.map((product, i) => (
                <Link key={product?.id} to={`product/${i + 1}`}>
                    <div className="rounded-md border">
                        <img
                            src={product?.thumbnail}
                            alt="Laptop"
                            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
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
                                <Tags tag={product?.tags} />
                            </div>
                            <Colors />
                            <Size />
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
}
