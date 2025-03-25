import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const addQuestion = (question, answer) => api.post('/questions', { question, answer });
export const getQuestions = () => api.get('/questions');
export const saveAnswer = (question_id, candidate_answer) => api.post('/answers', { question_id, candidate_answer });
export const evaluateAnswer = (candidate_answer, correct_answer) => api.post('/evaluate', { candidate_answer, correct_answer });

export default api;
