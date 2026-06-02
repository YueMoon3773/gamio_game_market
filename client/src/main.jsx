import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import routes from './routes/routes';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { GameHelperProvider } from './hooks/useGamesHelper.jsx';
import { InfoBadgeProvider } from './hooks/useInfoBadge.jsx';
import { AuthenticationContextProvider } from './hooks/useAuthenticate.jsx';

import './index.scss';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticationContextProvider>
            <ThemeProvider>
                <GameHelperProvider>
                    <InfoBadgeProvider>
                        <RouterProvider router={router} />
                    </InfoBadgeProvider>
                </GameHelperProvider>
            </ThemeProvider>
        </AuthenticationContextProvider>
    </StrictMode>,
);
