import './style.css'; // We'll use this for custom styling
function PriceRangeSlider(
    {
        min = '',
        max = '',
        minPrice = '',
        maxPrice = '',
        onMinChange,
        onMaxChange,
    }
) {


    if (!isNaN(minPrice) && !isNaN(minPrice)) {
        return (
            <div className="price-range-slider">
                <h3 className="text-lg font-semibold text-gray-900">Price</h3>
                <div className="slider-container">
                    <div className="slider">
                        {/* Track between min and max */}
                        <div
                            className="slider-track"
                            style={{
                                left: `${(minPrice / max) * 100}%`,
                                right: `${100 - (maxPrice / max) * 100}%`,
                            }}
                        />
                        {/* Min Price Slider */}
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={minPrice}
                            onChange={onMinChange}
                            className="thumb thumb-left"
                        />
                        {/* Max Price Slider */}
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={maxPrice}
                            onChange={onMaxChange}
                            className="thumb thumb-right"
                        />
                    </div>
                    <div className="price-values">
                        <span>${minPrice}</span>
                        <span>${maxPrice}</span>
                    </div>
                    {/* <button
                        onClick={applyPriceRange}
                        className="apply-button mt-4 p-2 bg-black text-white rounded-md">
                        Apply
                    </button> */}
                </div>
            </div>
        );
    }
}

export default PriceRangeSlider;
