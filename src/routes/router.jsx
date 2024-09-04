import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductDetail from '../pages/Product-Detail';
import Cart from '../pages/cart';
import Checkout from '../pages/Checkout';
import Order from '../pages/Order';

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
