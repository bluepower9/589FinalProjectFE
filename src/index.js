import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './styles.css';
import reportWebVitals from './reportWebVitals';
import setConfigs from './conf.js';

console.log('settings')
setConfigs();

// localStorage.clear();


const root = ReactDOM.createRoot(document.getElementById('root'));

             
// function autosize(){
//   var el = this;
//   setTimeout(function(){
//     el.style.cssText = 'min-height:37px; height: 37px;';
//     el.style.cssText = 'height:' + el.scrollHeight + 'px';
//   },0);
// }

root.render(
  <body class="relative flex z-0 h-screen bg-gray-700">
    <App />
  </body>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
