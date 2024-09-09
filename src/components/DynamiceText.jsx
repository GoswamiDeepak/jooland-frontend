import React from 'react';

const DynamiceText = ({ elementType, children, style }) => {
    const Tag = elementType;
    return <Tag className={style}>{children}</Tag>;
};

export default DynamiceText;
