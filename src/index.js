import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './util/stripe/stripe.util';

import './index.scss';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
     <PersistGate loading = {null} persistor={persistor}>
        <BrowserRouter>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
);