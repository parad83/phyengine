import { useEffect, useRef, useState } from "react";
import SimulationWindow from "./components/SimulationWindow";
import Point from "./components/Point";
import Slider from "./components/Slider";
import SimulationSettings from "./components/SimulationSettings";
import Rectangle from "./components/Rectangle";
import PinPoint from "./components/PinPoint";
import Simulation from "./components/Simulation";
// import io from "socket.io-client";

// const socket = io("ws://localhost:8765"); // URL to your WebSocket server

export default function App() {
  // const [position, setPosition] = useState({ x: 100, y: 100 });
  // // const [initialCoditions, setInitialCoditions] = useState({
  // //   initialVelocity_X: 1,
  // //   initialVelocity_Y: 1,
  // //   duration: 10,
  // //   timestep: 1,
  // // });

  // // useEffect(() => {
  // // socket.on("message", (data) => {
  // // Handle incoming real-time data
  // // });
  // // }, []);

  // const updateInitialConditions = (data) => {
  //   console.log(data);
  // };

  return (
    // <div className="asdf">
    <Simulation />
    // <>
    //   <div
    //     style={{ width: "800px", height: "800px", border: "1px solid black" }}
    //   >
    //     {/* <SimulationWindow windowSize={{ width: 800, height: 800 }} /> */}
    //     <PinPoint position={position}></PinPoint>
    //     {/* <button onClick={addObject}>Add object</button>
    //   <button onClick={() => console.log("button")}>Add object</button> */}
    //     {/* <SimulationSettings /> */}
    //     {/* <Slider /> */}
    //   </div>
    //   <SimulationSettings updateInitialConditions={updateInitialConditions} />
    // </>
  );
}
