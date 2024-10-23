import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import courseReducer from "./courseSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  courses: courseReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
