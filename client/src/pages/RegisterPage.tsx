import { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useAuthStore } from '../hooks';

import Swal from 'sweetalert2';
import logo from '../assets/checked.png';

interface register {
    registerName: string;
    registerEmail: string;
    registerPassword: string;
    registerPassword2: string;
}

const registerFormFields: register = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
};

export const RegisterPage = () => {
    const {
        registerName,
        registerEmail,
        registerPassword,
        registerPassword2,
        onResetForm,
        onInputChange: onRegisterInputChange,
    } = useForm(registerFormFields);

    const { startRegister, errorMessage } = useAuthStore();

    const registerSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (registerPassword !== registerPassword2) {
            Swal.fire('Error on register', 'Password are different', 'error');
            return;
        }

        if (
            registerName.length <= 1 ||
            registerEmail.length <= 1 ||
            registerPassword.length <= 1 ||
            registerPassword2.length <= 1
        )
            return;

        startRegister({
            name: registerName,
            email: registerEmail,
            password: registerPassword,
        });

        onResetForm();
    };

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error on register', errorMessage, 'error');
            return;
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
                        Register to Tsk
                    </h3>
                    <form onSubmit={registerSubmit}>
                        <div className='backgroundColorTodo2 p-6 rounded-xl text-gray-200 w-[400px] mt-6'>
                            <div className='flex flex-col'>
                                <label className='mb-4 text-xl'>Name</label>
                                <input
                                    type='name'
                                    placeholder='Name'
                                    name='registerName'
                                    value={registerName}
                                    onChange={onRegisterInputChange}
                                    className='backgroundColor rounded-xl px-4 py-2'
                                />
                            </div>
                            <div className='flex flex-col my-4'>
                                <label className='mb-4 text-xl'>
                                    Email adress
                                </label>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    name='registerEmail'
                                    value={registerEmail}
                                    onChange={onRegisterInputChange}
                                    className='backgroundColor rounded-xl px-4 py-2'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='mb-4 text-xl'>Password</label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    name='registerPassword'
                                    value={registerPassword}
                                    onChange={onRegisterInputChange}
                                    className='backgroundColor rounded-xl px-4 py-2'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='my-4 text-xl'>
                                    Confirm password
                                </label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    name='registerPassword2'
                                    value={registerPassword2}
                                    onChange={onRegisterInputChange}
                                    className='backgroundColor rounded-xl px-4 py-2'
                                />
                            </div>
                            <div>
                                <input
                                    type='submit'
                                    value='Create account'
                                    className='w-full bg-slate-800 rounded-xl mt-8 py-2'
                                />
                            </div>
                        </div>
                    </form>
                    <div className='py-4 my-6 rounded-xl border-2 border-slate-700 flex items-center'>
                        <div className='flex items-center justify-between w-[80%] mx-auto'>
                            <h3 className='text-gray-300 text-[16px]'>
                                Already have an account?
                            </h3>
                            <Link to='/auth/login'>
                                <p className='text-green-600 text-[16px]'>
                                    Go back
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
