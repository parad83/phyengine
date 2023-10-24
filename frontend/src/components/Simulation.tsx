import React, { useEffect, useState } from "react";
import PinPoint from "./PinPoint";
import SimulationSettings from "./SimulationSettings";
import io from "socket.io-client";
import Input from "./Input";

const Simulation = () => {
  const socket = io("http://localhost:5005", {
    transports: ["websocket", "polling"],
  });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 800 });

  const [coordinateSystem, setCoordinateSystem] = useState({
    x: windowSize.width / 2,
    y: windowSize.height / 2,
  });

  const [simulationRunning, setSimulationRunning] = useState(false);
  const [isVisibleContextMenu, setIsVisibleContextMenu] = useState(false);

  const [isDraggingObject, setIsDraggingObject] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickMousePos, setClickMousePos] = useState({ x: 0, y: 0 });

  const [time, setTime] = useState(0);
  const [objects, setObjects] = useState([
    { id: 1, positions: [{ x: 100, y: 100 }] },
  ]);
  const [objectCounter, setObjectCounter] = useState(2);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    // const socket = io("http://localhost:5005");

    socket.on("json", (message) => {
      console.log("json: " + message);
    });

    socket.on("message", (message) => {
      console.log("msg: " + message);
    });

    socket.on("simulation_start", () => {
      console.log("Simulation started");
      setSimulationRunning(true);
    });

    socket.on("simulation_end", (data) => {
      console.log("Simulation ended");
      console.log(data);
      setObjects(data);
      setSimulationRunning(false);
    });

    document
      .getElementById("simulationWindow")
      .addEventListener("mousemove", handleMouseMove);

    return () => {
      socket.disconnect();
      document
        .getElementById("simulationWindow")
        .removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const updateInitialConditions = (data: any) => {
    // setObjects([defaultInitSettings]);
    const updatedData = { ...data, objects: objects };
    console.log("run");
    socket.emit("simulation_run", updatedData);
  };

  const handleTime = (event: { target: { value: any } }) => {
    setTime(Number(event.target.value));
  };

  const handleAddObject = () => {
    const newObject = { id: objectCounter, positions: [{ x: 200, y: 100 }] };
    setObjects([...objects, newObject]);
    setObjectCounter(objectCounter + 1);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setClickMousePos(mousePos);
    setIsVisibleContextMenu(!isVisibleContextMenu);
  };

  const handleSetCoordinateSystem = () => {
    setCoordinateSystem(clickMousePos);
    setIsVisibleContextMenu(false);
  };

  const handleDrag = (id) => {
    setIsDraggingObject(true);
    objects[id - 1].positions[0] = mousePos;
  };

  return (
    <>
      <div
        id="simulationWindow"
        onContextMenu={handleContextMenu}
        onClick={() =>
          (isVisibleContextMenu && setIsVisibleContextMenu(false)) ||
          (isDraggingObject && setIsDraggingObject(false))
        }
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
          </div>
        )}
        {objects.map((obj) => (
          <PinPoint
            onPinPointMove={handleDrag(obj.id)}
            key={obj.id}
            position={
              obj.positions[
                obj.positions.length > 1 &&
                time < obj.positions.length &&
                time >= 0
                  ? time
                  : 0
              ]
            }
          ></PinPoint>
        ))}
        <div className="simulation-data">
          <Input
            label="time"
            type="number"
            value={time}
            onChange={handleTime}
            attributes={null}
          ></Input>
          {simulationRunning ? (
            <p>Simulation is running...</p>
          ) : (
            <p>Simulation is not running.</p>
          )}
          {mousePos.x}, {mousePos.y}
        </div>
      </div>
      <SimulationSettings
        childrenInputs={<button onClick={handleAddObject}>Add Object</button>}
        updateInitialConditions={updateInitialConditions}
      />
    </>
  );
};

export default Simulation;
