import React from "react";

const Input = ({ label, type, value, onChange, attributes }) => {
  return (
    <>
      <label htmlFor="#label">{label}</label>
      <input
        id="label"
        type={type}
        value={value}
        onChange={onChange}
        {...attributes}
      ></input>
      <br></br>
    </>
  );
};

export default Input;
