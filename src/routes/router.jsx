import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../components/Loader';

const Layout = lazy(() => import('../layout'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const ProductDetail = lazy(() => import('../pages/Product-Detail'));
const Cart = lazy(() => import('../pages/cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Order = lazy(() => import('../pages/Order'));
const Signup = lazy(() => import('../pages/Signup'));

// import Layout from '../layout';
// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import ProductDetail from '../pages/Product-Detail';
// import Cart from '../pages/cart';
// import Checkout from '../pages/Checkout';
// import Order from '../pages/Order';
// import Signup from '../pages/Signup';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: '/signup',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Signup />
                    </Suspense>
                ),
            },
            {
                path: '/product/:id',
                element: (
                    <Suspense fallback={<Loader />}>
                        <ProductDetail />
                    </Suspense>
                ),
            },
            {
                path: '/cart',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Cart />
                    </Suspense>
                ),
            },
            {
                path: '/checkout',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Checkout />
                    </Suspense>
                ),
            },
            {
                path: '/order',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Order />
                    </Suspense>
                ),
            },
        ],
    },
]);
