import React, { useEffect, useState } from "react";

interface SimulationWindowProps {
  windowSize: { width: number; height: number };
}

const SimulationWindow = ({ windowSize }: SimulationWindowProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const boundary = {
    minX: 0,
    minY: 0,
    maxX: windowSize.width,
    maxY: windowSize.height,
  };

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const newX = clamp(event.clientX, boundary.minX, boundary.maxX);
      const newY = clamp(event.clientY, boundary.minY, boundary.maxY);
      setMousePos({ x: newX, y: newY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [boundary]);

  return (
    <div
      style={{
        width: windowSize.width,
        height: windowSize.height,
        border: "1px solid black",
      }}
    >
      {mousePos.x}, {mousePos.y}
    </div>
  );
};

export default SimulationWindow;
