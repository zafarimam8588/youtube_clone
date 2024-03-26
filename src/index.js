import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {appRouter} from "./App";
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);


reportWebVitals();
