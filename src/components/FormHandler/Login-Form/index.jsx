import React, { useState } from 'react';
import InputType from '../../Input-Type';
import { ArrowRight } from 'lucide-react';
import ButtonType from '../../Button-Type';

const initialState = {
    username: '',
    password: '',
};

const LoginForm = () => {
    const [login, setLogin] = useState(structuredClone(initialState));

    function inputHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setLogin((prevState) => ({ ...prevState, [name]: value }));
    }
    function loginFormHandler(e) {
        e.preventDefault();
        console.log(login);
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
