import "./Dropdown.css";

const Dropdown = ({ values, label, onChange }) => {
  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        {values.map((value) => (
          <option value={value.val} key={value.val}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
