import React, { useEffect, useState } from "react";
import PinPoint from "./PinPoint";
import SimulationSettings from "./SimulationSettings";
import io from "socket.io-client";
import Input from "./Input";

const Simulation = () => {
  const socket = io("http://localhost:5005");

  const [simulationRunning, setSimulationRunning] = useState(false);

  const [time, setTime] = useState(0);
  const [objects, setObjects] = useState([
    { id: 1, positions: [{ x: 100, y: 100 }] },
  ]);

  const defaultInitSettings = {
    id: 1,
    positions: [{ x: 100, y: 100 }],
  };

  useEffect(() => {
    const socket = io("http://localhost:5005");

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

  const updateInitialConditions = (data) => {
    setObjects([defaultInitSettings]);
    const updatedData = { ...data, objects: objects };
    socket.emit("simulation_run", updatedData);
  };

  const handleTime = (event) => {
    setTime(Number(event.target.value));
  };

  return (
    <>
      <div
        style={{ width: "800px", height: "800px", border: "1px solid black" }}
      >
        {objects.map((obj) => (
          <PinPoint
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
        <Input
          label="time"
          type="number"
          value={time}
          onChange={handleTime}
        ></Input>
        {simulationRunning ? (
          <p>Simulation is running...</p>
        ) : (
          <p>Simulation is not running.</p>
        )}
      </div>
      <SimulationSettings updateInitialConditions={updateInitialConditions} />
    </>
  );
};

export default Simulation;
