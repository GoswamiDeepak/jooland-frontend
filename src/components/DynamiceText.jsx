import React from 'react';

const DynamiceText = ({ elementType, text, classType }) => {
    const Tag = elementType;
    return <Tag className={classType}>{text}</Tag>;
};

export default DynamiceText;
