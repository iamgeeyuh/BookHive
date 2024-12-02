import "./FacultyFeedbackPage.css";
import { FaArrowLeft } from "react-icons/fa";

const FacultyFeedbackPage = ({ feedback, onBack }) => {
  return (
    <div className="faculty-feedback-page-container">
      <div className="faculty-feedback-page-back">
        <FaArrowLeft
          onClick={() => onBack()}
          style={{ cursor: "pointer", width: "1.5rem", height: "1.5rem" }}
        />
      </div>
      <div className="faculty-feedback-page-contents-container">
        <div style={{ height: "auto" }}>
          <p className="faculty-feedback-page-subject">{feedback.subject}</p>
          <div className="faculty-feedback-page-user-info">
            <p className="faculty-feedback-page-name">{`${feedback.user.firstName} ${feedback.user.lastName}`}</p>
            <p className="faculty-feedback-page-email">{feedback.user.email}</p>
          </div>
          <hr style={{ border: "0.1rem solid black", margin: "20px 0" }} />
          <p className="faculty-feedback-page-description">
            {feedback.description}
          </p>
        </div>
        {feedback.attachments && feedback.attachments.length > 0 && (
          <div style={{ height: "auto" }}>
            <hr style={{ border: "0.1rem solid black", margin: "20px 0" }} />
            <h3>Attachments</h3>
            <ul>
              {feedback.attachments.map((attachment, index) => (
                <li key={index}>
                  <a
                    href={attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faculty-feedback-page-attachment-link"
                  >
                    {attachment.split("/").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyFeedbackPage;
