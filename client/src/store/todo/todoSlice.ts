import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TodoState } from '../../interfaces/interfaces';

const initialState: TodoState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        onAddNewTodo: (state, action: PayloadAction<any>) => {
            state.todos.push(action.payload);
        },
        onUpdateTodo: (state, action: PayloadAction<any>) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    console.log(action.payload);
                    return action.payload;
                }
                return todo;
            });
        },
        onToggleTodo: (state, action: PayloadAction<{ id: number }>) => {
            state.todos = state.todos.map(({ ...todo }) => {
                if (todo.id === action.payload.id) {
                    todo.completed = !todo.completed;
                    console.log({ ...todo });
                }
                return todo;
            });
        },
        onDeleteTodo: (state, action: PayloadAction<{ id: number }>) => {
            state.todos = state.todos.filter((todo) => {
                return todo.id !== action.payload.id;
            });
        },
        onLoadTodos: (state, { payload }: PayloadAction<[]>) => {
            state.todos = payload;
        },
    },
});

export const {
    onAddNewTodo,
    onToggleTodo,
    onDeleteTodo,
    onUpdateTodo,
    onLoadTodos,
} = todoSlice.actions;
