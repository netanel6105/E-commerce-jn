import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyContextTest from './context/myContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyContextTest>
    <App />
    </MyContextTest>
  
);
