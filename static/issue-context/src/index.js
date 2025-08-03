import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Issue Context index.js mounted");

// Use createRoot instead of render
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
