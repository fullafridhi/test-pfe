import { configureStore,combineReducers } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import coursesSlice from './coursesSlice'
import videoSlice from './videoSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer=combineReducers({
  auth:authSlice,
  courses: coursesSlice,
  videos: videoSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState =ReturnType<typeof store.getState>
export type useAppDispatch=typeof store.dispatch;

export default store