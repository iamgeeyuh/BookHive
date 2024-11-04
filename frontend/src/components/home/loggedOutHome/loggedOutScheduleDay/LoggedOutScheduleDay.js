import "./LoggedOutScheduleDay.css";

const LoggedOutScheduleDay = ({
  day,
  libraryHours,
  serviceHours,
  backgroundColor,
  color,
  isTitle = false,
}) => {
  return (
    <div
      className="logged-out-schedule-day-container"
      style={{
        "margin-bottom": !isTitle && "0.5rem",
        "margin-top": !isTitle && "0.5rem",
      }}
    >
      <p className="logged-out-schedule-day" style={{ color: color }}>
        {day}
      </p>
      <div
        className={
          isTitle
            ? "logged-out-schedule-day-title"
            : "logged-out-schedule-day-time"
        }
        style={{ "background-color": backgroundColor }}
      >
        <p>{libraryHours}</p>
        <p>{serviceHours}</p>
      </div>
    </div>
  );
};

export default LoggedOutScheduleDay;
