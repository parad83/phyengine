import React from "react";
import { useState } from "react";

const Slider = () => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event) => {
    // value(event.target.value);
    console.log("value is:", event.target.value);
  };

  const handleButtonClick = () => {
    for (let i = 1; i <= 100; i++) {
      setSliderValue(i);
      sleep(1000);
    }
  };

  return (
    <>
      <button onClick={handleButtonClick}>Go</button>
      <input
        onChange={handleSliderChange}
        value={sliderValue}
        type="range"
        min="1"
        max="100"
        className="slider"
        id="myRange"
      />
    </>
  );
};

export default Slider;
