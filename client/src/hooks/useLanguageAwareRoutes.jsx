import { useParams } from 'react-router-dom';
import {
  MAIN_ROUTE,
  AUTH_ROUTE,
  COMMENTS_ROUTE,
  CONSENT_ROUTE
} from '../utils/consts';

const useLanguageAwareRoutes = () => {
  const { lang = 'ru' } = useParams();
  
  return {
    main: `/${lang}/${MAIN_ROUTE}`,
    auth: `/${lang}/${AUTH_ROUTE}`,
    comments: `/${lang}/${COMMENTS_ROUTE}`,
    consent: `/${lang}/${CONSENT_ROUTE}`,
    getPath: (route) => `/${lang}/${route}`
  };
};

export default useLanguageAwareRoutes