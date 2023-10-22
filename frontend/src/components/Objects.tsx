import React, { useState } from "react";
import Input from "./Input";

interface ObjectsProps {
  childrenInputs: React.ReactNode;
  mousePos: { x: number; y: number };
  childrenStyles: React.CSSProperties;
}

export const Objects = ({
  mousePos,
  childrenInputs,
  childrenStyles,
}: ObjectsProps) => {
  const [width, setWidth] = useState(10);
  const [color, setColor] = useState("#FF0000");
  const [objectPostion, setObjectPostion] = useState(mousePos);

  const [isObjectMenuVisible, setIsObjectMenuVisible] = useState(false);
  const [isStationary, setIsStationary] = useState(true);

  const handleWidth = (event: { target: { value: number } }) => {
    setWidth(Number(event.target.value));
  };

  const handleColor = (event: { target: { value: number } }) => {
    setColor(String(event.target.value));
  };

  const showMenu = () => {
    setIsObjectMenuVisible(true);
  };

  const hideMenu = () => {
    setIsObjectMenuVisible(false);
  };

  const handleStationary = () => {
    setIsStationary(!isStationary);
    if (!isStationary) {
      setObjectPostion({ x: mousePos.x, y: mousePos.y });
    }
  };

  return (
    <div
      className="object"
      style={{
        // top: isStationary ? objectPostion.y : mousePos.y,
        // left: isStationary ? objectPostion.x : mousePos.x,
        top: mousePos.y,
        left: mousePos.x,
      }}
    >
      <span
        className="object-shape"
        style={{
          backgroundColor: color,
          width: width,
          height: width,
          ...childrenStyles,
        }}
        onClick={showMenu}
      ></span>
      {isObjectMenuVisible && (
        <div className="object-menu">
          {isStationary ? objectPostion.x : mousePos.x}
          {isStationary ? objectPostion.y : mousePos.y}
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
          ></Input>
          {childrenInputs}
          {/* <div onClick={handleResize}>Resize</div> */}
          <div onClick={handleStationary}>Move</div>
          <div onClick={hideMenu}>Close</div>
        </div>
      )}
    </div>
  );
};

interface RectangleProps {
  mousePos: { x: number; y: number };
  children: React.ReactNode;
}

export const Rectangle = ({ mousePos, children }: RectangleProps) => {
  const [height, setHeight] = useState(20);

  const handleHeight = (event: { target: { value: number } }) => {
    setHeight(Number(event.target.value));
  };
  return (
    <div>
      <Objects
        childrenStyles={{ height: height }}
        mousePos={mousePos}
        childrenInputs={
          <>
            <Input
              label="Height"
              type="number"
              value={height}
              onChange={handleHeight}
            ></Input>
            {children}
          </>
        }
      ></Objects>
    </div>
  );
};

interface PointProps {
  mousePos: { x: number; y: number };
  children: React.ReactNode;
}

export const Point = ({ mousePos, children }: PointProps) => {
  return (
    <div>
      {" "}
      <Objects
        childrenStyles={{ borderRadius: "50%" }}
        mousePos={mousePos}
        childrenInputs={<>{children}</>}
      ></Objects>
    </div>
  );
};
