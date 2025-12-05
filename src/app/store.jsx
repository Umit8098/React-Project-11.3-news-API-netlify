import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice';
import newsReducer from '../features/newsSlice';
import themeReducer from '../features/themeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer,
        theme: themeReducer,
    },
});

export default store;