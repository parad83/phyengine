import React from "react";

interface InputProps {
  className: string;
  label: string;
  type: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  attributes: Record<string, unknown>;
}

const Input = ({ label, type, value, onChange, attributes }: InputProps) => {
  const id = label.replace(/\s+/g, "_");

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        {...attributes}
      />
      <br />
    </>
  );
};

export default Input;
