import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';
import store from './store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>  {/* Wrap your App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>
);
