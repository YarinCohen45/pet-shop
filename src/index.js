import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0SCeVm0BEGp6qDVIGMV8j5raZQGFRsCY",
  authDomain: "pet-shop-41010.firebaseapp.com",
  projectId: "pet-shop-41010",
  storageBucket: "pet-shop-41010.appspot.com",
  messagingSenderId: "696950939104",
  appId: "1:696950939104:web:ec6456dd247fffacbb5f85",
  measurementId: "G-X3JE6VK3EM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
