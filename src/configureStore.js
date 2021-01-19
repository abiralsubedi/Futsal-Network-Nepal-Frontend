import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import mySaga from "sagas";

export default (initialState = {}) => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // add redux dev tool
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // mount reducer and saga on the Store
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  // then run the saga
  sagaMiddleware.run(mySaga);

  // setup store for cypress
  if (window.Cypress) {
    window.__store__ = store;
  }

  return store;
};
