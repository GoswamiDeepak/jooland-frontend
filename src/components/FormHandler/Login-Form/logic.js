export function formHandler(
    apiHandler,
    state,
    setterFunc,
    initialObj,
    dispatch,
    navigate,
    loggedIn
) {
    return async function (e) {
        e.preventDefault();
        const response = await apiHandler('/user/login', 'POST', state, false);
        console.log(response);
        if (response) {
            const payload = {
                email: response?.data?.email,
                role: response?.data?.role,
            };
            dispatch(loggedIn(payload));
            setterFunc(structuredClone(initialObj));
            navigate('/');
        }
    };
}
