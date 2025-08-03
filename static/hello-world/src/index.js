import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log("Project Page index.js mounted");

// Use render instead of createRoot
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
