export default function clickOutside(reference, setterFun) {
    return function (e) {
        if (reference.current && !reference.current.contains(e.target)) {
            setterFun(false);
        }
    };
}
