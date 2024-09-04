import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import Home from '../pages/Home';
import Login from '../pages/Login';

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
        ],
    },
]);
