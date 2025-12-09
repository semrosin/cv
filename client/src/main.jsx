import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createContext } from 'react';
import UserStore from './store/UserStore';

export const Context = createContext(null);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Context.Provider value={{user: new UserStore()}}>
            <App />
        </Context.Provider>
    </StrictMode>,
)
