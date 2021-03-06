import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Cookies from 'universal-cookie';
import { AUTH_USER } from './actions/types';

// import vendor CSS
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import 'react-select/dist/react-select.css';
import 'react-notifications/lib/notifications.css';

import history from './history';
import { Router } from 'react-router-dom';
import App from './components/App';
import reducers from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const cookies = new Cookies();
const token = cookies.get('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
