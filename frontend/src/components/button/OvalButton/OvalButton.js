import "./OvalButton.css";

const OvalButton = ({ label, onClick, type = "button", style }) => {
  return (
    <button className="oval-button" onClick={onClick} type={type} style={style}>
      {label}
    </button>
  );
};

export default OvalButton;
