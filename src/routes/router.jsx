import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductDetail from '../pages/Product-Detail';
import Cart from '../pages/cart';
import Checkout from '../pages/Checkout';
import Order from '../pages/Order';
import Signup from '../pages/Signup';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/product/:id',
                element: <ProductDetail />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/checkout',
                element: <Checkout />,
            },
            {
                path: '/order',
                element: <Order />,
            },
        ],
    },
]);
