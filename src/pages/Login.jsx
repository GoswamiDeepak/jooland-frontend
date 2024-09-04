import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import DynamiceText from '../components/DynamiceText';
import { Link } from 'react-router-dom';
import ButtonType from '../components/Button-Type';
import LoginForm from '../components/FormHandler/Login-Form';
import { FaCheck } from 'react-icons/fa6';
const Login = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <section className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                <div className="absolute inset-0">
                    <img
                        className="h-full w-full rounded-md object-cover "
                        src="https://images.pexels.com/photos/27703479/pexels-photo-27703479/free-photo-of-a-ferris-wheel-is-in-the-middle-of-a-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="relative">
                    <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                        <DynamiceText
                            elementType="h3"
                            classType="text-4xl font-bold text-white">
                            {' '}
                            Now you dont have to rely on your designer to create
                            a new page
                        </DynamiceText>

                        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                            <li className="flex items-center space-x-3">
                                <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                    <FaCheck className="h-3.5 w-3.5 text-white" />
                                </div>
                                <DynamiceText
                                    elementType="span"
                                    classType="text-lg font-medium text-white">
                                    {' '}
                                    Commercial License{' '}
                                </DynamiceText>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                    <svg
                                        className="h-3.5 w-3.5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-lg font-medium text-white">
                                    {' '}
                                    Unlimited Exports{' '}
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                    <svg
                                        className="h-3.5 w-3.5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-lg font-medium text-white">
                                    {' '}
                                    120+ Coded Blocks{' '}
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                    <svg
                                        className="h-3.5 w-3.5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-lg font-medium text-white">
                                    {' '}
                                    Design Files Included{' '}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <DynamiceText
                        elementType="h2"
                        classType="text-3xl font-bold leading-tight text-black sm:text-4xl">
                        Sign In
                    </DynamiceText>

                    <DynamiceText
                        elementType="p"
                        classType="mt-2 text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link
                            to=""
                            className="font-semibold text-black transition-all duration-200 hover:underline">
                            Create a free account
                        </Link>
                    </DynamiceText>

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

export default Login;
