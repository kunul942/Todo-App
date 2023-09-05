import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState, Login } from '../../interfaces/interfaces';

const initialState: AuthState = {
    status: 'checking', // 'authenticated', 'not-authenticated',
    user: {
        uid: '',
        name: '',
        role: '',
    },
    errorMessage: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            (state.status = 'checking'),
                (state.user = {
                    uid: '',
                    role: '',
                    name: '',
                }),
                (state.errorMessage = undefined);
        },
        onLogin: (state, action: PayloadAction<Login>) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, action: PayloadAction<string | undefined>) => {
            state.status = 'not-authenticated';
            state.user = {
                uid: '',
                role: '',
                name: '',
            };
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
    },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
    authSlice.actions;
