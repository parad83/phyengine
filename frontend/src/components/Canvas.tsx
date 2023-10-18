import React from "react";
import { useRef, useState, useEffect } from "react";

interface CanvasProps {
  windowSize: {
    width: number;
    height: number;
  };
}

const Canvas = ({ windowSize }: CanvasProps) => {
  const [mousePos, setMousePos] = useState({
    x: windowSize.width / 2,
    y: windowSize.height / 2,
  });

  const canvasRef = useRef(null);

  const draw = (ctx, wdith = 10, height = 20) => {
    ctx.clearRect(mousePos.x, mousePos.y, wdith, height);
    ctx.fillStyle = "#000000";
    // ctx.beginPath();
    // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {});
  return <div>Canvas</div>;
};

export default Canvas;
