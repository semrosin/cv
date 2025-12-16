import {createRoot} from 'react-dom/client';
import App from './App';
import { createContext, StrictMode } from 'react';
import UserStore from './store/UserStore';
import { jwtDecode } from 'jwt-decode';
import './index.css';
import "./i18n";

export const Context = createContext({
  userStore: null,
});

const userStore = new UserStore();

const token = localStorage.getItem('token');
if (token) {
  try {
    const decoded = jwtDecode(token);
    userStore.setUser(decoded);
    userStore.setIsAuth(true);
    userStore.setLoading(false);
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');
    userStore.setLoading(false);
  }
} else {
  userStore.setLoading(false);
}

userStore.login = function(token) {
  localStorage.setItem('token', token);
  try {
    const decoded = jwtDecode(token);
    this.setUser(decoded);
    this.setIsAuth(true);
  } catch (error) {
    console.error('Invalid token:', error);
  }
};

userStore.logout = function() {
  localStorage.removeItem('token');
  this.setUser(null);
  this.setIsAuth(false);
};

const stores = {
  userStore
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context.Provider value={stores}>
      <App />
    </Context.Provider>
  </StrictMode>
);
