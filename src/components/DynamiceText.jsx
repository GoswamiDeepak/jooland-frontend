import React from 'react';

const DynamiceText = ({ elementType, text, children, classType }) => {
    const Tag = elementType;
    return <Tag className={classType}>{children}</Tag>;
};

export default DynamiceText;
