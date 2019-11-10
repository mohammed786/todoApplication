import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import todoAppReducer from "./todaAppReducer";
import rootSaga from "./totAppSaga";

function configureStore() {
  const sagaMiddleWare = createSagaMiddleware();

  const appliedMiddleWares = applyMiddleware(sagaMiddleWare);

  const middleware = composeWithDevTools(appliedMiddleWares);

  const store = createStore(todoAppReducer, middleware);

  sagaMiddleWare.run(rootSaga);

  return store;
}

export default configureStore;
