import React, { useState } from "react";
import Input from "./Input";

const PinPoint = ({ position }) => {
  // const [position, setPosition] = useState({ x: 100, y: 100 });

  const [width, setWidth] = useState(10);

  // sizeCallback({ width: width, height: width });

  // const handleWidth = () => {
  //   setWidth(width);
  //   sizeCallback(width);
  // };

  return (
    <div
      style={{
        position: "absolute",
        width: width,
        height: width,
        backgroundColor: "red",
        top: position.y,
        left: position.x,
        borderRadius: "50%",
      }}
    ></div>
  );
};

export default PinPoint;
