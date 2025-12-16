import { useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import { COMMENTS_ROUTE, AUTH_ROUTE } from "../utils/consts";

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const { userStore } = useContext(Context);

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") || "ru";
        
        if (token) {
            userStore.login(token);
            navigate(`/${savedLang}/${COMMENTS_ROUTE}`, { replace: true });
        } else {
            navigate(`/${savedLang}/${AUTH_ROUTE}`, { replace: true });
        }
    }, [token, navigate, userStore]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg">Logining...</p>
            </div>
        </div>
    );
};

export default OAuthCallback;