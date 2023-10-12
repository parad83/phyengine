import React from "react";

const Input = ({ label, type, value, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange}></input>;
    </>
  );
};

export default Input;
