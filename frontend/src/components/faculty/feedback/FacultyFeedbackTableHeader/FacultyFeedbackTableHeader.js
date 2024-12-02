import "./FacultyFeedbackTableHeader.css";
import { MdMarkEmailRead } from "react-icons/md";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import SquareButton from "../../../button/SquareButton/SquareButton";
import { useState, useEffect } from "react";

const FacultyFeedbackTableHeader = ({
  feedbackData,
  onPageChange,
  onMarkAllAsRead,
}) => {
  const [pageRange, setPageRange] = useState({ start: 0, end: 0 });

  const getPaginationRange = (currentPage, limit, totalItems) => {
    const start = (currentPage - 1) * limit + 1;
    const end = Math.min(currentPage * limit, totalItems);
    return { start: start, end: end };
  };

  useEffect(() => {
    setPageRange(
      getPaginationRange(
        feedbackData.currentPage,
        feedbackData.feedbacksPerPage,
        feedbackData.totalFeedbacks
      )
    );
  }, [feedbackData]);

  return (
    <div className="faculty-feedback-table-header-container">
      <SquareButton
        label="Mark all as read"
        icon={<MdMarkEmailRead style={{ marginRight: "0.5rem" }} />}
        onClick={() => {
          onMarkAllAsRead();
        }}
      />
      <div className="faculty-feedback-table-header-page-container">
        {feedbackData.currentPage > 1 && (
          <FaArrowCircleLeft
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#AF5E36",
              cursor: "pointer",
            }}
            onClick={() => onPageChange(feedbackData.currentPage - 1)}
          />
        )}
        <p>{`${pageRange.start} - ${pageRange.end} of ${feedbackData.totalFeedbacks}`}</p>
        {feedbackData.currentPage < feedbackData.totalPages && (
          <FaArrowCircleRight
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#AF5E36",
              cursor: "pointer",
            }}
            onClick={() => onPageChange(feedbackData.currentPage + 1)}
          />
        )}
      </div>
    </div>
  );
};

export default FacultyFeedbackTableHeader;
