import React from 'react';
import { createRoot } from "react-dom/client";
import App from './components/App.jsx';
import './css/styles.scss'; 

// uncomment so that webpack can bundle styles
//import styles from './scss/application.scss';

const root = createRoot(document.querySelector("#root"));
root.render(<App />);