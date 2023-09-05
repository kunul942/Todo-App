import { FormEvent, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useChatStore } from '../../hooks/useChatStore';

import usuario from '../../assets/usuario.png';

//* socket
import { io } from 'socket.io-client';
import { useAuthStore } from '../../hooks';
import { ChatMessages } from './ChatMessages';

const socket = io('http://localhost:4000');

export default () => {
    const { onInputChange, onResetForm, formState } = useForm({
        text: '',
    });
    const { user } = useAuthStore();
    const {
        messages,
        startAddNewMessage,
        startLoadingMessages,
        startDeleteAllMessages,
    } = useChatStore();

    //**SOCKETS*/
    useEffect(() => {
        socket.on('create-message-people', (payload) => {
            startAddNewMessage(payload);
        });

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        socket.on('create-message-myself', (payload) => {
            startAddNewMessage(payload);
        });
        return () => {
            socket.close();
        };
    }, []);

    const onDeleteAllMessages = () => {
        startDeleteAllMessages();
    };

    const mainUser = {
        uid: user.uid,
        name: user.name,
        role: user.role,
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formState.text.length < 1) return;

        const addNewMessage = {
            text: formState.text,
            status: true,
            // mainUser
            user: {
                uid: user.uid,
                name: user.name,
            },
        };

        //**SOCKETS */
        socket.emit('enviar-mensaje', addNewMessage);

        onResetForm();
    };

    //* scrollTOP mensajes
    useEffect(() => {
        let todoMessages = document.getElementById('scrollTop')!;
        todoMessages.scrollTop = todoMessages?.scrollHeight;
    }, [messages]);

    useEffect(() => {
        startLoadingMessages();
    }, []);

    return (
        <div className='w-[50%] 2xl:w-[40%] mx-auto '>
            <div className='mt-12 backgroundColorChat rounded-2xl'>
                <div className='flex items-center p-4'>
                    <div className='flex items-center p-4'>
                        <img
                            src={usuario}
                            alt='usuario'
                            className='h-[50px] w-[50px] rounded-full backgroundColorTodo2 p-2 mr-4'
                        />
                        <h1 className='text-white'>Chat Grupal</h1>
                    </div>
                    {mainUser.role === 'ADMIN_ROLE' ? (
                        <div className='ml-auto p-8'>
                            <button
                                className='text-red-700'
                                onClick={onDeleteAllMessages}
                            >
                                Borrar
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div
                    className={`backgroundColorChat2 h-[60vh] 2xl:h-[70vh] rounded-b-2xl overflow-y-auto`}
                    id='scrollTop'
                >
                    <div className='w-[90%] mx-auto] min-h-[50vh] 2xl:min-h-[62vh] h-auto mx-auto flex flex-col my-8 justify-between'>
                        <div>
                            {messages.map((message) => (
                                <ChatMessages
                                    message={message}
                                    key={message._id}
                                    mainUser={mainUser}
                                />
                            ))}
                        </div>

                        <form
                            className='flex items-center mt-8'
                            onSubmit={onSubmit}
                        >
                            <input
                                type='text'
                                placeholder='Message'
                                name='text'
                                value={formState.text}
                                onChange={onInputChange}
                                className='rounded-2xl w-full backgroundColorChat outline-none text-white px-8 h-[50px]'
                            />
                            <button
                                type='submit'
                                className='bg-slate-200 py-2 px-4 rounded-2xl ml-4 h-[50px]'
                            >
                                Click
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
