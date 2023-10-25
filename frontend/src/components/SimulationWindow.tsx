import React, { useCallback, useEffect, useState } from "react";
import PinPoint from "./PinPoint";
import SimulationSettings from "./SimulationSettings";
import io from "socket.io-client";
import Input from "./Input";

const SimulationWindow = ({ windowSize, objects }) => {
  // const windowSize = (window;

  const [axisIntervalsNumber, setAxisIntervalsNumber] = useState(10);
  const [axisIntervalsStep, setAxisIntervalsStep] = useState(80);

  const [coordinateSystem, setCoordinateSystem] = useState({
    x: windowSize.width / 2,
    y: windowSize.height / 2,
  });

  const [isVisibleContextMenu, setIsVisibleContextMenu] = useState(false);

  const [isDraggingObject, setIsDraggingObject] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickMousePos, setClickMousePos] = useState({ x: 0, y: 0 });

  const [time, setTime] = useState(0);
  // const [objects, setObjects] = useState([
  // { id: 1, positions: [{ x: 100, y: 100 }] },
  // ]);
  // const [objectCounter, setObjectCounter] = useState(2);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    document
      .getElementById("simulationWindow")
      .addEventListener("mousemove", handleMouseMove);

    return () => {
      document
        .getElementById("simulationWindow")
        .removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // const updateInitialConditions = (data: any) => {
  //   // setObjects([defaultInitSettings]);
  //   const updatedData = { ...data, objects: objects };
  //   console.log("run");
  //   socket.emit("simulation_run", updatedData);
  // };

  const handleTime = (event: { target: { value: any } }) => {
    setTime(Number(event.target.value));
  };

  // const handleAddObject = () => {
  //   const newObject = { id: objectCounter, positions: [{ x: 200, y: 100 }] };
  //   setObjects([...objects, newObject]);
  //   setObjectCounter(objectCounter + 1);
  // };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setClickMousePos(mousePos);
    setIsVisibleContextMenu(!isVisibleContextMenu);
  };

  const handleSetCoordinateSystem = () => {
    setCoordinateSystem(clickMousePos);
    setIsVisibleContextMenu(false);
  };

  const handleDrag = useCallback((id: number) => {
    console.log(isDraggingObject);
    // setIsDraggingObject(true);
    if (isDraggingObject) {
      objects[id - 1].positions[0] = mousePos;
    }
  }, []);

  // const handleAddObject = () => {
  //   const newObject = { id: objects.length + 1, positions: [mousePos] };
  //   objects = [...objects, newObject];
  //   // console.log(objects);
  // };

  return (
    <>
      {mousePos.x - coordinateSystem.x}, {mousePos.y - coordinateSystem.y}
      <div
        id="simulationWindow"
        onContextMenu={handleContextMenu}
        onClick={() => setIsDraggingObject(false)}
        style={{
          width: windowSize.width,
          height: windowSize.height,
          border: "1px solid black",
        }}
      >
        <div className="axis x-axis" style={{ top: coordinateSystem.y }}>
          <div className="axis-label">x-axis</div>
        </div>
        <div className="axis y-axis" style={{ left: coordinateSystem.x }}>
          <div className="axis-label">y-axis</div>
        </div>
        {isVisibleContextMenu && (
          <div
            className="context-menu"
            style={{ left: clickMousePos.x, top: clickMousePos.y }}
          >
            <div onClick={handleSetCoordinateSystem}>Set Coordinate System</div>
            {/* <div onClick={handleAddObject}>Add Object</div> */}
          </div>
        )}
        {objects.map((obj) => (
          <PinPoint
            coordinateSystem={{ x: 0, y: 0 }}
            childrenInputs={
              <div onClick={() => setIsDraggingObject(true)}>Move</div>
            }
            key={obj.id}
            position={
              isDraggingObject
                ? mousePos
                : obj.positions[
                    obj.positions.length > 1 &&
                    time < obj.positions.length &&
                    time >= 0
                      ? time
                      : 0
                  ]
            }
          ></PinPoint>
        ))}
      </div>
    </>
  );
};

export default SimulationWindow;
