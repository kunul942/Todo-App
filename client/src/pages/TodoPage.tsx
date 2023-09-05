import { TodoAdd, TodoTitle } from '../components/todo';
import { Navbar } from '../ui/Navbar';

export const TodoPage = () => {
    return (
        <>
            <div className='backgroundColor min-h-[100vh] h-auto w-full'>
                <Navbar />
                <TodoTitle />
                <TodoAdd />
            </div>
        </>
    );
};
