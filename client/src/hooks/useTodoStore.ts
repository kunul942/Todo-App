import { useAppDispatch, useAppSelector } from '../store/store';
import { todoApi } from '../api';

import {
    onAddNewTodo,
    onToggleTodo,
    onDeleteTodo,
    onUpdateTodo,
    onLoadTodos,
} from '../store/todo/todoSlice';

import { Todo } from '../interfaces/interfaces';

export interface saveTodoProp {
    desc: string;
    completed: boolean;
}

export const useTodoStore = () => {
    const dispatch = useAppDispatch();
    const { todos } = useAppSelector(({ todo }) => todo);
    const { user } = useAppSelector(({ auth }) => auth);

    const startSavingTodo = async (todo: saveTodoProp) => {
        try {
            const resp = await todoApi.post('/todo/', todo);
            dispatch(onAddNewTodo({ ...todo, id: resp.data.todo.id, user }));
        } catch (error) {
            console.log({ error }, 'Error create TODO');
        }
    };

    const startUpdatingTodo = async (todo: Todo) => {
        try {
            const resp = await todoApi.put(`/todo/${todo.id}`, todo);
            dispatch(onUpdateTodo({ ...todo, id: resp.data.id, user }));
        } catch (error) {
            console.log({ error }, 'error en updateTODO');
        }
    };

    const startDeletingTodo = async (id: number) => {
        try {
            const resp = await todoApi.delete(`/todo/${id}`);
            console.log({ resp });

            dispatch(onDeleteTodo({ id }));
        } catch (error) {
            console.log({ error }, 'Error deleteTODO');
        }
    };

    const toggleTodo = async (id: number) => {
        try {
            const resp = await todoApi.put(`/todo/toggle/${id}`);
            console.log({ resp });

            dispatch(onToggleTodo({ id }));
        } catch (error) {
            console.log({ error }, 'Error deleteTODO');
        }
    };

    const startLoadingTodos = async () => {
        try {
            const resp = await todoApi.get('/todo/');
            dispatch(onLoadTodos(resp.data?.todos));
        } catch (error) {
            console.log({ error }, 'Error loading todos');
        }
    };

    return {
        //* Properties
        todos,
        user,

        //* Methods
        startSavingTodo,
        startLoadingTodos,
        startUpdatingTodo,
        startDeletingTodo,
        toggleTodo,
        todosCount: todos.length,
        completedCounTodos: todos.filter((todo) => todo.completed).length,
        pendingCountTodos: todos.filter((todo) => !todo.completed).length,
    };
};
