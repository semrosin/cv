import AuthPage from './pages/Auth';
import MainPage from './pages/Main/Main.jsx';
import { AUTH_ROUTE , VOTABLE_ROUTE, UNVOTABLE_ROUTE } from './utils/consts';

export const authRoutes = [
    {
        path: VOTABLE_ROUTE,
        Component: MainPage,
    },
];

export const publicRoutes = [
    {
        path: UNVOTABLE_ROUTE,
        Component: MainPage,
    },
    {
        path: AUTH_ROUTE,
        Component: AuthPage,
    },
];