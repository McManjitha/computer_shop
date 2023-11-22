import React, { useState } from "react";
import { CheckList, DualSlider } from "../../../../components/ui";

const ControlPanel = () => {
    const inputDataStructure = {
        test: {
            key: "test",
            label: "Select Option",
            data: [],
            type: "email",
            error: null,
            optList: [
                { id: "asus", title: "Asus" },
                { id: "azer", title: "azer" },
                { id: "dell", title: "Dell" },
                { id: "hp", title: "hp" },
                { id: "hp", title: "hp" },
                { id: "hp", title: "hp" },
                { id: "hp", title: "hp" },
                { id: "hp", title: "hp" },
                { id: "hp", title: "hp" },
               
       
            ],
            multiple: false,
        },
        test1: {
            key: "test2",
            label: "Select Option",
            data: 40,
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            error: null,
        },
        test2: {
            key: "test2",
            label: "Select Option",
            data: [30, 90],
            min: 0,
            max: 100,
            step: 1,
            error: null,
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleChange = (data, input) => {
        input.data = data;

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
        console.log(data);
    };

    return (
        <div className="w-full">
            <CheckList handleChange={handleChange} input={inputs.test} />

            <DualSlider
                handleChange={handleChange}
                input={inputs.test2}
                indicator={"LKR"}
            />
        </div>
    );
};

export default ControlPanel;
