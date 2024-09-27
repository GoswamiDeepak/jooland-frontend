import DropDown from '../Drop-Down';

export default function MobileFilter({ onSortFilter = () => {} }) {
    const sortOptions = [
        { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
        {
            name: 'Price: Low to High',
            sort: 'price',
            order: 'asc',
            current: false,
        },
        {
            name: 'Price: High to Low',
            sort: 'price',
            order: 'desc',
            current: false,
        },
    ];
    return (
        <div className="mt-6 flex items-center   pt-2 md:mt-0 md:space-x-4  md:pt-0">
            <DropDown label="Category" hidden="true" />
            <DropDown label="Color" hidden="true" />
            <DropDown label="Size" hidden="true" />
            <DropDown
                label="sort"
                options={sortOptions}
                onSortFilter={onSortFilter}
            />
        </div>
    );
}
