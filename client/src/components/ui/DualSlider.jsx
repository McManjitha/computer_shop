import React from "react";
import { Direction, Range, getTrackBackground } from "react-range";

const DualSlider = ({ input, handleChange, indicator }) => {
    const { min, max, step, data } = input;

    return (
        <div className="flex-col flex-nowrap mt-4"
            style={{
                display: "flex",
                justifyContent: "center",
                
            }}
        >
            <Range
                values={data}
                step={step}
                min={min}
                max={max}
                onChange={(values) => handleChange(values, input)}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: "28px",
                            display: "flex",
                            width: "80%",
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values: data,
                                    colors: ["#ccc", "#548BF4", "#ccc"],
                                    min: min,
                                    max: max,
                                }),
                                alignSelf: "center",
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "20px",
                            width: "20px",
                            borderRadius: "4px",
                            backgroundColor: "#FFF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0px 2px 6px #AAA",
                        }}
                    >
                        <div
                            style={{
                                height: "16px",
                                width: "5px",
                                backgroundColor: isDragged ? "#548BF4" : "#CCC",
                            }}
                        />
                    </div>
                )}
            />
            <output className="mt-4 mb-4 text-blue-400" id="output">
                {data[0] + " " + indicator} - {data[1] + " " + indicator}
            </output>
        </div>
    );
};

export default DualSlider;
