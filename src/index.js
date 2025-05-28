import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
// If using React 17 or older, it would be: import ReactDOM from 'react-dom';
import './index.css'; // Optional: if you have a global src/index.css
import App from './App';
import reportWebVitals from './reportWebVitals'; // Optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you're using React 17 or older, the render part would be:
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Optional