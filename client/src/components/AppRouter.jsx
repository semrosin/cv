import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { authRoutes, publicRoutes } from '../utils/routes';
import { Context } from "../main";
import { useContext } from "react";
import { COMMENTS_ROUTE } from "../utils/consts";
import OAuthCallback from "../pages/OAuthCallback";

const AppRouter = () => {
    const { userStore } = useContext(Context);
    const location = useLocation();

    return (
        <Routes>
            {userStore.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {!userStore.isAuth && (
                <Route path={COMMENTS_ROUTE} element={<Navigate to="/auth" state={{ from: location }} replace />} />
            )}
            <Route path="/oauth-success" element={<OAuthCallback />} />
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
        </Routes>
    );
};

export default AppRouter;
