import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { rootReducer } from './redux/reducer/Store';
import { Toaster } from 'react-hot-toast';
import { SocketContexProvider } from './Socket/SocketContext';

const store = configureStore({
  reducer:rootReducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
         
          <Provider store={store}>
          <SocketContexProvider>
            <App />
            <Toaster/>
          </SocketContexProvider>
           
          </Provider>
        
          
        
      </BrowserRouter> 
  </React.StrictMode>
);

