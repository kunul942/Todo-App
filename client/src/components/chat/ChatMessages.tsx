import { useEffect } from 'react';

import { useChatStore } from '../../hooks';

import { ChatStructure, User } from '../../interfaces/interfaces';

import usuario from '../../assets/usuario.png';
import Swal from 'sweetalert2';

interface ChatMessageProp {
    message: ChatStructure;
    mainUser: User;
}

export const ChatMessages = ({ message, mainUser }: ChatMessageProp) => {
    const { errorMessage, startDeleteMessage } = useChatStore();

    //*DELETE MESSAGE
    const onDeleteMessage = (event: any) => {
        if (event.detail === 2) {
            console.log('entras?');
            confirm('Are you sure you want to delete it?') &&
                startDeleteMessage(message._id);
        }
    };

    //*ERROR DELETING MESSAGE*/
    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error deleting TODO', errorMessage, 'error');
        }
    }, [errorMessage]);

    return message.user.uid === mainUser.uid ? (
        <div
            key={message._id}
            className={
                message.status === true
                    ? 'flex items-center mb-8 justify-end'
                    : 'flex items-center mb-8 justify-end opacity-50 italic'
            }
            onClick={
                mainUser.role === 'ADMIN_ROLE' ? onDeleteMessage : () => {}
            }
        >
            <p className='p-4 bg-slate-800 rounded-2xl text-white text-[14px]'>
                {message.text}
            </p>
        </div>
    ) : (
        <div
            key={message._id}
            className={
                message.status === true
                    ? 'flex items-center mb-8'
                    : 'flex items-center mb-8 opacity-50 italic'
            }
            onClick={
                mainUser.role === 'ADMIN_ROLE' ? onDeleteMessage : () => {}
            }
        >
            <div className='flex items-center'>
                <img
                    src={usuario}
                    alt='usuario'
                    className='h-[50px] w-[50px] rounded-full backgroundColorChat p-2 mr-4'
                />
                <div className='p-4 backgroundColorTodo rounded-2xl'>
                    <p className='text-slate-400 mb-2 text-xs'>
                        {message.user.name}
                    </p>
                    <p className=' text-white text-[14px]'>{message.text}</p>
                </div>
            </div>
        </div>
    );
};
