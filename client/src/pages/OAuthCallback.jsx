import { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { COMMENTS_ROUTE } from '../utils/consts';

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const { userStore } = useContext(Context);

    useEffect(() => {
        if (token) {
            userStore.login(token);
            navigate(COMMENTS_ROUTE, { replace: true });
        } else {
            navigate('/auth', { replace: true });
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