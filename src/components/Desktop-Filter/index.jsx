import { useState } from 'react';


const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'beauty', label: 'Beauty' },
            { value: 'fragrances', label: 'Fragrances' },
            { value: 'furnitures', label: 'Furnitures' },
            { value: 'groceries', label: 'Groceries' },
        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { value: 'Essence', label: 'Essence' },
            { value: 'Glamour Beauty', label: 'Glamour Beauty' },
            { value: 'Velvet Touch', label: 'Velvet Touch' },
            { value: 'Nail Couture', label: 'Nail Couture' },
            { value: 'Calvin Klein', label: 'Calvin Klein' },
            { value: 'Chanel', label: 'Chanel' },
            { value: 'Dior', label: 'Dior' },
            { value: 'Dolce & Gabbana', label: 'Dolce & Gabbana' },
            { value: 'Gucci', label: 'Gucci' },
            { value: 'Annibale Colombo', label: 'Annibale Colombo' },
            { value: 'Furniture Co.', label: 'Furniture Co.' },
            { value: 'Bath Trends', label: 'Bath Trends' },
            { value: 'Knoll', label: 'Knoll' },
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
];

export default function DesktopFilter({ onFilterHandler }) {
    return (
        <>
            {filters.map((section) => (
                <div key={section.id} className="pt-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {section.name}
                    </h3>
                    <ul className="mt-2">
                        {section.options.map((option, optionIdx) => (
                            <li
                                key={option.value}
                                className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <input
                                        onChange={(e) =>
                                            onFilterHandler(e, section, option)
                                        }
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                    />
                                    <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm font-medium text-gray-900">
                                        {option.label}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}
