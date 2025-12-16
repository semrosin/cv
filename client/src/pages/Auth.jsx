import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FaYandex } from 'react-icons/fa6';
import {FcGoogle} from "react-icons/fc"
import { CONSENT_ROUTE } from '../utils/consts';
import { useTranslation } from 'react-i18next';
import useLanguageAwareRoutes from '../hooks/useLanguageAwareRoutes';

const AuthPage = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const { t } = useTranslation();
    const routes = useLanguageAwareRoutes();
    
    const handleGoogleAuth = () => {
        window.location.href = `${API_URL}/auth/google`;
    };
    
    const handleGitHubAuth = () => {
        window.location.href = `${API_URL}/auth/github`;
    };
    
    const handleYandexAuth = () => {
        window.location.href = `${API_URL}/auth/yandex`;
    };
    
    return(
        <section className="flex flex-col justify-center items-center bg-black w-[100vw] h-[100vh] font-sans">
            <a href="/" className='absolute mb-125 px-2 bg-black' >
                <img src="/img/whiteLogo.png" alt="white kitten logo" width={"60px"} />
            </a>
            <div className="flex flex-col justify-between items-center border border-white rounded-2xl h-120 max-w-97 mx-8">
                <h4 className="flex-1 text-xl mx-10 mt-20 font-bold text-center">{t("title.login")}</h4>
                <div className="flex flex-col justify-center w-full gap-3 pb-7 px-6">
                    <p className="py-2 px-3 text-center">{t("consent.agree.pre")} <a href={routes.consent} className="text-pink-400">{t("consent.agree.link")}</a></p>
                    <div className="justify-center">
                        <button
                            onClick={handleGoogleAuth}
                            className="flex items-center justify-center w-full border border-blue-600 rounded-lg p-2 hover:shadow-[0_0_18px_var(--color-blue-600)] cursor-pointer"
                        >
                            <FcGoogle size={20} className="mr-2" />
                        </button>
                    </div>
                    <div className="justify-center">
                        <button
                            onClick={handleYandexAuth}
                            className="flex items-center justify-center w-full border border-red-600 rounded-lg p-2 cursor-pointer hover:shadow-[0_0_18px_var(--color-red-600)] text-red-600"
                        >
                            <FaYandex size={20} className="mr-2" />
                        </button>
                    </div>
                    <div className="justify-center">
                        <button
                            onClick={handleGitHubAuth}
                            className="flex items-center justify-center w-full border border-white rounded-lg p-2 cursor-pointer hover:shadow-[0_0_18px_white]"
                        >
                            <FaGithub size={20} className="mr-2" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthPage;