import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatState, ChatStructure } from '../../interfaces/interfaces';

const initialState: ChatState = {
    messages: [],
    errorMessage: undefined,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        onAddNewMessage: (state, action: PayloadAction<ChatStructure>) => {
            state.messages.push(action.payload);
        },
        onDeleteMessage: (state, action: PayloadAction<any>) => {
            state.messages = state.messages.map((message) => {
                if (message._id === action.payload.id) {
                    message.status = false;
                    return message;
                }
                return message;
            });
        },
        onDeleteAllMessages: (state) => {
            state.messages = state.messages.map((message) => {
                message.status = false;
                return message;
            });
        },
        onLoadMessages: (state, action: PayloadAction<[]>) => {
            state.messages = action.payload;
        },
        onErrorMessage: (state, action: PayloadAction<string | undefined>) => {
            state.errorMessage = action.payload;
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
    },
});

export const {
    onAddNewMessage,
    onLoadMessages,
    onDeleteMessage,
    onDeleteAllMessages,
    onErrorMessage,
    onClearErrorMessage,
} = chatSlice.actions;
