import { useEffect, useState } from "react";
import SimulationWindow from "./components/SimulationWindow";
import Point from "./components/Point";
import Slider from "./components/Slider";
import SimulationMenu from "./components/SimulationMenu";

export default function App() {
  return (
    <>
      <SimulationWindow
        windowSize={{ width: 800, height: 800 }}
      ></SimulationWindow>
      {/* <button onClick={addObject}>Add object</button>
      <button onClick={() => console.log("button")}>Add object</button> */}
      {/* <SimulationMenu /> */}
      {/* <Slider /> */}
    </>
  );
  // return (
  //   <>
  //     <SimulationWindow onClick={() => console.log("w")}>
  //       {points.map(
  //         (point) =>
  //           point && (
  //             <Point key={point.id} {...point}>
  //               <div onClick={() => deletePoint(point.id)}>Delete</div>
  //             </Point>
  //           )
  //       )}
  //     </SimulationWindow>
  //     <button onClick={addPoint}>Add point</button>
  //     {/* <SimulationMenu /> */}
  //     {/* <Slider /> */}
  //   </>
  // );
}
