import DropDown from "../Drop-Down";

export default function MobileFilter() {
    return (
        <div className="mt-6 flex items-center   pt-2 md:mt-0 md:space-x-4  md:pt-0">
            <DropDown label="Category" hidden="true" />
            <DropDown label="Color" hidden="true" />
            <DropDown label="Size" hidden="true" />
            <DropDown label="sort" />
        </div>
    );
}
