export default function ButtonType({
    children,
    className,
    type = 'submit',
    onClickHandler,
}) {
    return (
        <button className={className} type={type} onClick={onClickHandler}>
            {children}
        </button>
    );
}
