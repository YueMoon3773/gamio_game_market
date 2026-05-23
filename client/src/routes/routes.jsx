import { motion } from 'framer-motion';
import { VideoBgChangeProvider } from '../hooks/useVideoBgChange';
import AnimatedLayout from '../components/layout/AnimatedLayout/AnimatedLayout';

import App from '../App';
import ErrorPage from '../components/pages/ErrorPage/ErrorPage';
import ViewGames from '../components/pages/ViewGames/ViewGames';
import GameDetails from '../components/pages/GameDetails/GameDetails';

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
                path: '/games/:types',
                element: <ViewGames />,
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
            {
                path: '/game-detail',
                element: <GameDetails />,
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
            {
                path: '/error',
                element: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
                errorElement: (
                    <VideoBgChangeProvider>
                        <ErrorPage />
                    </VideoBgChangeProvider>
                ),
            },
        ],
    },
];

export default routes;
