export default function ButtonType({ children, className, type = 'submit' }) {
    return (
        <button className={className} type={type}>
            {children}
        </button>
    );
}
