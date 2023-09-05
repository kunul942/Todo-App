import check from '../assets/checked.png';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../hooks';

export const Navbar = () => {
    const { startLogout } = useAuthStore();

    return (
        <>
            <div className='backgroundColorTodo flex items-center'>
                <div className='w-[60%] 2xl:w-[50%] mx-auto'>
                    <div className='flex items-center py-4'>
                        <div className='mr-auto flex items-center'>
                            <img
                                src={check}
                                alt='check'
                                className='mr-4 h-[40px] w-[40px]'
                            />
                            <Link to='/'>
                                <h1 className='text-white font-bold text-2xl'>
                                    tsks
                                </h1>
                            </Link>
                        </div>
                        <div>
                            <Link to='/chat'>
                                <button className='text-gray-200 py-2 px-6 rounded-2xl mx-6 hover:border-2 hover:border-slate-500'>
                                    Chat
                                </button>
                            </Link>
                            <Link to='/'>
                                <button className='text-gray-200 py-2 px-6 border-2 border-gray-500 rounded-2xl hover:bg-slate-900'>
                                    Todo
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={startLogout}
                        className='text-gray-200 py-2 px-6 border-2 border-red-900 bg-red-700 rounded-2xl hover:bg-red-600 mr-12'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};
