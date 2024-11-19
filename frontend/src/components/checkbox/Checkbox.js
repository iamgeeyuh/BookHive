import "./Checkbox.css";
import { useState } from "react";

const Checkbox = ({ values, label, style, onChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (value) => {
    let updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      updatedValues = updatedValues.filter((v) => v !== value);
    } else {
      updatedValues.push(value);
    }
    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <div className="checkbox-container" style={style}>
      <label>{label}</label>
      {values.map((value) => {
        return (
          <div className="checkbox-item" key={value.val}>
            <input
              type="checkbox"
              value={value.val}
              onChange={() => handleCheckboxChange(value.val)}
            />
            <label>{value.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Checkbox;
