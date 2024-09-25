import React, { useId } from 'react';
import Label from './Label';
import Input from './Input';

const InputType = ({
    type = 'text',
    placeholder = 'Enter',
    name = '',
    label = '',
    value = '',
    forgetPass = 'false',
    onInputFunc = () => {},
    inputstyle = 'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
}) => {
    const id = useId();
    const resetPassword = () => {
        if (forgetPass === 'true') {
            return (
                <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                </a>
            );
        }
    };
    return (
        <div>
            {label.length > 0 && (
                <div className="flex items-center justify-between">
                    <Label id={id} label={label} />
                    {resetPassword()}
                </div>
            )}

            <div className="mt-2">
                <Input
                    style={inputstyle}
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChangeFunc={onInputFunc}
                />
            </div>
        </div>
    );
};

export default InputType;
