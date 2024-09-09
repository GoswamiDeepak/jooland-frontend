import React from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Input from './Input';
import Search from './Search';
import { CiShoppingCart } from 'react-icons/ci';
import ButtonType from './Button-Type';
import { CiUser } from 'react-icons/ci';

const menuItems = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'About',
        href: '#',
    },
    {
        name: 'Contact',
        href: '#',
    },
];

function Pages() {
    return (
        <div className="hidden lg:block">
            <ul className="ml-12 inline-flex space-x-8">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900">
                            {item.name}
                            {/* <span>
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </span> */}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Logo() {
    return (
        <div className="inline-flex items-center space-x-2">
            <Link to="/">
                <img
                    src="jooland.png"
                    alt="logo"
                    loading="lazy"
                    height="50"
                    width="150"
                />
            </Link>
        </div>
    );
}

function RightSideOfNav() {
    return (
        <>
            <div className="flex grow justify-end items-center">
                <Search />
                <Link to="/cart">
                    <CiShoppingCart className="w-[30px] h-[40px] cursor-pointer ml-2" />
                </Link>
            </div>
            <div className="ml-2 mt-2 hidden lg:block">
                <span className="relative inline-block">
                    {/* <img
                        className="h-10 w-10 rounded-full"
                        src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                        alt="Dan_Abromov"
                    /> */}
                    <CiUser className="h-[30px] w-[30px] rounded-full" />
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
                </span>
            </div>
        </>
    );
}

function MobileNav() {
    return (
        <nav className="grid gap-y-4">
            {menuItems.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                    </span>
                    <span>
                        <ChevronRight className="ml-3 h-4 w-4" />
                    </span>
                </a>
            ))}
        </nav>
    );
}

export function Navbar() {
    const isAuth = useSelector((state) => {
        return state.user.isLogged;
    });

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isAuthHandler = () => {
        if (isAuth) {
            return <RightSideOfNav />;
        } else {
            return (
                <Link to="/login" className="flex grow justify-end">
                    <ButtonType className="rounded-lg border-2 border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ">
                        Log In
                    </ButtonType>
                </Link>
            );
        }
    };

    const MobileNavbar = () => {
        return (
            isMenuOpen && (
                <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pb-6 pt-0">
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center space-x-2">
                                    <Logo />
                                </div>
                                <div className="-mr-2">
                                    <ButtonType
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        onClickHandler={toggleMenu}
                                        type="button">
                                        <X
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </ButtonType>
                                </div>
                            </div>
                            <div className="mt-6">
                                <MobileNav />
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="relative w-full bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                <Logo />
                <Pages />
                {isAuthHandler()}
                <div className="ml-2 lg:hidden">
                    <Menu
                        onClick={toggleMenu}
                        className="h-6 w-6 cursor-pointer"
                    />
                </div>
                <MobileNavbar />
            </div>
        </div>
    );
}
