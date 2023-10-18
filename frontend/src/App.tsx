import { useEffect, useRef, useState } from "react";
import SimulationWindow from "./components/SimulationWindow";
import Point from "./components/Point";
import Slider from "./components/Slider";
import SimulationMenu from "./components/SimulationMenu";
import Rectangle from "./components/Rectangle";

export default function App() {
  console.log("asdf");
  return (
    <div className="asdf">
      <SimulationWindow windowSize={{ width: 800, height: 800 }} />
      {/* <button onClick={addObject}>Add object</button>
      <button onClick={() => console.log("button")}>Add object</button> */}
      {/* <SimulationMenu /> */}
      {/* <Slider /> */}
    </div>
  );
}
