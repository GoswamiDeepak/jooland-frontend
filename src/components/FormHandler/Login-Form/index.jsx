import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonType from '../../Button-Type';
import useNetwork from '../../../hooks/useNetwork';
import InputType from '../../Input-Type';
import { ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../../../slices/user/userSlice';
import { stateHandler } from '../../../utils/stateHandler';
import { formHandler } from './logic';

const initialState = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(structuredClone(initialState));
    const { apiHandler } = useNetwork();

    const inputHandler = stateHandler(setLogin);

    const loginFormHandler = formHandler(
        apiHandler,
        login,
        setLogin,
        initialState,
        dispatch,
        navigate,
        loggedIn
    );

    return (
        <form className="mt-8" onSubmit={loginFormHandler}>
            <div className="space-y-5">
                <InputType
                    name="email"
                    type="email"
                    placeholder="Enter Your email"
                    label="Email"
                    value={login.email}
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
