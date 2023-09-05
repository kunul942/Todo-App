import { useAppDispatch, useAppSelector } from '../store/store';
import { todoApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

interface startLogin {
    email: string;
    password: string;
}

interface LoginApi {
    ok: string;
    msg: string;
    uid: string;
    name: string;
    role: string;
    token: string;
}

interface startRegister {
    name: string;
    email: string;
    password: string;
    password2?: string;
}

export const useAuthStore = () => {
    const { status, user, errorMessage } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();

    const startLogin = async ({ email, password }: startLogin) => {
        dispatch(onChecking());

        try {
            // llegar al backend
            const resp = await todoApi.post<LoginApi>('/auth/', {
                email,
                password,
            });

            localStorage.setItem('token', resp.data.token);
            localStorage.setItem(
                'token-init-date',
                new Date().getTime().toString()
            );

            // dispatch(onLogin({ name: resp.data.name, uid: resp.data.uid  }));
            dispatch(
                onLogin({
                    name: resp.data.name,
                    uid: resp.data.uid,
                    role: resp.data.role,
                })
            );
            console.log(resp.data);
        } catch (error: any) {
            console.log({ error }, 'There is an error at StartLogin');
            dispatch(onLogout('Credentials are not correct'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const startRegister = async ({ name, email, password }: startRegister) => {
        dispatch(onChecking());

        try {
            const resp = await todoApi.post('/auth/register/', {
                name,
                email,
                password,
            });

            localStorage.setItem('token', resp.data.token);
            localStorage.setItem(
                'token-init-date',
                new Date().getTime().toString()
            );

            dispatch(
                onLogin({
                    name: resp.data.name,
                    uid: resp.data.uid,
                    role: resp.data.role,
                })
            );

            console.log({ resp: resp.data });
        } catch (error: any) {
            console.log({ error }, 'Error on register user');
            dispatch(
                onLogout(
                    error.response.data?.msg ||
                        error.response.data.errors?.password?.msg ||
                        'Something went wrong'
                )
            );

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const resp = await todoApi.get('/auth/renew');

            localStorage.setItem('token', resp.data.token);
            localStorage.setItem(
                'token-init-date',
                new Date().getTime().toString()
            );

            dispatch(
                onLogin({
                    name: resp.data.name,
                    uid: resp.data.uid,
                    role: resp.data.role,
                })
            );
        } catch (error) {
            console.log(error, 'Error in checkAuthToken');
            localStorage.clear();
            // dispatch(onLogout('there is an error with token'));
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    return {
        //*Properties
        status,
        user,
        errorMessage,

        //*Methods
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout,
    };
};
