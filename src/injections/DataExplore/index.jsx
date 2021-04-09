import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from '../../features/middleware/loggerMiddleware';
import { initFeatureFlags } from '../../bootstrap/featureFlags';
import { initEnhancer } from '../../reduxUtils';
import getInitialState from './reducers/getInitialState';
import rootReducer from './reducers/index';
import initAsyncEvents from '../../features/middleware/asyncEvent';
import * as actions from '../../chart/chartAction';

import App from './App';

const exploreViewContainer = document.getElementById('app');
const bootstrapData = JSON.parse(
  exploreViewContainer.getAttribute('data-bootstrap'),
);
initFeatureFlags(bootstrapData.common.feature_flags);
const initState = getInitialState(bootstrapData);

const asyncEventMiddleware = initAsyncEvents({
  config: bootstrapData.common.conf,
  getPendingComponents: ({ charts }) =>
    Object.values(charts).filter(
      c => c.chartStatus === 'loading' && c.asyncJobId !== undefined,
    ),
  successAction: (componentId, componentData) =>
    actions.chartUpdateSucceeded(componentData, componentId),
  errorAction: (componentId, response) =>
    actions.chartUpdateFailed(response, componentId),
});

const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(thunk, logger, asyncEventMiddleware),
    initEnhancer(false),
  ),
);

ReactDOM.render(<App store={store} />, document.getElementById('app'));
