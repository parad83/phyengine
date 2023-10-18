import React, { useEffect, useRef, useState } from "react";
import Rectangle from "./Rectangle";

interface SimulationWindowProps {
  windowSize: { width: number; height: number };
  // ctx: CanvasRenderingContext2D;
}

const SimulationWindow = ({ windowSize }: SimulationWindowProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const winMargin = 100;
  const [coSystem, setCoSystem] = useState({ x: winMargin, y: winMargin });

  const [objects, setObjects] = useState([
    { position: mousePos, size: { width: 10, height: 20 }, type: "rectangle" },
    {
      position: { x: 0, y: 100 },
      size: { width: 10, height: 20 },
      type: "rectangle",
    },
  ]);

  const boundary = {
    minX: 0,
    minY: 0,
    maxX: windowSize.width,
    maxY: windowSize.height,
  };

  const createNewObject = () => {
    const newObject = {
      position: mousePos,
      size: { width: 10, height: 20 },
      type: "rectangle",
    };
    console.log(
      "----------------------------------------------------------------"
    );
    console.log(mousePos);
    setObjects([...objects, newObject]);
    // console.log(objects);
  };

  const canvasRef = useRef(null);

  // const clamp = (value: number, max: number) => {
  //   return Math.min(value, max);
  // };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseDown = (event) => {
      // console.log(mousePos);
    };

    // context.fillStyle = "#000";
    // context.fillRect(mousePos.x - coSystem.y, mousePos.y - coSystem.y, 10, 20);

    document
      .getElementById("simulation-window")
      .addEventListener("mousemove", handleMouseMove);
    document
      .getElementById("simulation-window")
      .addEventListener("mousedown", handleMouseDown);

    return () => {
      document
        .getElementById("simulation-window")
        .removeEventListener("mousemove", handleMouseMove);
      document
        .getElementById("simulation-window")
        .addEventListener("mousedown", handleMouseDown);
    };
  }, [boundary, coSystem]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // context.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach((o) => {
      context.fillStyle = "red";
      // console.log(o);
      context.beginPath();
      context.moveTo(0, 0);
      // context.lineTo(o.position.x, o.position.y);
      context.lineTo(o.position.x, o.position.y);
      console.log(o.position);
      context.stroke();

      // context.fillRect(
      //   o.position.x - coSystem.y,
      //   o.position.y - coSystem.y,
      //   o.size.width,
      //   o.size.height
      // );
    });
  }, [objects, coSystem]);

  // const drawObject = ({}) => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  // };

  return (
    <div
      id="simulation-window"
      style={{
        margin: winMargin,
        width: windowSize.width,
        height: windowSize.height,
        border: "1px solid black",
      }}
      onClick={createNewObject}
    >
      <canvas
        style={{
          // width: windowSize,
          // height: "",
          border: "1px solid red",
        }}
        ref={canvasRef}
      >
        {/* <Rectangle ctx={context} position={{ x: 240, y: 200 }}>
          {}
        </Rectangle> */}
      </canvas>
      {mousePos.x - coSystem.x}, {mousePos.y - coSystem.y}
    </div>
  );
};

export default SimulationWindow;
