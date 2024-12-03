
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function InterviewPage() {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [answerTimer, setAnswerTimer] = useState(30); // 30 seconds for "Answer the Question"
    const [submitTimer, setSubmitTimer] = useState(60); // 1 minute to submit after clicking "Answer the Question"
    const [isAnswering, setIsAnswering] = useState(false);
    const [score, setScore] = useState(0);


    const answerTimerRef = useRef(null);
    const submitTimerRef = useRef(null);

    // Fetch the first question or the next question
    const fetchQuestion = async (id = null) => {
      try {
          setLoading(true);
          setQuestion(null); // Clear the current question while fetching the new one
          const url = id
              ? `http://127.0.0.1:8000/api/fetch-next-question/?current_question_id=${id}`
              : "http://127.0.0.1:8000/api/fetch-next-question/";
          const response = await axios.get(url);
          const data = response.data;
  
          if (data.message === "No more questions available.") {
              setQuestion(null);
              setSubmitMessage("Interview completed! Thank you.");
              clearInterval(answerTimerRef.current);
              clearInterval(submitTimerRef.current);
          } else {
              setQuestion(data);
              setCurrentQuestionId(data.id);
              resetTimers();
          }
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };
  

    useEffect(() => {
        fetchQuestion();

        // Timer for answering the question
        answerTimerRef.current = setInterval(() => {
            setAnswerTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(answerTimerRef.current);
                    handleSkipQuestion(); // Skip to next question if not answered within 30 seconds
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(answerTimerRef.current);
    }, []);

    const resetTimers = () => {
      if (answerTimerRef.current) clearInterval(answerTimerRef.current);
      if (submitTimerRef.current) clearInterval(submitTimerRef.current);
  
      setAnswerTimer(30);
      setSubmitTimer(30);
      setIsAnswering(false);
  
      // Restart answer timer
      answerTimerRef.current = setInterval(() => {
          setAnswerTimer((prev) => {
              if (prev <= 1) {
                  clearInterval(answerTimerRef.current);
                  handleSkipQuestion(); // Skip question if timer runs out
                  return 0;
              }
              return prev - 1;
          });
      }, 1000);
  };
  

    const startAnswering = () => {
        setIsAnswering(true);
        if (answerTimerRef.current) clearInterval(answerTimerRef.current);

        // Start submit timer
        submitTimerRef.current = setInterval(() => {
            setSubmitTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(submitTimerRef.current);
                    handleSkipQuestion(); // Skip question if not submitted within 1 minute
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleVoiceInput = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserAnswer(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.start();
    };

//     const handleSubmit = async () => {
//       if (!userAnswer.trim()) {
//           alert("Please provide an answer before submitting.");
//           return;
//       }
  
//       try {
//           // Make the POST request using Axios
//           const response = await axios.post("http://127.0.0.1:8000/api/submit-response/", {
//               question_id: currentQuestionId,
//               user_answer: userAnswer,
//           });
  
//           // Check if the response contains the success message
//           if (response.status === 200) {
//               const data = response.data;
//               setSubmitMessage(data.message || "Answer submitted successfully!");
//               setUserAnswer("");
//               fetchQuestion(currentQuestionId); // Fetch the next question
//           } else {
//               // Handle unexpected responses
//               setSubmitMessage("An error occurred. Please try again.");
//           }
//       } catch (err) {
//           // Handle request errors
//           if (err.response) {
//               setSubmitMessage(err.response.data.error || "An error occurred. Please try again.");
//           } else {
//               setSubmitMessage("A network error occurred. Please check your connection.");
//           }
//       } finally {
//           if (submitTimerRef.current) clearInterval(submitTimerRef.current);
//       }
//   };

const handleSubmit = async () => {
    if (!userAnswer.trim()) {
        alert("Please provide an answer before submitting.");
        return;
    }

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/submit-response/",
            {
                question_id: currentQuestionId,
                user_answer: userAnswer,
            }
        );

        if (response.status === 200) {
            const data = response.data;
            setSubmitMessage(data.message || "Answer submitted successfully!");
            setScore(data.score); // Set score from the response
            setUserAnswer("");
            fetchQuestion(currentQuestionId); // Fetch the next question
        } else {
            setSubmitMessage("An error occurred. Please try again.");
        }
    } catch (err) {
        console.error("Error submitting response:", err); // Log the error for debugging
        setSubmitMessage(
            err.response?.data?.error || "A network error occurred. Please check your connection."
        );
    } finally {
        if (submitTimerRef.current) clearInterval(submitTimerRef.current);
    }
};


  
  
  const handleSkipQuestion = () => {
      setUserAnswer("");
      setSubmitMessage("");
      setScore(0);
      fetchQuestion(currentQuestionId); // Fetch the next question
  };
  

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error}</h1>;

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Interview Question</h1>
            <h2>{isAnswering ? `Submit Time Left: ${formatTime(submitTimer)}` : `Answer Time Left: ${formatTime(answerTimer)}`}</h2>

            {question && (
                <div>
                    <h2>{question.question}</h2>
                    <p><strong>Difficulty:</strong> {question.difficulty}</p>
                    <div>
                        <h3>Your Answer:</h3>
                        <textarea
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            rows="4"
                            cols="50"
                        />
                        <p>{userAnswer}</p>
                    </div>
                    <button onClick={startAnswering} disabled={isAnswering}>
                        Answer the Question
                    </button>
                    <button onClick={handleVoiceInput} disabled={!isAnswering}>
                        Use Voice Input
                    </button>
                    <button onClick={handleSubmit} disabled={!isAnswering}>
                        Submit Answer
                    </button>
                    <button onClick={handleSkipQuestion}>
                        Go to Next Question
                    </button>
                </div>
            )}
            {submitMessage && <p>{submitMessage}</p>}
            {score && <p>{score}</p>}
        </div>
    );
}

export default InterviewPage;

