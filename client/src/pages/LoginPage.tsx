import { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useForm, useAuthStore } from '../hooks';

import logo from '../assets/checked.png';
import Swal from 'sweetalert2';

interface login {
    loginEmail: string;
    loginPassword: string;
}

const loginFormFields: login = {
    loginEmail: '',
    loginPassword: '',
};

export const LoginPage = () => {
    const {
        loginEmail,
        loginPassword,
        onResetForm,
        onInputChange: onLoginInputChange,
    } = useForm(loginFormFields);

    const { startLogin, errorMessage } = useAuthStore();

    const loginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loginEmail.length <= 1) return;
        if (loginPassword.length <= 1) return;

        startLogin({
            email: loginEmail,
            password: loginPassword,
        });
        onResetForm();
    };

    //error message
    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error in authentication', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <div className='backgroundColor min-h-[100vh] h-auto w-full'>
            <div className='w-[50%] mx-auto flex justify-center'>
                <div className='2xl:h-[100vh] flex flex-col justify-center'>
                    <img
                        src={logo}
                        alt='logo'
                        className='h-[60px] w-[60px] mx-auto my-8'
                    />
                    <h3 className='text-gray-300 text-center my-4 text-4xl'>
                        Sign in to Tsk
                    </h3>
                    <form onSubmit={loginSubmit}>
                        <div className='backgroundColorTodo2 p-6 rounded-xl text-gray-200 w-[400px] mt-6'>
                            <div className='flex flex-col my-4'>
                                <label className='mb-4 text-xl'>
                                    Email adress
                                </label>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    name='loginEmail'
                                    value={loginEmail}
                                    onChange={onLoginInputChange}
                                    className='backgroundColor rounded-xl px-4 py-2'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='mb-4 text-xl'>Password</label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    name='loginPassword'
                                    value={loginPassword}
                                    onChange={onLoginInputChange}
                                    className='backgroundColor rounded-xl px-4 py-2'
                                />
                            </div>
                            <div>
                                <input
                                    type='submit'
                                    value='Login'
                                    className='w-full bg-slate-800 rounded-xl mt-8 py-2'
                                />
                            </div>
                        </div>
                    </form>
                    <div className='py-4 my-6 rounded-xl border-2 border-slate-700 flex items-center'>
                        <div className='flex items-center justify-between w-[80%] mx-auto'>
                            <h3 className='text-blue-500 text-[16px]'>
                                New to Tsk?
                            </h3>
                            <Link to='/auth/register'>
                                <p className='text-green-600 text-[16px]'>
                                    Create an account
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
