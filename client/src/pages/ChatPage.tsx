import Chat from '../components/chat/Chat';
import { Navbar } from '../ui';

export const ChatPage = () => {
    return (
        <div className='backgroundColor min-h-[100vh] h-auto w-full'>
            <Navbar />
            <Chat />
        </div>
    );
};
