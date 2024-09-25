const DynamiceText = ({ children, elementType, style }) => {
    const Tag = elementType;
    return <Tag className={style}>{children}</Tag>;
};

export default DynamiceText;
