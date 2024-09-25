export function inputHandler(setterFunc) {
    return function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setterFunc((prev) => ({ ...prev, [name]: value }));
    };
}

export function signUpFormHandler(
    apiHandler,
    state,
    setterFunc = () => {},
    initialObj = {}
) {
    return async function (e) {
        e.preventDefault();
        const response = await apiHandler(
            '/api/v1/user/register',
            'POST',
            state,
            false
        );
        console.log({ response });
        if (response) {
            setterFunc(structuredClone(initialObj));
        }
    };
}
