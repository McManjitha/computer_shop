import React from "react";
import { CardSelection, Input, TextArea } from "../../../../components/ui";
// import Address from "../../../common/ui/address";

const DetailSection = ({ inputs, handleChange }) => {
    return (
        <div className="h-full w-4/5 mx-auto md:w-full col-span-6">
            <CardSelection
                input={inputs.pickupMethod}
                handleChange={handleChange}
            />
            {inputs.pickupMethod.data == "delivery" && (
                <div>
                    <Input input={inputs.name} handleChange={handleChange} />
                    <Input
                        input={inputs.phoneNumber}
                        handleChange={handleChange}
                    />
                    <TextArea
                        input={inputs.address}
                        handleChange={handleChange}
                    />
                </div>
            )}

            <div className="mt-4">
                <CardSelection
                    input={inputs.paymentMethod}
                    handleChange={handleChange}
                />
            </div>
        </div>
    );
};

export default DetailSection;
