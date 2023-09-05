import { useAuthStore } from '../../hooks';
import { User } from '../../interfaces/interfaces';

export const TodoTitle = () => {
    const { user } = useAuthStore();

    const userName = user?.name;

    return (
        <>
            {/* //TODO: nombre de la persona del login */}
            <div className='h-[350px] flex items-center w-[60%] 2xl:w-[50%] mx-auto rounded-2xl'>
                <h1 className='text-white text-7xl w-[80%] mx-auto'>
                    Good morning, <br /> {userName}
                </h1>
            </div>
        </>
    );
};
