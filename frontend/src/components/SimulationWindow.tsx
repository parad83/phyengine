import React, { useEffect, useState } from "react";
import { Rectangle, Point } from "./Objects";

interface Props {
  windowSize: { width: number; height: number };
}

const SimulationWindow = ({ windowSize }: Props) => {
  const [coSystem, setCoSystem] = useState({ x: 100, y: 100 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [clickMousePos, setClickMousePos] = useState({ x: 0, y: 0 });

  const [objects, setObjects] = useState([
    { type: "point", id: 1, pos: mousePos },
  ]);
  const [objectsCounter, setObjectsCounter] = useState(2);

  const handleContextMenuVisible = (e) => {
    e.preventDefault();
    setClickMousePos(mousePos);
    setContextMenuVisible(true);
  };

  const addObject = (newObjectType: string) => {
    const newObject = {
      type: newObjectType,
      id: objectsCounter,
      pos: clickMousePos,
    };
    // const newObject = {
    //   id: objectCounter,
    //   xPos: prevMousePos.x,
    //   yPos: prevMousePos.y,
    //   type: newObjectType,
    //   size: objectSize,
    // };

    setObjects([...objects, newObject]);
    setObjectsCounter(objectsCounter + 1);
    setContextMenuVisible(!contextMenuVisible);
  };

  const deleteObject = (id: number) => {
    const udpatedObjects = objects.filter((object) => object.id != id);
    setObjects(udpatedObjects);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    document
      .getElementById("simulation-window")
      .addEventListener("mousemove", handleMouseMove);

    return () => {
      document
        .getElementById("simulation-window")
        .removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="simulation-window"
      onContextMenu={(e) => handleContextMenuVisible(e)}
      onClick={() => setContextMenuVisible(false)}
      style={{
        width: windowSize.width,
        height: windowSize.height,
        border: "1px solid black",
        marginTop: coSystem.y,
        marginLeft: coSystem.x,
      }}
    >
      {objects.map((object) => (
        <div key={object.id}>
          {object.type === "point" && (
            <Point
              // updateData={() => console.log("asf")}
              // isDrag={isDragging}
              // sizeCallback={handleSizeCallback}
              // delta={delta}
              mousePos={{
                x: object.pos.x,
                y: object.pos.y,
              }}
            >
              <div onClick={() => deleteObject(object.id)}>Delete</div>
            </Point>
          )}{" "}
          {object.type === "rectangle" && (
            <Rectangle
              // updateData={() => console.log("asf")}
              // isDrag={isDragging}
              // sizeCallback={handleSizeCallback}
              // delta={delta}
              mousePos={{
                x: object.pos.x,
                y: object.pos.y,
              }}
            >
              <div onClick={() => deleteObject(object.id)}>Delete</div>
            </Rectangle>
          )}
        </div>
      ))}
      {mousePos.x - coSystem.x}, {mousePos.y - coSystem.y}
      {contextMenuVisible && (
        <div
          className="context-menu"
          style={{ left: clickMousePos.x, top: clickMousePos.y }}
        >
          <div onClick={() => addObject("point")}>Add PinPoint</div>
          <div onClick={() => addObject("rectangle")}>Add Rectangle</div>
          {/* <div onClick={() => addObject("rectangle")}>Add Line</div> */}
          <div
            onClick={() => {
              setCoSystem({ x: clickMousePos.x, y: clickMousePos.y });
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
