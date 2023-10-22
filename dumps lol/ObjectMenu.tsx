import React, { useState } from "react";
import Input from "./Input";

interface Props {
  isOpen: boolean;
}

const ObjectMenu = ({ click }) => {
  const [width, setWidth] = useState(10);

  const handleWidth = (event) => {
    setWidth(event.target.value);
  };

  return (
    <div className="objectMenu">
      <Input label="Width" type="number" value={width} onChange={handleWidth} />
      <div onClick={click}>Close</div>
      <div onClick={click}>Move</div>
    </div>
    // <Input label="Width" type="number" value={width} onChange={handleWidth} />
  );
};

export default ObjectMenu;
