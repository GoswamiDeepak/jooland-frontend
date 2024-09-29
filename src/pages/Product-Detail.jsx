import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useNetwork from '../hooks/useNetwork';
import Text from '../components/Text';
import Loader from '../components/Loader';

export default function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { apiHandler, isLoading } = useNetwork();
    const [quantity, setQuantity] = useState(1);
    const [sizes, setSizes] = useState('');
    const [colors, setColors] = useState('');
    const [product, setProduct] = useState({});
    const [activeImage, setActiveImage] = useState('');
    const [zoomImage, setZoomImage] = useState(false);
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        (async function () {
            const response = await apiHandler(`/product/${id}`);
            setProduct(response.data.data);
        })();
    }, [id]);

    const quantityInc = () => {
        if (product.stock >= 1) {
            setQuantity((prev) => prev + 1);
        }
    };
    const quantityDecr = () => {
        if (product.stock >= 1) {
            quantity > 1 && setQuantity((prev) => prev - 1);
        }
    };

    const sizeHandler = (value) => {
        if (product.stock >= 1) {
            // if (sizes.includes(value)) {
            //     setSizes(sizes.filter((size) => size !== value));
            // } else {
            //     setSizes((prev) => [...prev, value]);
            // }
            setSizes([value]);
        }
    };

    const colorHandler = (value) => {
        if (product.stock >= 1) {
            // if (colors.includes(value)) {
            //     setColors(colors.filter((color) => color !== value));
            // } else {
            //     setColors((prev) => [...prev, value]);
            // }
            setColors([value]);
        }
    };

    const cartHandler = async () => {
        await apiHandler(
            '/cart/create-cart',
            'POST',
            {
                product: id,
                quantity: Number(quantity),
                colors: colors.join(','),
                sizes: sizes.join(','),
            },
            'Added to cart'
        );
        const response = await apiHandler('/cart')
        setSizes('');
        setColors('');
        setQuantity(1);
        navigate('/cart');
    };

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
        setZoomImage(true);
    };

    const handleMouseMoveProduct = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setZoomImageCoordinate({ x, y });
    };

    const handleMouseLeaveProduct = () => {
        setZoomImage(false);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16"> 
            <div className="pt-8">
                {/* Breadcrumb and other content */}
                <div className="flex items-center">
                    <ol className="flex w-full items-center overflow-hidden">
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a href="#">Home</a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a className="capitalize" href="#">
                                products
                            </a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a className="capitalize" href="#">
                                Nike Shoes
                            </a>
                        </li>
                    </ol>
                </div>
            </div>

            <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {product?.images?.map((image) => (
                        <div
                            key={image}
                            className="col-span-1 transition duration-150 ease-in hover:opacity-90"
                            onMouseEnter={() => handleMouseEnterProduct(image)}>
                            <img
                                src={image}
                                alt={product?.title}
                                className="w-full object-cover"
                                onMouseMove={handleMouseMoveProduct}
                                onMouseLeave={handleMouseLeaveProduct}
                            />
                        </div>
                    ))}
                </div>

                <div className="col-span-4 pt-8 lg:pt-0 relative">
                    {zoomImage && (
                        <div className="absolute top-0 left-0 w-[200px] h-full">
                            <div
                                className="min-h-[200px] max-w-[300px]  scale-150"
                                style={{
                                    background: `url(${activeImage})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: `${
                                        zoomImageCoordinate.x * 100
                                    }% ${zoomImageCoordinate.y * 100}%`,
                                }}
                            />
                        </div>
                    )}

                    <div className="mb-7 border-b border-gray-300 pb-7">
                        <Text
                            elementType="h2"
                            style="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                            {product?.title}
                        </Text>
                        <Text
                            elementType="p"
                            style="text-body text-sm leading-6 lg:text-base lg:leading-8">
                            {product?.description}
                        </Text>
                        <div className="mt-5 flex items-center ">
                            <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                                ${product?.price}
                            </div>
                            <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                                $50.00
                            </span>
                        </div>
                    </div>

                    {/* Size, Color, Quantity, and Cart Buttons */}
                    <div className="border-b border-gray-300 pb-3  ">
                        <div className="mb-4">
                            <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                                size
                            </h3>
                            <ul className="colors -mr-3 flex flex-wrap">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <li
                                        key={size}
                                        onClick={() => sizeHandler(size)}
                                        className={`text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border  p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ${
                                            sizes.includes(size)
                                                ? 'border-black'
                                                : 'border-gray-100'
                                        }  ${
                                            product?.stock == 0 &&
                                            'cursor-not-allowed'
                                        }`}>
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4 ">
                            <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                                color
                            </h3>
                            <ul className="colors -mr-3 flex flex-wrap">
                                {[
                                    'bg-orange-400',
                                    'bg-pink-400',
                                    'bg-violet-600',
                                    'bg-red-500',
                                ].map((color) => (
                                    <li
                                        key={color}
                                        onClick={() => colorHandler(color)}
                                        className={`text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border  p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm ${
                                            colors.includes(color)
                                                ? 'border-black'
                                                : 'border-gray-100'
                                        } ${
                                            product?.stock == 0 &&
                                            'cursor-not-allowed'
                                        }`}>
                                        <span
                                            className={`block h-full w-full rounded ${color}`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                        <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                            <button
                                className={`text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12 ${
                                    product?.stock == 0 && 'cursor-not-allowed'
                                }`}
                                onClick={quantityInc}
                                // disabled
                            >
                                +
                            </button>
                            <span
                                className={`duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24 `}>
                                {quantity}
                            </span>
                            <button
                                className={`text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12 ${
                                    quantity == 1 && 'cursor-not-allowed'
                                } ${
                                    product?.stock == 0 && 'cursor-not-allowed'
                                }`}
                                onClick={quantityDecr}>
                                -
                            </button>
                        </div>
                        {product?.stock > 0 ? (
                            <button
                                onClick={cartHandler}
                                type="button"
                                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                Add to cart
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                disabled>
                                Notify me
                            </button>
                        )}
                    </div>
                    <div className="py-6 ">
                        <ul className="space-y-5 pb-1 text-sm">
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">
                                    SKU:
                                </span>
                                N/A
                            </li>
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">
                                    Category:
                                </span>
                                <a
                                    className="hover:text-heading transition hover:underline"
                                    href="#">
                                    {product?.category}
                                </a>
                            </li>
                            <li className="productTags">
                                <span className="text-heading inline-block pr-2 font-semibold">
                                    Tags:
                                </span>
                                {product?.tags?.map((tag, index) => (
                                    <a
                                        key={tag}
                                        className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                                        href="#">
                                        {tag}
                                    </a>
                                ))}
                            </li>
                        </ul>
                    </div>
                    <div className="shadow-sm ">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Product Details
                            </h2>
                            <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                <div className="bg-heading h-0.5 w-full rounded-sm" />
                                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                            </div>
                        </header>
                        <div>
                            <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                                Our Customer Experience Team is available 7 days
                                a week and we offer 2 ways to get in
                                contact.Email and Chat . We try to reply
                                quickly, so you need not to wait too long for a
                                response!.
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Additional Information
                            </h2>
                        </header>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Customer Reviews
                            </h2>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    );
}
