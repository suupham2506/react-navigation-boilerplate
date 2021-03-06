import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import logger from 'redux-logger';
import reduxPersist from 'redux-toolkit/persist';
import {allReducers} from 'redux-toolkit/reducers';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

if (__DEV__) {
  middleware.push(logger);
}

const persistWraperReducer = persistReducer(reduxPersist, allReducers);

export const store = configureStore({
  reducer: persistWraperReducer,
  middleware,
  devTools: __DEV__,
});

export const persistor = persistStore(store);
