import { useState, FormEvent } from 'react';
import Modal from 'react-modal';

import { useTodoStore } from '../../hooks/useTodoStore';
import { useForm } from '../../hooks/useForm';
import { Todo } from '../../interfaces/interfaces';

import checkTodo from '../../assets/todoChecked.png';
import close from '../../assets/close.png';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

interface TodoItemProp {
    desc: string;
    todoId: number;
    complete: boolean;
}

export const TodoItem = ({ desc, todoId, complete }: TodoItemProp) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { toggleTodo, startDeletingTodo, startUpdatingTodo } = useTodoStore();

    const { formState, onInputChange } = useForm({
        desc: desc,
    });

    const onOpenModal = () => {
        setModalIsOpen(true);
    };

    const onCloseModal = () => {
        setModalIsOpen(false);
    };

    const onDeleteClick = () => {
        confirm('Are you sure you want to delete it?') &&
            startDeletingTodo(todoId);
    };

    const onToggleClick = () => {
        toggleTodo(todoId);
    };

    const onUpdateClick = (payload: Todo) => {
        if (formState.desc.length <= 1 || formState.desc.length >= 30) return;

        startUpdatingTodo(payload);
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onUpdateClick({
            id: todoId,
            desc: formState.desc,
            completed: complete,
        });
    };

    return (
        <>
            <div>
                <div className='h-auto backgroundColorTodo rounded-2xl mb-8 mr-6'>
                    <div className='flex p-4'>
                        {complete ? (
                            <img
                                src={checkTodo}
                                alt='checkTodo'
                                onClick={onToggleClick}
                                className={`h-[30px] w-[30px] bg-purple-500 rounded-2xl mr-4`}
                            />
                        ) : (
                            <div
                                onClick={onToggleClick}
                                className='h-[30px] w-[30px] border-2 border-purple-500 rounded-2xl mr-4'
                            ></div>
                        )}
                        <pre
                            className={`${
                                complete
                                    ? 'line-through text-white text-xl'
                                    : 'text-white text-xl'
                            }`}
                        >
                            {desc}
                        </pre>
                    </div>
                    <div className='flex justify-center backgroundColorTodo2 rounded-b-2xl py-4'>
                        <button
                            className='border-2 border-gray-500 rounded-2xl p-2 text-white hover:bg-gray-500 mx-4'
                            onClick={onOpenModal}
                        >
                            Update Todo
                        </button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={onCloseModal}
                            style={customStyles}
                            closeTimeoutMS={200}
                        >
                            <button onClick={onCloseModal} className='mb-10'>
                                <img
                                    src={close}
                                    alt='close'
                                    className='h-[30px] w-[30px]'
                                />
                            </button>
                            <form onSubmit={onSubmit}>
                                <button
                                    type='submit'
                                    className='border-2 border-gray-500 bg-slate-500 text-white rounded-2xl p-2'
                                    onClick={onCloseModal}
                                >
                                    Update
                                </button>
                                <input
                                    type='text'
                                    name='desc'
                                    placeholder='Update Todo'
                                    value={formState.desc}
                                    onChange={onInputChange}
                                    className='text-right'
                                />
                            </form>
                            {formState.desc?.length >= 30 ? (
                                <pre className='text-red-700 my-4'>
                                    Task should be at least 30 digits
                                </pre>
                            ) : (
                                <></>
                            )}
                        </Modal>
                        <button
                            className='border-2 border-red-900 rounded-2xl p-2 text-white hover:bg-red-800 mx-4'
                            onClick={onDeleteClick}
                        >
                            Delete Todo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
