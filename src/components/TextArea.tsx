import React, { useState, ChangeEvent } from "react";

interface TextareaProps {
  placeholder: string;
  onChange: (value: string) => void;
  coords: { x: string; y: string };
}
const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  coords,
  onChange,
}) => {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    // onChange();
  }

  return (
    <textarea
      className="textArea-item"
      style={{ left: coords.x, top: coords.y }}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Textarea;
