import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const reducer = combineReducers({
    users: UserReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer
})

export default store