import React, { useCallback, useEffect, useState } from "react";
import PinPoint from "./PinPoint";
import SimulationSettings from "./SimulationSettings";
import io from "socket.io-client";
import Input from "./Input";
import SimulationWindow from "./SimulationWindow";

const Simulation = () => {
  const socket = io("http://localhost:5005", {
    transports: ["websocket", "polling"],
  });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 800 });

  const [simulationRunning, setSimulationRunning] = useState(false);

  const [time, setTime] = useState(0);
  const [objects, setObjects] = useState([
    { id: 1, positions: [{ x: 100, y: 100 }] },
  ]);
  const [objectCounter, setObjectCounter] = useState(2);

  useEffect(() => {
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

    return () => {
      socket.disconnect();
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

  return (
    <>
      <SimulationWindow windowSize={windowSize} objects={objects} />
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
        {/* {mousePos.x}, {mousePos.y} */}
      </div>
      <SimulationSettings
        childrenInputs={<button onClick={handleAddObject}>Add Object</button>}
        updateInitialConditions={updateInitialConditions}
      />
    </>
  );
};

export default Simulation;
