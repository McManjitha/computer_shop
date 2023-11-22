import React from "react";
import CheckBox from "./check-box";
import "./checkListStyle.css";

const CheckList = ({ input, handleChange }) => {
    let checkedOptions = input.data;

    const handleCheck = (id) => {
        if (!checkedOptions.includes(id)) {
            checkedOptions.push(id);
        } else {
            checkedOptions = checkedOptions.filter((item) => item !== id);
        }
        handleChange(checkedOptions, input);
    };

    return (
        <div className=" flex items-start flex-row px-4 w-full flex-wrap max-h-[125px] overflow-auto border-2 border-zinc-700 p-3">
            {input.optList.map((option) => (
                <CheckBox
                    key={option.id}
                    option={option}
                    checked={checkedOptions.includes(option.id)}
                    handleCheck={handleCheck}
                
                />
            ))}
        </div>
    );
};

export default CheckList;
