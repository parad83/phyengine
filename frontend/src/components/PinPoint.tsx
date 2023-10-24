import React, { useState } from "react";
import Input from "./Input";

const PinPoint = ({ position, onPinPointMove }) => {
  // const [position, setPosition] = useState({ x: 100, y: 100 });

  const [width, setWidth] = useState(10);

  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  // const [isStationary, setIsStationary] = useState(true);

  const [initVel_X, setInitVel_X] = useState(1);
  const [initVel_Y, setInitVel_Y] = useState(1);

  // const [initPos_X, setInitPos_X] = useState(1);
  // const [initPos_Y, setInitPos_Y] = useState(1);

  const handleinitVel_X = (event: { target: { value: any } }) => {
    setInitVel_X(Number(event.target.value));
  };
  const handleInitVel_Y = (event: { target: { value: any } }) => {
    setInitVel_Y(Number(event.target.value));
  };

  // const handleInitPos_X = (event: { target: { value: any } }) => {
  //   setInitPos_X(Number(event.target.value));
  // };

  // const handleInitPos_Y = (event: { target: { value: any } }) => {
  //   setInitPos_Y(Number(event.target.value));
  // };

  return (
    <div className="object" style={{ top: position.y, left: position.x }}>
      <div
        onClick={() => setIsVisibleMenu(true)}
        className="pin-point"
        style={{
          width: width,
          height: width,
        }}
      ></div>
      {isVisibleMenu && (
        <div className="object-menu">
          x: {position.x}, y: {position.y}
          <br></br>
          <Input
            label="initial velocity in the x-axis"
            type="number"
            value={initVel_X}
            onChange={handleinitVel_X}
            attributes={undefined}
          />
          <Input
            label="initial velocity in the y-axis"
            type="number"
            value={initVel_Y}
            onChange={handleInitVel_Y}
            attributes={undefined}
          />
          <div onClick={onPinPointMove}>Move</div>
          {/* <div onClick={() => setIsStationary(false)}>Move</div> */}
          <div onClick={() => setIsVisibleMenu(false)}>Close</div>
        </div>
      )}
    </div>
  );
};

export default PinPoint;
