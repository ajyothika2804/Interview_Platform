// import React, { useState, useEffect, useRef } from 'react';
// import { getQuestions, saveAnswer, evaluateAnswer } from '../services/api';  // Ensure these imports are correct
// import Results from './Results';

// const CandidateComponent = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [candidateAnswers, setCandidateAnswers] = useState([]);
//   const [results, setResults] = useState([]);
//   const [testCompleted, setTestCompleted] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');

//   const videoRef = useRef(null);
//   const timerRef = useRef(null);
//   const recognitionRef = useRef(null);

//   // Fetch questions from the backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await getQuestions();
//         setQuestions(response.data);
//       } catch (err) {
//         console.error('Error fetching questions:', err);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       videoRef.current.srcObject = stream;

//       if ('webkitSpeechRecognition' in window) {
//         recognitionRef.current = new webkitSpeechRecognition();
//         recognitionRef.current.lang = 'en-US';
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.interimResults = true;

//         recognitionRef.current.onresult = (event) => {
//           let finalTranscript = '';
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             if (event.results[i].isFinal) {
//               finalTranscript += event.results[i][0].transcript + ' ';
//             }
//           }
//           setTranscript(finalTranscript.trim());
//         };

//         recognitionRef.current.start();
//         setIsRecording(true);
//         startTimer();
//       } else {
//         alert('Speech recognition not supported in your browser.');
//       }
//     } catch (err) {
//       console.error('Error accessing media devices:', err);
//     }
//   };

//   const startTimer = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           stopRecording();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const stopRecording = async () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsRecording(false);
//     clearInterval(timerRef.current);
//     await saveTranscript();
//   };

//   const saveTranscript = async () => {
//     if (!transcript.trim()) {
//       alert('No answer detected! Please try again.');
//       return;
//     }

//     const updatedAnswers = [...candidateAnswers, transcript];
//     setCandidateAnswers(updatedAnswers);
//     await saveAnswer(questions[currentQuestion].id, transcript);

//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//       setTranscript('');
//       setTimer(60);
//     } else {
//       evaluateAnswers(updatedAnswers);
//     }
//   };

//   const evaluateAnswers = async (answers) => {
//     const evaluationResults = [];
//     for (let i = 0; i < questions.length; i++) {
//       const response = await evaluateAnswer(answers[i], questions[i].correct_answer);
//       evaluationResults.push({
//         candidate_answer: answers[i],
//         similarity_score: response.data.similarity_score,
//       });
//     }
//     setResults(evaluationResults);
//     setTestCompleted(true);
//   };

//   return (
//     <div>
//       {!testCompleted ? (
//         <div>
//           {questions.length > 0 && (
//             <div>
//               <h2>Question {currentQuestion + 1}</h2>
//               <p>{questions[currentQuestion].question_text}</p>

//               <video ref={videoRef} autoPlay muted style={{ width: '500px', height: '375px' }} />

//               <div>Time Remaining: {timer} seconds</div>
//               <h3>Transcript:</h3>
//               <p>{transcript}</p>

//               {!isRecording ? (
//                 <button onClick={startRecording}>Start Recording</button>
//               ) : (
//                 <button onClick={stopRecording}>Stop Recording</button>
//               )}
//             </div>
//           )}
//         </div>
//       ) : (
//         <Results results={results} />
//       )}
//     </div>
//   );
// };

// export default CandidateComponent;



import React, { useState, useEffect, useRef } from "react";
import { getQuestions, saveAnswer, evaluateAnswer } from "../services/api"; // Ensure these imports are correct
import Results from "./Results";

const CandidateComponent = () => {
  const [questions, setQuestions] = useState([]); // ✅ Always an array
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [candidateAnswers, setCandidateAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  // ✅ Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response.data || []); // ✅ Ensures it's an array
      } catch (err) {
        console.error("Error fetching questions:", err);
        setQuestions([]); // ✅ Prevents `undefined` issues
      }
    };
    fetchQuestions();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;

      if ("webkitSpeechRecognition" in window) {
        recognitionRef.current = new webkitSpeechRecognition();
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          setTranscript(finalTranscript.trim());
        };

        recognitionRef.current.start();
        setIsRecording(true);
        startTimer();
      } else {
        alert("Speech recognition not supported in your browser.");
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(timerRef.current);
    await saveTranscript();
  };

  const saveTranscript = async () => {
    if (!transcript.trim()) {
      alert("No answer detected! Please try again.");
      return;
    }

    if (!questions[currentQuestion]) {
      alert("Error: Question data is missing.");
      return;
    }

    const updatedAnswers = [...candidateAnswers, transcript];
    setCandidateAnswers(updatedAnswers);
    await saveAnswer(questions[currentQuestion].id, transcript);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTranscript("");
      setTimer(60);
    } else {
      evaluateAnswers(updatedAnswers);
    }
  };

  const evaluateAnswers = async (answers) => {
    const evaluationResults = [];

    for (let i = 0; i < questions.length; i++) {
      if (!answers[i] || !questions[i]) continue; // ✅ Prevents undefined errors

      try {
        const response = await evaluateAnswer(answers[i], questions[i].correct_answer);
        evaluationResults.push({
          candidate_answer: answers[i],
          similarity_score: response.data.similarity_score,
        });
      } catch (error) {
        console.error("Error evaluating answer:", error);
        evaluationResults.push({
          candidate_answer: answers[i],
          similarity_score: "Error",
        });
      }
    }
    setResults(evaluationResults);
    setTestCompleted(true);
  };

  return (
    <div>
      {!testCompleted ? (
        <div>
          {/* ✅ Check if questions exist before rendering */}
          {questions.length > 0 && questions[currentQuestion] ? (
            <div>
              <h2>Question {currentQuestion + 1}</h2>
              <p>{questions[currentQuestion].question_text}</p>

              <video ref={videoRef} autoPlay muted style={{ width: "500px", height: "375px" }} />

              <div>Time Remaining: {timer} seconds</div>
              <h3>Transcript:</h3>
              <p>{transcript}</p>

              {!isRecording ? (
                <button onClick={startRecording}>Start Recording</button>
              ) : (
                <button onClick={stopRecording}>Stop Recording</button>
              )}
            </div>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      ) : (
        <Results results={results} />
      )}
    </div>
  );
};

export default CandidateComponent;
