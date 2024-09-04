import React from 'react';
import InputType from '../Input-Type';
import { ArrowRight } from 'lucide-react';
import ButtonType from '../Button-Type';

const LoginForm = () => {
    return (
        <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
                <InputType
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                    label="Email Address"
                />

                <InputType
                    name="password"
                    type="password"
                    placeholder="*******"
                    label="password"
                />
                <ButtonType className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                    Get started <ArrowRight className="ml-2" size={16} />
                </ButtonType>
            </div>
        </form>
    );
};

export default LoginForm;
