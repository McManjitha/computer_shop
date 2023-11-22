import React from "react";

const TagInput = ({ input, handleChange, inputClassName, labelClassName }) => {
    let tagList = input.data;

    const getInputClassList = () => {
        let classes =
            "px-4 " +
            "appearance-none transition duration-300 " +
            "ease-in-out focus: outline-none " +
            "focus:ring-0 border mb-2 " +
            "border-border-base rounded-md focus:border-green-500 h-12 ";

        classes += input.error ? "border-red-500 " : " ";
        classes += inputClassName;

        return classes;
    };

    const getLabelClassList = () => {
        let classes = "mb-2 ";

        classes += labelClassName;

        return classes;
    };

    const handleRemoveOption = (tag) => {
        tagList = tagList.filter((item) => item !== tag);
        handleChange(tagList, input);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            const newTag = e.target.value.trim();

            const index = tagList.findIndex((tag) => tag === newTag);

            if (index == -1) {
                tagList = [...tagList, newTag];
                handleChange(tagList, input);
                e.target.value = "";
            }

            handleChange(tagList, input);
        }
    };

    return (
        <div className="w-full flex flex-col mb-1">
            {input.label.length !== 0 && (
                <label className={getLabelClassList()}>{input.label}</label>
            )}

            <div className="tags-wrap flex flex-wrap mb-2">
                {input.data.map((tag) => (
                    <div
                        key={Math.random()}
                        className="tag flex items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 mr-2 mb-2"
                    >
                        <span className="tag-text">{tag}</span>
                        <button
                            className="tag-remove ml-2"
                            onClick={() => handleRemoveOption(tag)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <input
                className={getInputClassList()}
                type="text"
                placeholder="Type and press Enter to add a tag"
                onKeyDown={handleInputKeyDown}
            />

            {input.error && <p className="text-red-500 block">{input.error}</p>}
        </div>
    );
};

export default TagInput;
