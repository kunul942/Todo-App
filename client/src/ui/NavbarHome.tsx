import { Link } from 'react-router-dom';
import check from '../assets/checked.png';

export const NavbarHome = () => {
    return (
        <>
            <div className='w-[70%] mx-auto'>
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
                        <Link to='/auth/login'>
                            <button className='text-gray-200 py-2 px-6 rounded-2xl mx-6 hover:border-2 hover:border-slate-500'>
                                Log in
                            </button>
                        </Link>
                        <Link to='/auth/register'>
                            <button className='text-gray-200 py-2 px-6 border-2 border-gray-500 rounded-2xl hover:bg-slate-900'>
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
