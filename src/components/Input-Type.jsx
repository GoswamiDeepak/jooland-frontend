import React, { useId } from 'react';

const InputType = ({ type, placeholder, name, label }) => {
    const id = useId();
    const resetPassword = () => {
        if (type === 'password') {
            return <a
            href="#"
            title=""
            className="text-sm font-semibold text-black hover:underline">
            {' '}
            Forgot password?{' '}
        </a>
        }
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900">
                    {label}
                </label>
                {resetPassword()}
            </div>
            <div className="mt-2">
                <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default InputType;
