import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {Provider} from "react-redux";
import {CssVarsProvider} from "@mui/joy";
import {store} from "@/assets/lib/data/store.ts";

import 'material-symbols';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "@/assets/css/scrollbar.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssVarsProvider
                defaultMode={"dark"}
                modeStorageKey="theme-mode"
            >
                <App/>
            </CssVarsProvider>
        </Provider>
    </React.StrictMode>,
)
