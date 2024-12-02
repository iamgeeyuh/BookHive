import FacultyFeedbackTable from "./FacultyFeedbackTable/FacultyFeedbackTable";
import FacultyFeedbackTableHeader from "./FacultyFeedbackTableHeader/FacultyFeedbackTableHeader";
import FacultyFeedbackPage from "./FacultyFeedbackPage/FacultyFeedbackPage";
import "./FacultyFeedback.css";
import { useState, useEffect } from "react";

const FacultyFeedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    currentPage: 1,
    feedbacks: [],
    totalFeedbacks: 0,
    totalPages: 0,
    feedbacksPerPage: 25,
  });

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchFeedbacks = async (page = 1) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/feedback?page=${page}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedbackData((prevData) => ({
          ...prevData,
          ...data,
        }));
      } else {
        console.error("Failed to fetch feedback");
      }
    } catch (error) {
      console.error("Error retrieving feedback", error);
    }
  };

  const markFeedbackAsRead = async (feedbackId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/feedback/${feedbackId}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ read: true }),
        }
      );

      if (response.ok) {
        const updatedFeedback = await response.json();
        setFeedbackData((prevData) => ({
          ...prevData,
          feedbacks: prevData.feedbacks.map((feedback) =>
            feedback._id === updatedFeedback._id ? updatedFeedback : feedback
          ),
        }));
      } else {
        console.error("Failed to mark feedback as read");
      }
    } catch (error) {
      console.error("Error marking feedback as read", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadFeedbacks = feedbackData.feedbacks.filter((f) => !f.read);

    for (const feedback of unreadFeedbacks) {
      await markFeedbackAsRead(feedback._id);
    }
  };

  useEffect(() => {
    fetchFeedbacks(feedbackData.currentPage);
  }, [feedbackData.currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= feedbackData.totalPages) {
      setFeedbackData((prevData) => ({
        ...prevData,
        currentPage: newPage,
      }));
    }
  };

  const handleFeedbackClick = (feedback) => {
    if (!feedback.read) {
      markFeedbackAsRead(feedback._id);
    }
    setSelectedFeedback(feedback);
  };

  return (
    <div className="faculty-feedback-container">
      {selectedFeedback ? (
        <FacultyFeedbackPage
          feedback={selectedFeedback}
          onBack={() => setSelectedFeedback(null)}
        />
      ) : (
        <>
          <FacultyFeedbackTableHeader
            feedbackData={feedbackData}
            onPageChange={handlePageChange}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
          <FacultyFeedbackTable
            feedbackData={feedbackData}
            onFeedbackClick={handleFeedbackClick}
          />
        </>
      )}
    </div>
  );
};

export default FacultyFeedback;
