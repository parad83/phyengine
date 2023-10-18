import React, { Children, useEffect, useState } from "react";
import ObjectMenu from "./ObjectMenu";
import Input from "./Input";
import { ReactNode } from "react";
import Object from "./Object";

interface PointProps {
  children: React.ReactNode;
  mousePos: { x: number; y: number };
  sizeCallback: (data: any) => void;
  updateData: () => void;
}

const Point = ({
  children,
  mousePos,
  sizeCallback,
  updateData,
}: PointProps) => {
  const [width, setWidth] = useState(10);

  const handleWidth = (event: { target: { value: any } }) => {
    const newWidth = Number(event.target.value);
    setWidth(newWidth);
    sizeCallback({ width: newWidth, height: newWidth });
  };

  return (
    <Object
      childrenInputs={
        <>
          <Input
            label="Width"
            type="number"
            value={width}
            onChange={handleWidth}
          />
          {children}
        </>
      }
      mousePos={mousePos}
      size={{ width: width, height: width }}
    ></Object>
  );
  //   <div
  //     className="object"
  //     style={{
  //       left: stationary ? mousePos.x : prevX - d,
  //       top: stationary ? mousePos.y - d : prevY - d,
  //     }}
  //   >
  //     <span
  //       onClick={stationary ? handleStationary : showMenu}
  //       style={{
  //         width: width,
  //         height: width,
  //       }}
  //       id="point"
  //     ></span>
  //     {menuOpen && (
  //       <div className="objectMenu">
  //         <Input
  //           label="Width"
  //           type="number"
  //           value={width}
  //           onChange={handleWidth}
  //         />
  //         {stationary ? mousePos.x : prevX}, {stationary ? mousePos.y : prevY}
  //         <div onClick={handleStationary}>Move</div>
  //         <div onClick={hideMenu}>Close</div>
  //         {children}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Point;
