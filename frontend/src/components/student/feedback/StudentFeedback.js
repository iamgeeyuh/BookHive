import React, { useState, useEffect } from 'react';
import './StudentFeedback.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquareCheck, faFolder } from '@fortawesome/free-regular-svg-icons';

const StudentFeedback = () => {
    const [userId, setUserId] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch authenticated user details
    useEffect(() => {
        fetch('http://localhost:5001/auth/status', {
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
    }, []);

    // Fetch feedbacks from the backend when the component mounts
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:5001/feedback/user/${userId}`, {
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
    }, [userId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const feedbackData = {
            user: userId,
            subject,
            description,
            attachments: attachments.map(file => URL.createObjectURL(file)), 
        };

        fetch('http://localhost:5001/feedback', {
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
                            <div key={feedback._id} className="feedback-card">
                                <h3>
                                    <FontAwesomeIcon icon={faFolder} className="folder" />
                                    <span className="feedback-subject">{feedback.subject || "No Subject"}</span>
                                    <span className="student-feedbackcard-date">{"Date: " + new Date(feedback.date).toLocaleDateString()}</span>
                                </h3>
                                <div className='student-feedbackcard-description'>
                                    <span>Description: {feedback.description || "No Description"}</span>
                                    {feedback.attachments && feedback.attachments.length > 0 && (
                                        <span className='feedback-attachments'>
                                            {feedback.attachments.map((attachment, index) => (
                                                <a key={index} href={attachment} target="_blank" rel="noopener noreferrer" className='attachment-link'>
                                                    Attachment {index + 1}
                                                </a>
                                            ))}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No feedbacks found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentFeedback;
