import "./SquareButton.css";

const SquareButton = ({ label, onClick, type = "button", icon }) => {
  return (
    <button className="square-button" onClick={onClick} type={type}>
      {icon}{label}
    </button>
  );
};

export default SquareButton;
