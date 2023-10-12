import React, { useEffect, useState } from "react";
import Input from "./Input";

interface ShapeProps {
  shapeStyle: React.CSSProperties;
  onClick: () => void;
}

interface ObjectProps {
  shapeProps: ShapeProps;
  childrenInputs: React.ReactNode;
  initPosition: { x: number; y: number };
}

const Object = ({ shapeProps, childrenInputs, initPosition }: ObjectProps) => {
  // const [state, setState] = useState({
  //   mousePos: initPosition,
  //   color: "#fff",
  //   stationary: false,
  //   prevMousePos: { x: initPosition.x, y: initPosition.y },
  //   menuOpen: false,
  // });

  const [mousePos, setMousePos] = useState(initPosition);
  const [color, setColor] = useState("#FF0000");
  const [stationary, setStationary] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({
    x: mousePos.x,
    y: mousePos.y,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleStationary = () => {
    setStationary(!stationary);
    if (stationary) {
      setPrevMousePos({ x: mousePos.x, y: mousePos.y });
    }
  };

  const showMenu = () => {
    setMenuOpen(true);
  };

  const hideMenu = () => {
    setMenuOpen(false);
  };

  const handleColor = (event: { target: { value: any } }) => {
    setColor(event.target.value);
  };

  useEffect(() => {
    const handleMousePos = (event: { clientX: any; clientY: any }) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMousePos);

    return () => {
      window.removeEventListener("mousemove", handleMousePos);
    };
  }, []);

  return (
    <div
      className="object"
      style={{
        left: stationary ? mousePos.x : prevMousePos.x,
        top: stationary ? mousePos.y : prevMousePos.y,
      }}
    >
      <span
        {...shapeProps}
        style={{ backgroundColor: color }}
        onClick={stationary ? handleStationary : showMenu}
      ></span>
      {menuOpen && (
        <div className="objectMenu">
          {stationary ? mousePos.x : prevMousePos.x},{" "}
          {stationary ? mousePos.y : prevMousePos.y}
          <Input
            label="Color"
            type="color"
            value={color}
            onChange={handleColor}
          ></Input>
          <div onClick={handleStationary}>MoveInI</div>
          <div onClick={hideMenu}>Close</div>
          {childrenInputs}
        </div>
      )}
    </div>
  );
};

export default Object;
