import React from "react";

const SingleSlider = ({
    handleChange,
    inputClassName = "",
    thumbClassName = "",
    trackClassName = "",
    labelClassName = "",
    input,
}) => {
    const { data, min, max, step } = input;
    return (
        <div className="w-full flex flex-col">
            {input.label && (
                <label className={`text-sm mb-3 ${labelClassName}`}>
                    {input.label}
                </label>
            )}
            <div className="relative">
                <div
                    className={`h-1 ${trackClassName} bg-gray-300 rounded-full w-full`}
                >
                    <div
                        className={`h-2 ${thumbClassName} bg-green-500 rounded-full w-5 h-5 absolute top-1/2 transform -translate-y-1/2`}
                        style={{
                            left: `${((data - min) / (max - min)) * 100}%`,
                        }}
                    ></div>
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={data}
                    onChange={(e) => handleChange(e.target.value, input)}
                    className={`w-full h-6 cursor-pointer opacity-0 absolute top-0 left-0 ${inputClassName}`}
                />
            </div>
            <span className="mt-2 text-xs text-gray-600">{data}</span>
        </div>
    );
};

export default SingleSlider;
