import React, { useEffect, useState } from "react";
import Input from "./Input";

interface ObjectProps {
  childrenInputs: React.ReactNode;
  // initPosition: { x: number; y: number };
  delta: { dx: number; dy: number };
  mousePos: { x: number; y: number };
  // size: { width: number; height: number };
  sizeCallback: (data: any) => void;
  isDrag: boolean;
  ctx: any;
}

const Object = ({
  childrenInputs,
  delta,
  mousePos,
  sizeCallback,
  isDrag,
  ctx,
}: ObjectProps) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(20);
  const [color, setColor] = useState("#FF0000");

  const [stationary, setStationary] = useState(false);

  const [prevMousePos, setPrevMousePos] = useState({
    x: mousePos.x,
    y: mousePos.y,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [resize, setResize] = useState(false);

  const [initPos, setInitPos] = useState({
    x: prevMousePos.x,
    y: prevMousePos.y,
  });

  const handleWidth = (event: { target: { value: number } }) => {
    const newWidth = Number(event.target.value);
    setWidth(newWidth);
    sizeCallback({ width: newWidth, height });
  };

  const handleHeight = (event: { target: { value: number } }) => {
    const newHeight = Number(event.target.value);
    setHeight(newHeight);
    sizeCallback({ width, height: newHeight });
  };

  const handleResize = () => {
    // setResize(!resize);
    // console.log(InitPos);
    // width += 10;
    // console.log(mousePos);/
  };

  // const [drawInitialPosition, setDrawInitialPosition] = useState(prevMousePos);
  // const [drawSize, setDrawSize] = useState(size);
  // const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    // setIsResizing(true);
    // setDrawSize(size);
    // setDrawInitialPosition(prevMousePos);
    // console.log("down");
    // console.log(delta);
  };

  // const handleMouseUp = () => {
  //   console.log("up");
  //   setIsResizing(false);
  // };

  // const handleMouseMove = () => {
  //   console.log(mousePos.x - drawInitialPosition.x);
  //   console.log(mousePos.x, drawInitialPosition.x);
  //   if (!isResizing) return;
  //   size = drawSize;
  // };

  // useEffect(() => {
  //   console.log("asf");

  //     window.addEventListener("mousemove", handleMouseMove);
  //     window.addEventListener("mouseup", handleMouseUp);

  //     return () => {
  //       window.removeEventListener("mouseup", handleMouseUp);
  //       window.removeEventListener("mousemove", handleMouseMove);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (isDrag) {
      // Update the width and height when dragging
      console.log(delta);
      setWidth(width + delta.dx);
      setHeight(height + delta.dy);
    }
    if (ctx) {
      // Example: Draw a red rectangle
      ctx.fillStyle = color;
      ctx.fillRect(mousePos.x, mousePos.y, width, height);
    }
  }, [ctx]);

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

  return (
    <div
      className="object"
      style={{
        left: stationary ? mousePos.x : prevMousePos.x,
        top: stationary ? mousePos.y : prevMousePos.y,
      }}
    >
      <span
        className="object-shape"
        style={{
          backgroundColor: color,
          width: width,
          height: height,
        }}
        onClick={stationary ? handleStationary : showMenu}
        onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
      ></span>
      {menuOpen && (
        <div
          className="object-menu"
          // style={{ top: objectMenuPos.top, left: objectMenuPos.left }}
        >
          {stationary ? mousePos.x : prevMousePos.x},
          {stationary ? mousePos.y : prevMousePos.y}
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
          <div onClick={handleStationary}>Move</div>
          <div onClick={handleResize}>Resize</div>
          <div onClick={hideMenu}>Close</div>
          {childrenInputs}
        </div>
      )}
    </div>
  );
};

export default Object;
