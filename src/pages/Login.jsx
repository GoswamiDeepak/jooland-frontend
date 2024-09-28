import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ButtonType from '../components/Button-Type';
import LoginForm from '../components/FormHandler/Login-Form';
import { FaCheck } from 'react-icons/fa6';
import Text from '../components/Text';

const Login = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <Authsidebar />
            <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <Text
                        elementType="h2"
                        style="text-3xl font-bold leading-tight text-black sm:text-4xl">
                        Sign In
                    </Text>

                    <Text
                        elementType="p"
                        classType="mt-2 text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold text-black transition-all duration-200 hover:underline">
                            Create a free account
                        </Link>
                    </Text>

                    <LoginForm />

                    <div className="mt-3 space-y-3">
                        <ButtonType
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none">
                            <span className="mr-2 inline-block">
                                <FaGoogle className="h-6 w-6 text-rose-500 " />
                            </span>
                            Sign in with Google
                        </ButtonType>
                        <ButtonType
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none">
                            <span className="mr-2 inline-block">
                                <FaFacebookF className="h-6 w-6 text-[#2563EB]" />
                            </span>
                            Sign in with Facebook
                        </ButtonType>
                    </div>
                </div>
            </section>
        </div>
    );
};
const Authsidebar = () => {
    return (
        <section className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 sm:hidden md:justify-center md:hidden lg:px-8 lg:pb-24 lg:block">
            <div className="absolute inset-0">
                <img
                    className="h-full w-full rounded-md object-cover object-center"
                    src="https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative">
                <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                    <Text
                        elementType="h3"
                        classType="text-4xl font-bold text-white">
                        {' '}
                        Now you dont have to rely on your designer to create a
                        new page
                    </Text>

                    <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                <FaCheck className="h-3.5 w-3.5 text-white" />
                            </div>
                            <Text
                                elementType="span"
                                classType="text-lg font-medium text-white">
                                {' '}
                                Commercial License{' '}
                            </Text>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                <FaCheck className="h-3.5 w-3.5 text-white" />
                            </div>
                            <Text
                                elementType="span"
                                classType="text-lg font-medium text-white">
                                {' '}
                                Commercial License{' '}
                            </Text>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                <FaCheck className="h-3.5 w-3.5 text-white" />
                            </div>
                            <Text
                                elementType="span"
                                classType="text-lg font-medium text-white">
                                {' '}
                                Commercial License{' '}
                            </Text>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                <FaCheck className="h-3.5 w-3.5 text-white" />
                            </div>
                            <Text
                                elementType="span"
                                classType="text-lg font-medium text-white">
                                {' '}
                                Commercial License{' '}
                            </Text>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
export default Login;
