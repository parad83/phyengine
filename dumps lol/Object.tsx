import React, { useEffect, useState } from "react";
import Input from "./Input";

interface ObjectProps {
  mousePos: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  ctx: CanvasRenderingContext2D;
  childrenInputs: React.ReactNode;
}

const Object = ({ mousePos, size, ctx, childrenInputs }: ObjectProps) => {
  const [width, setWidth] = useState(size.width);
  const [height, setHeight] = useState(size.height);
  const [color, setColor] = useState("#FF0000");

  const [stationary, setStationary] = useState(true);

  // const [stationary, setStationary] = useState(false);
  const [isObjectMenuVisible, setIsObjectMenuVisible] = useState(false);
  // const [position, setPosition] = useState(mousePos);
  // const [prevMousePos, setPrevMousePos] = useState(mousePos);

  const handleWidth = (event: { target: { value: number } }) => {
    const newWidth = Number(event.target.value);
    setWidth(newWidth);
  };

  const handleHeight = (event: { target: { value: number } }) => {
    const newHeight = Number(event.target.value);
    setHeight(newHeight);
  };

  const handleColor = (event: { target: { value: string } }) => {
    setColor(event.target.value);
  };

  // const handleStationary = () => {
  //   setStationary(!stationary);
  // };

  const showMenu = () => {
    setIsObjectMenuVisible(true);
  };

  const hideMenu = () => {
    setIsObjectMenuVisible(false);
  };

  useEffect(() => {
    const handleClick = () => {
      if (
        mousePos.x >= position.x &&
        mousePos.y >= position.y &&
        mousePos.x <= position.x + size.width &&
        mousePos.y <= position.y + size.height
      ) {
        if (stationary) {
          handleStationary();
        } else {
          showMenu();
        }
      } else {
        hideMenu();
      }
    };
  }, [position, size, stationary]);

  if (isObjectMenuVisible) {
    return (
      <div className="object-menu">
        {/* {stationary ? mousePos.x : prevMousePos.x},
        {stationary ? mousePos.y : prevMousePos.y} */}
        {mousePos.x} {mousePos.y}
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
        {childrenInputs}
      </div>
    );
  }

  return null;
};

export default Object;
