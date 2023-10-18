import React, { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import Rectangle from "./Rectangle";
import Point from "./Point";

interface Props {
  children: ReactNode;
  windowSize: { width: number; height: number };
}

interface ObjectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}
// interface ObjectProps {
//   id: number;
//   xPos: number;
//   yPos: number;
//   type: string;
//   size: {};
// }
interface SizeProps {
  x0: number;
  y0: number;
  width: number;
  height: number;
}

const SimulationWindow = ({ windowSize }: Props) => {
  const canvasRef = useRef(null);

  const [coordinateSystem, setCoordinateSystem] = useState({ x0: 0, y0: 0 });

  function convertToCoordinateSystem({ x, y }) {
    return { x: x - coordinateSystem.x0, y: y - coordinateSystem.y0 };
  }

  function convertFromCoordinateSystem({ x, y }) {
    return { x: x - coordinateSystem.x0, y: y - coordinateSystem.y0 };
  }

  // function drawLine({ x1, y1, x2, y2 }) {
  //   return
  // }

  const [mousePos, setMousePos] = useState({
    x: windowSize.width / 2,
    y: windowSize.height / 2,
  });
  const [objectCounter, setObjectCounter] = useState(2);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({
    x: mousePos.x,
    y: mousePos.y,
  });
  const [initMousePos, setInitMousePos] = useState({
    x0: mousePos.x,
    y0: mousePos.y,
  });
  const [delta, setDelta] = useState({
    dx: 0,
    dy: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  // const [drawPos, setDrawPos] = useState({ height: 0, width: 0 });
  // const [draw, setDraw] = useState(false);
  // const [initDrawPos, setInitDrawPos] = useState({ x: 0, y: 0 });
  const [objectSize, setObjectSize] = useState({ height: 20, width: 10 });
  const [objects, setObjects] = useState<ObjectProps[]>([
    {
      id: 1,
      xPos: prevMousePos.x,
      yPos: prevMousePos.y,
      type: "rectangle",
      size: objectSize,
    },
  ]);

  const boundary = {
    minX: 0 + objectSize.width / 2,
    minY: 0 + objectSize.height / 2,
    maxX: windowSize.width - objectSize.width / 2,
    maxY: windowSize.height - objectSize.height / 2,
  };

  // const boundary = {
  //   minX: 0,
  //   minY: 0,
  //   maxX: windowSize.width,
  //   maxY: windowSize.height,
  // };

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  useEffect(() => {
    const handleMouseMove = (event: { clientX: any; clientY: any }) => {
      const newX = clamp(event.clientX, boundary.minX, boundary.maxX);
      const newY = clamp(event.clientY, boundary.minY, boundary.maxY);
      setMousePos({ x: newX, y: newY });
      if (isDragging) {
        const deltaX = mousePos.x - initMousePos.x0;
        const deltaY = mousePos.y - initMousePos.y0;
        setDelta({ dx: deltaX, dy: deltaY });
      }
      // const newWidth = objectSize.width + delta.dx;
      // const newHeight = objectSize.height + delta.dy;
      // setObjectSize({ width: newWidth, height: newHeight });
    };
    // window.addEventListener("mouseup", () => console.log("asdfsdfdsfsd"));

    function sizeHandler(x1: number, y1: number, x2: number, y2: number) {
      const sizeInfo: SizeProps = {
        x0: x1,
        y0: y1,
        width: x2 - x1,
        height: y2 - y1,
      };
      if (x1 > x2) {
        // rest
      }
    }

    const handleMouseDown = (event: any) => {
      // setDraw(true);÷
      setIsDragging(true);
      setInitMousePos({ x0: mousePos.x, y0: mousePos.y });

      // setInitDrawPos({ x: mousePos.x, y: mousePos.y });
    };

    const handleMouseUp = (event: any) => {
      if (!isDragging) {
        return;
        // setIsDragging(false);
      }
      // setFinalMousePos({ x2: mousePos.x, y2: mousePos.y });
      setIsDragging(false);
    };
    // const handleMouseUp = (event: any) => {
    //   if (draw) {
    //     setDrawPos({
    //       width: initDrawPos.x - mousePos.x,
    //       height: initDrawPos.y - mousePos.y,
    //     });
    //     // addObject(newObjectType="rectangle", x=initDrawPos.x, y=initDrawPos.y);
    //   }
    //   setDraw(false);
    // };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [boundary]);

  const handleSizeCallback = (
    size: React.SetStateAction<{ height: number; width: number }>
  ) => {
    setObjectSize(size);
  };

  const handleContextMenuVisible = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setPrevMousePos({ x: mousePos.x, y: mousePos.y });
    setContextMenuVisible(!contextMenuVisible);
    console.log("context");
  };

  const addObject = (newObjectType: string) => {
    const newObject = {
      x: mousePos.x,
      y: mousePos.y,
      width: 20,
      height: 10,
      color: "red",
    };
    // const newObject = {
    //   id: objectCounter,
    //   xPos: prevMousePos.x,
    //   yPos: prevMousePos.y,
    //   type: newObjectType,
    //   size: objectSize,
    // };

    setObjects([...objects, newObject]);
    setObjectCounter(objectCounter + 1);
    setContextMenuVisible(!contextMenuVisible);
  };

  const deleteObject = (id: number) => {
    const udpatedObjects = objects.filter((object) => object.id != id);
    setObjects(udpatedObjects);
  };

  const c = convertToCoordinateSystem(mousePos);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    objects.forEach((object) => {
      ctx.fillStyle = object.color;
      ctx.fillRect(object.x, object.y, object.width, object.height);
    });
    // ctx.fillStyle = "blue";
    // ctx.fillRect(50, 50, 100, 100);
    // ctx.fillRect()
    // ctx.fillRect(50, 50, 10, 0);
    // Your drawing code goes here
  }, [objects]);

  return (
    <div
      onClick={() => setContextMenuVisible(false)}
      onContextMenu={(e) => handleContextMenuVisible(e)}
    >
      html top, left: {mousePos.x}, {mousePos.y}
      coordinate system x, y: {c.x}, {c.y}
      <canvas
        ref={canvasRef}
        style={{
          width: windowSize.width,
          height: windowSize.height,
          border: "1px solid black",
        }}
      >
        {objects.map((object) => (
          <div key={object.id}>
            {object.type === "rectangle" && (
              <Rectangle
                // updateData={() => console.log("asf")}
                // isDrag={isDragging}
                // sizeCallback={handleSizeCallback}
                // delta={delta}
                mousePos={{
                  x: mousePos.x - objectSize.width / 2,
                  y: mousePos.y - objectSize.height / 2,
                }}
                ctx={ctx}
              >
                <div onClick={() => deleteObject(object.id)}>Delete</div>
              </Rectangle>
            )}
            {object.type === "point" && (
              <Point
                updateData={() => console.log("asf")}
                sizeCallback={handleSizeCallback}
                mousePos={{
                  x: mousePos.x - objectSize.width / 2,
                  y: mousePos.y - objectSize.height / 2,
                }}
              >
                <div onClick={() => deleteObject(object.id)}>Delete</div>
              </Point>
            )}
          </div>
        ))}
        {/* {children} */}
        {/* <button onClick={addObject}>Add object</button> */}
        {/* <button onClick={() => console.log("button")}>Add object</button> */}
      </canvas>
      {contextMenuVisible && (
        <div
          className="context-menu"
          style={{ left: prevMousePos.x, top: prevMousePos.y }}
        >
          <div onClick={() => addObject("point")}>Add PinPoint</div>
          <div onClick={() => addObject("rectangle")}>Add Rectangle</div>
          <div onClick={() => addObject("rectangle")}>Add Line</div>
          <div
            onClick={() => {
              setCoordinateSystem({ x0: prevMousePos.x, y0: prevMousePos.y });
              setContextMenuVisible(false);
            }}
          >
            Set Coordinate System
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationWindow;

// const SimulationWindow = () => {
//     const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//       const handleMousePos = (event) => {
//         setMousePos({ x: event.clientX, y: event.clientY });
//       };

//       window.addEventListener("mousemove", handleMousePos);

//       return () => {
//         window.removeEventListener("mousemove", handleMousePos);
//       };
//     }, []);

//     return (
//       <div>
//         {mousePos.x}, {mousePos.y}
//       </div>
//     );
//   };

//   export default SimulationWindow;
