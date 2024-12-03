import FacultyFeedbackTableEntries from "../FacultyFeedbackTableEntries/FacultyFeedbackTableEntries";
import "./FacultyFeedbackTable.css";

const FacultyFeedbackTable = ({ feedbackData, onFeedbackClick }) => {
  return (
    <div className="faculty-feedback-table-container">
      {feedbackData.feedbacks.map((feedback) => (
        <FacultyFeedbackTableEntries
          key={feedback._id}
          feedback={feedback}
          onFeedbackClick={onFeedbackClick}
        />
      ))}
    </div>
  );
};

export default FacultyFeedbackTable;
