import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';
import { validateToken } from './util/Authentication.js';

import './styles.css';
import reportWebVitals from './reportWebVitals';
import setConfigs from './conf.js';

console.log('settings')
setConfigs();

await validateToken();

// localStorage.clear()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <body class="relative flex z-0 h-screen bg-gray-700">
    <App2 />
  </body>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
