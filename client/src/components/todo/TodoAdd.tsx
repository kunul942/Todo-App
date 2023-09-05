import { FormEvent, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useTodoStore } from '../../hooks/useTodoStore';
import { TodoItem } from '.';

import add from '../../assets/agregar.png';

interface initialState {
    desc: string;
}

export const TodoAdd = () => {
    const {
        startSavingTodo,
        todos,
        todosCount,
        startLoadingTodos,
        pendingCountTodos,
        completedCounTodos,
    } = useTodoStore();

    const { formState, onInputChange, onResetForm } = useForm<initialState>({
        desc: '',
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formState.desc.length <= 1 || formState.desc.length >= 30) return;

        startSavingTodo({
            desc: formState.desc,
            completed: false,
        });
        onResetForm();
    };

    useEffect(() => {
        startLoadingTodos();
    }, []);

    return (
        <>
            <div className='w-[60%] 2xl:w-[50%] mx-auto mtx-8'>
                <form onSubmit={onSubmit} className='flex items-center'>
                    <div className='border-2 border-gray-500 rounded-2xl flex items-center w-full'>
                        <button type='submit'>
                            <img
                                src={add}
                                alt='add'
                                className='h-[30px] bg-pink-500 rounded-2xl ml-2 mr-6'
                            />
                        </button>
                        <input
                            type='text'
                            name='desc'
                            placeholder='Add a task'
                            value={formState.desc}
                            onChange={onInputChange}
                            className='backgroundColor py-2 rounded-2xl outline-none text-white w-full'
                        />
                    </div>
                </form>

                {formState.desc.length >= 30 ? (
                    <pre className='text-red-700 my-4'>
                        Task should be at least 30 digits
                    </pre>
                ) : (
                    <></>
                )}

                <div className='mt-14 mb-8'>
                    <div className='flex text-white'>
                        {todosCount === 0 ? (
                            <h1 className='text-xl'></h1>
                        ) : (
                            <h1 className='text-xl'>
                                Completed: {completedCounTodos}
                            </h1>
                        )}
                        {pendingCountTodos === 0 ? (
                            <h2 className='ml-auto text-xl mr-6'></h2>
                        ) : (
                            <h2 className='ml-auto text-xl mr-6'>
                                Pending: {pendingCountTodos}
                            </h2>
                        )}
                    </div>
                </div>
                <ul className='display_grid'>
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            desc={todo.desc}
                            // formDesc={formState.desc}
                            todoId={todo.id}
                            complete={todo.completed}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};
