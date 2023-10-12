import React, { useEffect, useState } from "react";

interface SimulationWindowProps {
  windowSize: { width: number; height: number };
  ctx: CanvasRenderingContext2D;
}

const SimulationWindow = ({ windowSize, ctx }: SimulationWindowProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const winMargin = 100;
  const [coSystem, setCoSystem] = useState({ x: winMargin, y: winMargin });

  const [objects, setObjects] = useState({});

  const boundary = {
    minX: 0,
    minY: 0,
    maxX: windowSize.width,
    maxY: windowSize.height,
  };

  const clamp = (value: number, max: number) => {
    return Math.min(value, max);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const newX = clamp(event.clientX - coSystem.x, boundary.minX);
      const newY = clamp(event.clientY - coSystem.y, boundary.minY);
      setMousePos({ x: newX, y: newY });
    };

    document
      .getElementById("simulation-window")
      .addEventListener("mousemove", handleMouseMove);

    return () => {
      document
        .getElementById("simulation-window")
        .removeEventListener("mousemove", handleMouseMove);
    };
  }, [boundary]);

  return (
    <div
      id="simulation-window"
      style={{
        margin: winMargin,
        width: windowSize.width,
        height: windowSize.height,
        border: "1px solid black",
      }}
    >
      <canvas
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid red",
        }}
      ></canvas>
      {mousePos.x}, {mousePos.y}
    </div>
  );
};

export default SimulationWindow;
