import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { Provider } from 'react-redux';
import { createStore, Middleware, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import App from './App';
import toadstoolApp from './reducers';
import * as serviceWorker from './serviceWorker';


const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
const store = createStore(toadstoolApp, applyMiddleware(...middleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
