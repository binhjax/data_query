import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from '@superset-ui/core';
import {
  initFeatureFlags,
  isFeatureEnabled,
  FeatureFlag,
} from 'src/bootstrap/featureFlags';
import getInitialState from './reducers/getInitialState';
import rootReducer from './reducers/index';
import { initEnhancer } from '../../reduxUtils';

import App from './components/App';

import {
  emptyQueryResults,
  clearQueryEditors,
} from './utils/reduxStateToLocalStorageHelper';
import { BYTES_PER_CHAR, KB_STORAGE } from './constants';
import setupApp from '../../bootstrap/setup/setupApp';

import './main.less';
import '../../../stylesheets/reactable-pagination.less';
import '../../components/FilterableTable/FilterableTableStyles.less';
import { theme } from '../preamble';

setupApp();

const appContainer = document.getElementById('app');
const bootstrapData = JSON.parse(appContainer.getAttribute('data-bootstrap'));

initFeatureFlags(bootstrapData.common.feature_flags);

// console.log("binhnt.injections.SqlSupport.App: bootstrapData=  ", JSON.stringify(bootstrapData))

const initialState = getInitialState(bootstrapData);

// console.log("binhnt.injections.SqlSupport.App: initialState=  ", JSON.stringify(initialState))

const sqlSupportPersistStateConfig = {
  paths: ['sqlSupport'],
  config: {
    slicer: paths => state => {
      const subset = {};
      paths.forEach(path => {
        // console.log("binhnt.injections.SqlSupport.App: sqlSupportPersistStateConfig: path = ", path)
        // this line is used to remove old data from browser localStorage.
        // we used to persist all redux state into localStorage, but
        // it caused configurations passed from server-side got override.
        // see PR 6257 for details
        delete state[path].common; // eslint-disable-line no-param-reassign
        if (path === 'sqlSupport') {
          subset[path] = {
            ...state[path],
            queries: emptyQueryResults(state[path].queries),
            queryEditors: clearQueryEditors(state[path].queryEditors),
          };
        }
      });

      const data = JSON.stringify(subset);
      // 2 digit precision
      const currentSize =
        Math.round(((data.length * BYTES_PER_CHAR) / KB_STORAGE) * 100) / 100;
      if (state.localStorageUsageInKilobytes !== currentSize) {
        state.localStorageUsageInKilobytes = currentSize; // eslint-disable-line no-param-reassign
      }

      return subset;
    },
  },
};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    initEnhancer(
      !isFeatureEnabled(FeatureFlag.SQLSUPPORT_BACKEND_PERSISTENCE),
      sqlSupportPersistStateConfig,
    ),
  ),
);

// Highlight the navbar menu
const menus = document.querySelectorAll('.nav.navbar-nav li.dropdown');
const sqlSupportMenu = Array.prototype.slice
  .apply(menus)
  .find(element => element.innerText.trim() === 'SQL Lab');
if (sqlSupportMenu) {
  const classes = sqlSupportMenu.getAttribute('class');
  if (classes.indexOf('active') === -1) {
    sqlSupportMenu.setAttribute('class', `${classes} active`);
  }
}

const Application = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

export default hot(Application);
