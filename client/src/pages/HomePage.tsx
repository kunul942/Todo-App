import { Link } from 'react-router-dom';
import { NavbarHome } from '../ui';

export const HomePage = () => {
    return (
        <div className='backgroundColor h-screen'>
            <NavbarHome />
            <div className='w-[70%] mx-auto'>
                <div className='flex flex-col h-[85vh] justify-center text-white'>
                    <div className='text-center'>
                        <h1 className='text-7xl font-bold my-6'>
                            Tsks, just tasks
                        </h1>
                        <p className='w-[40%] mx-auto text-gray-400 my-14 text-xl'>
                            Keep track of the daily tasks in life and get that
                            satisfaction upon completion.
                        </p>
                    </div>
                    <div className='w-[40%] mx-auto'>
                        <Link to='/auth/login'>
                            <div className='flex justify-center'>
                                <button className='border-2 border-gray-500 p-4 rounded-2xl w-[60%] shadow-2xl hover:bg-slate-900'>
                                    Get Started
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='absolute top-[45%] left-[10%] 2xl:left-[15%] backgroundGenerator h-[130px] w-[130px] rounded-[100%]'></div>
            <div className='absolute top-[72%] right-[10%] 2xl:right-[15%] backgroundGenerator h-[150px] w-[150px] rounded-[100%] 2xl:h-[180px] 2xl:w-[180px]'></div>
            <div className='absolute top-[20%] right-[10%] 2xl:right-[15%] backgroundGenerator2 h-[80px] w-[80px] rounded-[100%]'></div>
        </div>
    );
};
