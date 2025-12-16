import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { authRoutes, publicRoutes } from '../utils/routes';
import { Context } from "../main";
import LangLayout from "../layouts/LangLayout";
import { useContext } from "react";
import { COMMENTS_ROUTE, AUTH_ROUTE } from "../utils/consts";
import OAuthCallback from "../pages/OAuthCallback";

const AppRouter = () => {
    const { userStore } = useContext(Context);
    const location = useLocation();
    const defaultLang = localStorage.getItem("lang") || "ru"

    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/" + defaultLang} replace />} />
            <Route path={"oauth-success"} element={<OAuthCallback />} />
            <Route path=":lang" element={<LangLayout />}>
                {userStore.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
                {!userStore.isAuth && (
                    <Route path={COMMENTS_ROUTE} element={<Navigate to={`/${location.pathname.split('/')[1] || 'ru'}/${AUTH_ROUTE}`} state={{ from: location }} replace />} />
                )}
            </Route>
            <Route
                 path="*"
                element={<Navigate to="/ru" />}
            />
        </Routes>
    );
};

export default AppRouter;
