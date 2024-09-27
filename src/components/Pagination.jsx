import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function Pagination({ onPageHandler, currentPage, limit }) {
    const productData = useSelector((state) => state.product);
    const { page, totalpage, totalDocument } = productData;

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {page > 1 && (
                    <div
                        onClick={() => onPageHandler(currentPage - 1)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                        Previous
                    </div>
                )}
                {page < totalpage && (
                    <div
                        onClick={() => onPageHandler(currentPage + 1)}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                        Next
                    </div>
                )}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                            {page * limit - limit + 1}
                        </span>{' '}
                        to <span className="font-medium">{page * limit}</span>{' '}
                        of <span className="font-medium">{totalDocument}</span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        {page > 1 && (
                            <div
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                                onClick={() => onPageHandler(currentPage - 1)}>
                                <span className="sr-only">Previous</span>

                                <MdChevronLeft className="h-5 w-5" />
                            </div>
                        )}
                        {[...Array(totalpage)]?.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => onPageHandler(i + 1)}
                                aria-current="page"
                                className={`${
                                    i + 1 == page
                                        ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        : 'relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                } cursor-pointer`}>
                                {i + 1}
                            </div>
                        ))}
                        {page < totalpage && (
                            <div
                                onClick={() => onPageHandler(currentPage + 1)}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer">
                                <span className="sr-only">Next</span>

                                <MdChevronRight className="h-5 w-5" />
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}
