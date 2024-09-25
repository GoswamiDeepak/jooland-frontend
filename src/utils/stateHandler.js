export function stateHandler(setterFunc) {
    return function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setterFunc((prev) => ({ ...prev, [name]: value }));
    };
}
