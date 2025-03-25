
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/admincomponentcss.css";

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/questions");
      setQuestions(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Load questions on page load
  }, []);

  // Add a new question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const response = await axios.post("http://localhost:5000/api/questions", {
        question_text: newQuestion,
        correct_answer: correctAnswer,
      });
      setQuestions([...questions, response.data]);
      setNewQuestion("");
      setCorrectAnswer("");
      setSuccess("Question added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error adding question:", err);
      setError("Failed to add question.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  // Delete a question
  // const handleDelete = async (id) => {
  //   console.log(`🛠️ Sending DELETE request for question ID: ${id}`);
    
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/questions/${id}`, {
  //       method: 'DELETE',
  //     });
  
  //     const data = await response.json();
  //     console.log(`🔍 Server Response:`, data);
  
  //     if (!response.ok) {
  //       throw new Error(data.message || 'Failed to delete question');
  //     }
  
  //     console.log(`✅ Successfully deleted question with ID: ${id}`);
  //   } catch (error) {
  //     console.error('❌ Error deleting question:', error);
  //   }
  // };
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("✅ Question deleted, fetching updated list...");
        fetchQuestions(); // Calls the API again to refresh data
      }
    } catch (error) {
      console.error("❌ Error deleting question:", error);
    }
  };
  
  
  return (
    <div className="question-manager">
      <div className="header-container">
        <h1>Manage Questions</h1>
        <div className="underline"></div>
      </div>

      {/* Add Question Form */}
      <div className="form-container">
        <form onSubmit={handleAddQuestion}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Enter correct answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
              className="form-input"
            />
            <button 
              type="submit" 
              className="add-btn"
              disabled={isAdding}
            >
              {isAdding ? (
                <span className="spinner"></span>
              ) : (
                "Add Question"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Notification Messages */}
      {error && <div className="notification error fade-in">{error}</div>}
      {success && <div className="notification success fade-in">{success}</div>}

      {/* Questions Table */}
      <div className="table-container">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner large"></div>
            <p>Loading questions...</p>
          </div>
        ) : (
          <table className="questions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? (
                questions.map((q) => (
                  <tr key={q.id} className="table-row">
                    <td>{q.id}</td>
                    <td>{q.question_text}</td>
                    <td>{q.correct_answer}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="delete-btn"
                        disabled={deleteId === q.id}
                      >
                        {deleteId === q.id ? (
                          <span className="spinner small"></span>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    <div className="no-data-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                      <p>No questions found. Add your first question above!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default QuestionManager;
