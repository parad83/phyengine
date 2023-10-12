import Object from "./Object";
import React, { useState } from "react";
import Input from "./Input";

interface RectProps {
  children: React.ReactNode;
  mousePos: { x: number; y: number };
  delta: { dx: number; dy: number };
  sizeCallback: (data: any) => void;
  isDrag: boolean;
  ctx: any;
}

const Rectangle = ({
  children,
  mousePos,
  sizeCallback,
  delta,
  isDrag,
  ctx,
}: RectProps) => {
  const [size, setSize] = useState({ width: 20, height: 10 });
  //   const [width, setWidth] = useState(10);
  //   const [height, setHeight] = useState(20);

  //   const handleWidth = (event: { target: { value: number } }) => {
  //     const newWidth = Number(event.target.value);
  //     setWidth(newWidth);
  //     sizeCallback({ width: newWidth, height });
  //   };

  //   const handleHeight = (event: { target: { value: number } }) => {
  //     const newHeight = Number(event.target.value);
  //     setHeight(newHeight);
  //     sizeCallback({ width, height: newHeight });
  //   };

  const handleSizeCallback = (
    size: React.SetStateAction<{ height: number; width: number }>
  ) => {
    setSize(size);
  };
  return (
    <Object
      size={size}
      childrenInputs={
        <>
          {/* //   <Input
          //     label="Width"
          //     type="number"
          //     value={width}
          //     onChange={handleWidth}
          //   />
          //   <Input
          //     label="Height"
          //     type="number"
          //     value={height}
          //     onChange={handleHeight}
          //   /> */}
          {children}
        </>
      }
      //   delta={delta}
      mousePos={mousePos}
      //   size={{ width: width, height: height }}
      //   sizeCallback={handleSizeCallback}
      //   isDrag={isDrag}
      ctx={ctx}
    ></Object>
  );
};

export default Rectangle;
