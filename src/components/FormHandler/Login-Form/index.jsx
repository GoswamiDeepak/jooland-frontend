import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonType from '../../Button-Type';
import useNetwork from '../../../hooks/useNetwork';
import InputType from '../../Input-Type';
import { ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../../../slices/user/userSlice';

const initialState = {
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 1,
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(structuredClone(initialState));
    const { apiHandler, data } = useNetwork();

    function inputHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
    }
    async function loginFormHandler(e) {
        e.preventDefault();
        const response = await apiHandler('auth/login', 'POST', login);
        console.log(response);
        if (response?.statusText === 'OK') {
            localStorage.setItem('token', response?.data?.token);
            localStorage.setItem('refreshToken', response?.data?.refreshToken);
            dispatch(loggedIn('sending payload'));
            navigate('/');
        }
    }
    return (
        <form className="mt-8" onSubmit={loginFormHandler}>
            <div className="space-y-5">
                <InputType
                    name="username"
                    type="text"
                    placeholder="Enter Your Username"
                    label="Username"
                    value={login.username}
                    onInputFunc={inputHandler}
                />

                <InputType
                    name="password"
                    type="password"
                    placeholder="*******"
                    label="password"
                    value={login.password}
                    onInputFunc={inputHandler}
                />
                <ButtonType className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                    Get started <ArrowRight className="ml-2" size={16} />
                </ButtonType>
            </div>
        </form>
    );
};

export default LoginForm;
