import React, { useState, useEffect } from 'react';
import './StudentFeedback.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faFolder, faTimes, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const StudentFeedback = () => {
    const [userId, setUserId] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    // Fetch authenticated user details
    useEffect(() => {
        fetch(`${BACKEND_URL}/auth/status`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                setUserId(data.user._id);
            } else {
                console.error('User not authenticated');
            }
        })
        .catch(error => console.error('Error checking authentication status:', error));
    }, [BACKEND_URL]);

    // Fetch feedbacks from the backend when the component mounts
    useEffect(() => {
        if (userId) {
            fetch(`${BACKEND_URL}/feedback/user/${userId}`, {
                method: 'GET',
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data => {
                console.log('Fetched feedbacks:', data); 
                setFeedbacks(data);
            })
            .catch(error => console.error('Error fetching feedbacks:', error));
        }
    }, [userId, BACKEND_URL]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const feedbackData = {
            user: userId,
            subject,
            description,
            attachments: attachments.map(file => URL.createObjectURL(file)), 
        };

        fetch(`${BACKEND_URL}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(feedbackData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }
            return response.json();
        })
        .then(data => {
            console.log('Feedback submitted successfully:', data);
            alert('Feedback submitted successfully');
            // Update state with the new feedback to display it immediately without refresh
            setFeedbacks(prevFeedbacks => [data, ...prevFeedbacks]);
        })
        .catch(error => {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback: ' + error.message);
        });
    };

    const handleCardClick = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleCloseModal = () => {
        setSelectedFeedback(null);
    };

    return (
        <div className="student-feedback-container">
            <div className="make-feedback-section">
                <h2>
                    <FontAwesomeIcon icon={faPenToSquare} className="checked-calendar" />
                    Submit a new feedback
                </h2>
                <div className="new-feedback-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Subject *</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter the subject here"
                                required
                            />
                        </div>
                        <div>
                            <label>Description *</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your feedback here"
                                required
                            />
                        </div>
                        <div>
                            <label>Add Attachments</label>
                            <div>
                                <input className='feedback-input-button'
                                    type="file"
                                    multiple
                                    onChange={(e) => setAttachments(Array.from(e.target.files))}
                                />
                            </div>
                        </div>
                        <button type="submit" className='studentfeedback-button'>Submit</button>
                    </form>
                </div>
            </div>
            <div className="past-feedbacks">
                <h2>
                    <FontAwesomeIcon icon={faSquareCheck} className="checked-calendar" />
                    Past Feedbacks
                </h2>
                <div className="feedback-cards">
                    {feedbacks.length > 0 ? (
                        feedbacks.map(feedback => (
                            <div 
                                key={feedback._id} 
                                className="feedback-card"
                                onClick={() => handleCardClick(feedback)}
                            >
                                <h3>
                                    <FontAwesomeIcon icon={faFolder} className="folder" />
                                    <span className="feedback-subject">{feedback.subject || "No Subject"}</span>
                                    <span className="student-feedbackcard-date">{"Date: " + new Date(feedback.date).toLocaleDateString()}</span>
                                </h3>
                            </div>
                        ))
                    ) : (
                        <p>No feedbacks found.</p>
                    )}
                </div>
            </div>

            {selectedFeedback && (
                <div className="feedback-modal">
                    <div className="modal-content">
                        <button onClick={handleCloseModal} className="close-modal-button">
                            <FontAwesomeIcon icon={faCircleXmark} /> Close
                        </button>
                        <h3>{selectedFeedback.subject || "No Subject"}</h3>
                        <p><strong>Date: </strong>{new Date(selectedFeedback.date).toLocaleDateString()}</p>
                        <p><strong>Description: </strong>{selectedFeedback.description || "No Description"}</p>
                        {selectedFeedback.attachments && selectedFeedback.attachments.length > 0 && (
                            <div className='feedback-attachments'>
                                <h4>Attachments:</h4>
                                {selectedFeedback.attachments.map((attachment, index) => (
                                    <a key={index} href={attachment} target="_blank" rel="noopener noreferrer" className='attachment-link'>
                                        Attachment {index + 1}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentFeedback;
