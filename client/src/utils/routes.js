import ConversationPage from "../pages/Conversation.jsx";
import AuthPage from "../pages/Auth.jsx";
import MainPage from "../pages/Main/Main.jsx";
import {
  AUTH_ROUTE,
  COMMENTS_ROUTE,
  CONSENT_ROUTE,
  MAIN_ROUTE,
} from "./consts.js";
import ConsentPage from "../pages/Consent.jsx";

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: COMMENTS_ROUTE,
    Component: ConversationPage,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: AUTH_ROUTE,
    Component: AuthPage,
  },
  {
    path: CONSENT_ROUTE,
    Component: ConsentPage,
  },
];
