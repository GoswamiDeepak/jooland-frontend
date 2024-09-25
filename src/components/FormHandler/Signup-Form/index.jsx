import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonType from '../../Button-Type';
import useNetwork from '../../../hooks/useNetwork';
import InputType from '../../Input-Type';
import { ArrowRight } from 'lucide-react';
import { inputHandler, signUpFormHandler } from './signUpLogic';

const initialState = {
    username: '',
    email: '',
    password: '',
};

const SignForm = () => {
    const [signup, setSignup] = useState(structuredClone(initialState));
    const { apiHandler } = useNetwork();

    // function inputHandler(e) {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setSignup((prev) => ({ ...prev, [name]: value }));
    // }
    const inputHandlerFunc = inputHandler(setSignup);

    // async function loginFormHandler(e) {
    //     e.preventDefault();
    //     const response = await apiHandler(
    //         '/api/v1/user/register',
    //         'POST',
    //         signup,
    //         false
    //     );
    //     console.log(response);
    // }
    const signUpFormHandlerFunc = signUpFormHandler(
        apiHandler,
        signup,
        setSignup,
        initialState
    );

    return (
        <form className="mt-8" onSubmit={signUpFormHandlerFunc}>
            <div className="space-y-5">
                <InputType
                    name="username"
                    type="text"
                    placeholder="Enter Your Username"
                    label="Username"
                    value={signup.username}
                    onInputFunc={inputHandlerFunc}
                />
                <InputType
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    label="Email"
                    value={signup.email}
                    onInputFunc={inputHandlerFunc}
                />

                <InputType
                    name="password"
                    type="password"
                    placeholder="*******"
                    label="password"
                    value={signup.password}
                    onInputFunc={inputHandlerFunc}
                    forgetPass="true"
                />
                <ButtonType className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                    Get started <ArrowRight className="ml-2" size={16} />
                </ButtonType>
            </div>
        </form>
    );
};

export default SignForm;
