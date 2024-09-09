import React, { forwardRef } from 'react';

const Input = (
    {
        id = '',
        type = 'text',
        placeholder = 'Enter',
        name = '',
        value = '',
        style = '',
        onChangeFunc = () => {},
    },
    ref
) => (
    <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className={style}
        onChange={onChangeFunc}
    />
);

export default forwardRef(Input);
