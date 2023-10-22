import React, { useState } from "react";
import Input from "./Input";

const SimulationSettings = ({ updateInitialConditions }) => {
  const [initVel_X, setInitVel_X] = useState(1);
  const [initVel_Y, setInitVel_Y] = useState(1);
  const [duration, setDuration] = useState(10);
  const [timestep, setTimestep] = useState(1);

  const handleinitVel_X = (event) => {
    setInitVel_X(Number(event.target.value));
  };
  const handleInitVel_Y = (event) => {
    setInitVel_Y(Number(event.target.value));
  };
  const handleDuration = (event) => {
    setDuration(Number(event.target.value));
  };
  const handleTimestep = (event) => {
    setTimestep(Number(event.target.value));
  };

  const handleRun = () => {
    const initialConditions = {
      initVel_X,
      initVel_Y,
      duration,
      timestep,
    };
    updateInitialConditions(initialConditions);
  };

  return (
    <div className="simulationSettings">
      <Input
        label="initial velocity in the x-axis"
        type="number"
        value={initVel_X}
        onChange={handleinitVel_X}
      />
      <Input
        label="initial velocity in the y-axis"
        type="number"
        value={initVel_Y}
        onChange={handleInitVel_Y}
      />
      <Input
        label="duration"
        type="number"
        value={duration}
        onChange={handleDuration}
      />
      <Input
        label="timestep"
        type="number"
        value={timestep}
        onChange={handleTimestep}
        attributes={{ step: "0.001" }}
      />
      <button onClick={handleRun}>Run</button>
      {/* <button onClick={handleStop}>Stop</button> */}
    </div>
  );
};

export default SimulationSettings;
