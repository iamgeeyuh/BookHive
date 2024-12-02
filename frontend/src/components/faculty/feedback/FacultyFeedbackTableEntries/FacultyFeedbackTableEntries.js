import "./FacultyFeedbackTableEntries.css";
import moment from "moment";

const FacultyFeedbackTableEntries = ({ feedback, onFeedbackClick }) => {
  const formatDate = (timestamp) => {
    const date = moment(timestamp);
    const now = moment();

    if (date.isSame(now, "day")) {
      return date.format("hh:mm A");
    } else if (date.isSame(now, "week")) {
      return date.format("dddd");
    } else if (date.isSame(now, "year")) {
      return date.format("MMM D");
    } else {
      return date.format("MMM D, YYYY");
    }
  };

  return (
    <div
      className="faculty-feedback-table-entries-container"
      style={{ backgroundColor: feedback.read ? "#F6F0E9" : "white" }}
      onClick={() => onFeedbackClick(feedback)} 
    >
      <p className="faculty-feedback-table-entries-email">
        {feedback.user.email}
      </p>
      <div
        className="faculty-feedback-table-entries-info-container"
        style={{ backgroundColor: feedback.read ? "#F6F0E9" : "white" }}
      >
        <p className="faculty-feedback-table-entries-subject">
          {feedback.subject}
        </p>
        <p className="faculty-feedback-table-entries-description">
          {feedback.description}
        </p>
      </div>
      <p className="faculty-feedback-table-entries-date">
        {formatDate(feedback.date)}
      </p>
    </div>
  );
};

export default FacultyFeedbackTableEntries;