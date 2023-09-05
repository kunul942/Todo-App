import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
    HomePage,
    LoginPage,
    TodoPage,
    ChatPage,
    RegisterPage,
} from '../pages/';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <Routes>
                {/* <Route path='/*' element={<TodoPage />} /> */}
                {status === 'not-authenticated' ? (
                    <>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/auth/login' element={<LoginPage />} />
                        <Route
                            path='/auth/register'
                            element={<RegisterPage />}
                        />
                        <Route path='/*' element={<Navigate to='/' />} />
                    </>
                ) : (
                    <>
                        <Route path='/' element={<TodoPage />} />
                        <Route path='/chat' element={<ChatPage />} />
                        <Route path='/*' element={<Navigate to='/' />} />
                    </>
                )}
            </Routes>
        </>
    );
};
