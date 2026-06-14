import { motion } from 'framer-motion';
import { VideoBgChangeProvider } from '../hooks/useVideoBgChange';
import AnimatedLayout from '../components/layout/AnimatedLayout/AnimatedLayout';

import App from '../App';
import ErrorPage from '../components/pages/ErrorPage/ErrorPage';
import ViewGames from '../components/pages/ViewGames/ViewGames';
import GameDetails from '../components/pages/GameDetails/GameDetails';
import UserAuthenticationPage from '../components/pages/UserAuthenticationPage/UserAuthenticationPage';
import ViewCart from '../components/pages/ViewCart/ViewCart';

const routes = [
    {
        element: <AnimatedLayout />,
        children: [
            {
                path: '/',
                element: (
                    <VideoBgChangeProvider>
                        <App />
                    </VideoBgChangeProvider>
                ),
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
            {
                path: '/games/:viewTypes',
                element: <ViewGames />,
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
            {
                path: '/game-detail/:gameId',
                element: <GameDetails />,
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
            {
                path: '/cart',
                element: <ViewCart />,
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
            {
                path: '/user/auth',
                element: <UserAuthenticationPage />,
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
            {
                path: '*',
                element: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
        ],
    },
];

export default routes;
