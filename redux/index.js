import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

import rootSaga from "sagas";
import rootReducer from "./reducer";

export default initialState => {
  let store;

  const sagaMiddleware = createSagaMiddleware();

  const isClient = typeof window !== "undefined";

  if (isClient) {
    const { persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["user"]
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      applyMiddleware(sagaMiddleware)
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware)
    );
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
