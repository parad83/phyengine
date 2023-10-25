import React, { useState } from "react";
import Input from "./Input";

const SimulationSettings = ({ updateInitialConditions, childrenInputs }) => {
  const [duration, setDuration] = useState(10);
  const [timestep, setTimestep] = useState(1);

  const handleDuration = (event: { target: { value: any } }) => {
    setDuration(Number(event.target.value));
  };
  const handleTimestep = (event: { target: { value: any } }) => {
    setTimestep(Number(event.target.value));
  };

  const handleRun = () => {
    const initialConditions = {
      duration,
      timestep,
    };
    updateInitialConditions(initialConditions);
  };

  return (
    <div className="simulation-settings">
      <Input
        label="duration"
        type="number"
        value={duration}
        onChange={handleDuration}
        attributes={undefined}
      />
      <Input
        label="timestep"
        type="number"
        value={timestep}
        onChange={handleTimestep}
        attributes={{ step: "0.001" }}
      />
      {childrenInputs} <button onClick={handleRun}>Run</button>
      {/* <button onClick={handleStop}>Stop</button> */}
    </div>
  );
};

export default SimulationSettings;
