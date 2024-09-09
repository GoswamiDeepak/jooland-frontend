import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DropDown({ label = '', hidden = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef();
    // Toggle visibility of the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const clickOutside = (e) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button
                type="button"
                ref={buttonRef}
                onClick={toggleDropdown}
                className={`items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:inline-flex ${
                    hidden && 'lg:hidden'
                }`}>
                {label}
                <ChevronDown
                    className={`ml-2 h-4 w-4 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                />
            </button>
            <div
                className={`w-[170px] h-auto text-right absolute right-0 pt-6 pr-7 pb-4 shadow-lg rounded-sm bg-white  transition-all duration-300 ease-in-out transform ${
                    isOpen
                        ? 'translate-y-0 opacity-100 visible'
                        : '-translate-y-4 opacity-0 invisible'
                }`}>
                {label === 'sort' && (
                    <>
                        {' '}
                        <buttton className="block w-full  cursor-pointer hover:font-medium">
                            Featured
                        </buttton>
                        <buttton className="block w-full cursor-pointer hover:font-medium">
                            Newest
                        </buttton>
                        <buttton className="block w-full cursor-pointer hover:font-medium">
                            Price: High-Low
                        </buttton>
                        <buttton className="block w-full cursor-pointer hover:font-medium">
                            rice: Low-High
                        </buttton>
                    </>
                )}
            </div>
        </div>
    );
}
