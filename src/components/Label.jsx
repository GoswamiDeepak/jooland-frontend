import React from 'react';

const Label = ({
    id,
    label,
    style = 'text-base font-medium text-gray-900',
}) => {
    return (
        <label htmlFor={id} className={style}>
            {label}
        </label>
    );
};

export default Label;
