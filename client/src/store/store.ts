import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { authSlice, chatSlice, todoSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        todo: todoSlice.reducer,
        chat: chatSlice.reducer,
    },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
