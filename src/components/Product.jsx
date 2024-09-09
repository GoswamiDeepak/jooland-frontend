import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from './Card';
import DynamiceText from './DynamiceText';

const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White' },
            { value: 'beige', label: 'Beige' },
            { value: 'blue', label: 'Blue' },
            { value: 'brown', label: 'Brown' },
            { value: 'green', label: 'Green' },
            { value: 'purple', label: 'Purple' },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'All New Arrivals' },
            { value: 'tees', label: 'Tees' },
            { value: 'crewnecks', label: 'Crewnecks' },
            { value: 'sweatshirts', label: 'Sweatshirts' },
            { value: 'pants-shorts', label: 'Pants & Shorts' },
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
            { value: '2xl', label: '2XL' },
        ],
    },
];

const MobileFilter = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle visibility of the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="mt-6 flex items-center  pt-2 md:mt-0 md:space-x-4  md:pt-0">
            <div className="relative">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="hidden items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:inline-flex">
                    Sort <ChevronDown className="ml-2 h-4 w-4" />
                </button>

                <div
                    className={`w-[170px] h-auto text-right absolute right-0 pt-6 pr-7 pb-4 shadow-lg rounded-sm bg-white  transition-all duration-300 ease-in-out transform ${
                        isOpen
                            ? 'translate-y-0 opacity-100 visible'
                            : '-translate-y-4 opacity-0 invisible'
                    }`}>
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
                </div>
            </div>
            <button
                type="button"
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden">
                Category <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button
                type="button"
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden">
                Color <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button
                type="button"
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden">
                Size <ChevronDown className="ml-2 h-4 w-4" />
            </button>
        </div>
    );
};

export function Product() {
    console.log('render...');

    return (
        <section className="w-full">
            <div className="mx-auto max-w-7xl px-2 py-10 lg:px-10">
                <div className="md:flex md:flex-row md:items-start md:justify-between">
                    <DynamiceText elementType="h1" style="text-xl font-bold">
                        Product
                    </DynamiceText>
                    <MobileFilter />
                </div>
                <hr className="my-8" />
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
                    <div className="hidden space-y-6 divide-y lg:block lg:col-span-3 lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">
                        {filters.map((filter) => (
                            <div key={filter.id} className="pt-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {filter.name}
                                </h3>
                                <ul className="mt-2">
                                    {filter.options.map((option) => (
                                        <li
                                            key={option.value}
                                            className="flex items-center justify-between py-2">
                                            <div className="flex items-center">
                                                <input
                                                    id={`${filter.id}-${option.value}`}
                                                    name={`${filter.id}[]`}
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                />
                                                <label
                                                    htmlFor={`${filter.id}-${option.value}`}
                                                    className="ml-3 text-sm font-medium text-gray-900">
                                                    {option.label}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="h-[400px] w-full rounded-lg border-2 border-dashed px-2 lg:col-span-9 lg:h-full">
                        <Card />
                    </div>
                </div>
            </div>
        </section>
    );
}
