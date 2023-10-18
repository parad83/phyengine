import Object from "./Object";
import React, { useRef, useState } from "react";
import Input from "./Input";

interface RectProps {
  children: React.ReactNode;
  position: { x: number; y: number };
  ctx: any;
  // mousePos: { x: number; y: number };
}

const Rectangle = ({ children, position, ctx }: RectProps) => {
  const [color, setColor] = useState("#000");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(20);

  const [objectMenuVisible, setObjectMenuVisible] = useState(false);

  //   const [width, setWidth] = useState(10);
  //   const [height, setHeight] = useState(20);

  const handleWidth = (event: { target: { value: number } }) => {
    setWidth(Number(event.target.value));
  };

  const handleHeight = (event: { target: { value: number } }) => {
    setHeight(Number(event.target.value));
  };

  const handleColor = (event: { target: { value: number } }) => {
    setColor(String(event.target.value));
  };

  const showMenu = () => {
    setObjectMenuVisible(true);
  };

  const hideMenu = () => {
    setObjectMenuVisible(false);
  };

  return (
    <>
      <div
        className="object"
        style={{
          left: position.x,
          top: position.y,
        }}
        onClick={showMenu}
      ></div>
      {objectMenuVisible && (
        <div className="object-menu">
          {/* {stationary ? mousePos.x : prevMousePos.x},
        {stationary ? mousePos.y : prevMousePos.y} */}
          {position.x} {position.y}
          <Input
            label="Color"
            type="color"
            value={color}
            onChange={handleColor}
          ></Input>
          <Input
            label="Width"
            type="number"
            value={width}
            onChange={handleWidth}
          />
          <Input
            label="Height"
            type="number"
            value={height}
            onChange={handleHeight}
          />
          {/* <div onClick={handleStationary}>Move</div> */}
          <div onClick={hideMenu}>Close</div>
        </div>
      )}
    </>
  );
};

export default Rectangle;
