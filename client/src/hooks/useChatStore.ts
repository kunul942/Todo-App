import { todoApi } from '../api';
import { ChatStructure } from '../interfaces/interfaces';
import {
    onAddNewMessage,
    onDeleteMessage,
    onDeleteAllMessages,
    onLoadMessages,
    onErrorMessage,
    onClearErrorMessage,
} from '../store';
import { useAppDispatch, useAppSelector } from '../store/store';

export const useChatStore = () => {
    const dispatch = useAppDispatch();
    const { messages, errorMessage } = useAppSelector((store) => store.chat);

    const startAddNewMessage = (message: ChatStructure) => {
        console.log(message);
        dispatch(onAddNewMessage({ ...message }));
    };

    const startDeleteMessage = async (id: number) => {
        try {
            const resp = await todoApi.delete(`/chat/${id}`);

            dispatch(onDeleteMessage({ id, status: resp.data.chat.status }));
        } catch (error: any) {
            console.log({ error }, 'errorDeletingMessage');
            dispatch(onErrorMessage(error.response.data.errors.id?.msg));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 10);
        }
    };

    const startDeleteAllMessages = async () => {
        try {
            const resp = await todoApi.delete(`/chat/`);
            console.log(resp);

            dispatch(onDeleteAllMessages());
        } catch (error: any) {
            console.log({ error }, 'errorDeletingMessage');
        }
    };

    const startLoadingMessages = async () => {
        try {
            const resp = await todoApi.get('/chat/');

            dispatch(onLoadMessages(resp.data?.chats));
        } catch (error) {
            console.log({ error }, 'Error loading Messages');
        }
    };

    return {
        //*Properties
        messages,
        errorMessage,

        //*Methods
        startAddNewMessage,
        startLoadingMessages,
        startDeleteMessage,
        startDeleteAllMessages,
    };
};
