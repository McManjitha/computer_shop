import React from "react";

const TagSelect = ({ input, handleChange, inputClassName, labelClassName }) => {
    const selectedOptions = input.data || [];

    const getLabelClassList = () => {
        let classes = "mb-2 ";

        classes += labelClassName;

        return classes;
    };

    const handleAddOption = (optionId) => {
        const optionIndex = selectedOptions.findIndex((id) => id === optionId);
        if (optionIndex == -1) {
            const updatedOptions = [...selectedOptions, optionId];
            handleChange(updatedOptions, input);
        }
    };

    const handleRemoveOption = (optionId) => {
        const updatedOptions = selectedOptions.filter((id) => id !== optionId);
        handleChange(updatedOptions, input);
    };

    return (
        <div className="w-full flex flex-col mb-1">
            {input.label.length !== 0 && (
                <label className={getLabelClassList()}>{input.label}</label>
            )}

            <div className="flex flex-wrap">
                {input.optList.map((item) => (
                    <div
                        key={item.id}
                        className={`cursor-pointer flex items-center px-2 py-1 rounded-md border mr-2 mb-2 ${
                            selectedOptions.includes(item.id)
                                ? "border-green-500 text-green-500"
                                : "border-gray-300 text-gray-500"
                        }`}
                        onClick={() => handleAddOption(item.id)}
                    >
                        <span>{item.title}</span>
                        {selectedOptions.includes(item.id) && (
                            <button
                                className="ml-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveOption(item.id);
                                }}
                            >
                                X
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <p className={input.isValid ? "hidden" : "text-red-500 block"}>
                {input.error}
            </p>
        </div>
    );
};

export default TagSelect;
