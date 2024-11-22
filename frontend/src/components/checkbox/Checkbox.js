import "./Checkbox.css";

const Checkbox = ({ values, label, style, onChange, value = [] }) => {
  const handleCheckboxChange = (selectedValue) => {
    let updatedValues = [...value];
    if (updatedValues.includes(selectedValue)) {
      updatedValues = updatedValues.filter((v) => v !== selectedValue);
    } else {
      updatedValues.push(selectedValue);
    }
    onChange(updatedValues); 
  };

  return (
    <div className="checkbox-container" style={style}>
      <label>{label}</label>
      {values.map((option) => (
        <div className="checkbox-item" key={option.val}>
          <input
            type="checkbox"
            value={option.val}
            checked={value.includes(option.val)} 
            onChange={() => handleCheckboxChange(option.val)}
          />
          <label>{option.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;