import React, { useState, useEffect } from "react";
import axios from "axios";
import AnswerSection from "./AnswerSection";
import "./QuizStyle.css";
import { Howl } from "howler";
import "animate.css";

const endQuizSound = new Howl({ src: ["/sounds/endQuiz.mp3"] });
const startQuizSound = new Howl({ src: ["/sounds/startQuiz.mp3"] });
const selectOptionSound = new Howl({ src: ["/sounds/selectOption.mp3"] });

const Quiz = () => {
  const [quizDetails, setQuizDetails] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showGif, setShowGif] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [positiveMarks, setPositiveMarks] = useState(0);
  const [negativeMarks, setNegativeMarks] = useState(0);


  const fetchQuizData = async () => {
    try {
      const response = await axios.get(
        "https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX"
      );
      setQuizDetails(response.data);
      setQuestions(response.data.questions);
      setTimeLeft(response.data.duration * 60);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (!showScore) {
      handleSubmit();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setShowCountdown(false);
      startQuizSound.play();
    }
  }, [showCountdown, countdown]);

  // Handle the clicked answers option
  const handleAnswerOptionClick = (isCorrect, answer, selectedOptions) => {
    // Update selected answers for the current question
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestion] = selectedOptions;
    setSelectedAnswers(updatedSelectedAnswers);
    selectOptionSound.play();
  };

  const handleSubmit = () => {
    let tempScore = 0;
    let tempPositiveMarks = 0;
    let tempNegativeMarks = 0;

    selectedAnswers.forEach((answers, index) => {
      if (answers) {
        answers.forEach((answer) => {
          const option = questions[index]?.options.find(
            (opt) => opt.id === answer
          );
          if (option && option.is_correct) {
            tempScore += 1;
            tempPositiveMarks += 1;
          } else if (option) {
            tempNegativeMarks += Number(quizDetails.negative_marks);
          }
        });
      }
      endQuizSound.play();
      setShowAnswer(true);
      setShowText(true);
    });
    setShowScore(true);
    setScore(tempScore);
    setPositiveMarks(tempPositiveMarks);
    setNegativeMarks(tempNegativeMarks);
  };

  // Handle play again button functionality
  const handlePlayAgainClick = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setShowAnswer(false);
    setShowGif(false);
    setShowText(false);
    setScore(0);
    setSelectedAnswers([]);
    setTimeLeft(quizDetails.duration * 60);
    setShowCountdown(true);
    setCountdown(3);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    document
      .querySelector(".question-section")
      .classList.add("animate__animated", "animate__fadeIn");
    selectOptionSound.play();
  };

  return (
    <div className="quiz">
      <h1 style={{ textDecoration: "underline" }}>Quiz</h1>
      <h1>{quizDetails.title || "Genetics and Evolution"}</h1>
      {showGif && <img src="/genetics.gif" alt="Genetics and Evolution" className="quiz-animation" />}
     
      {showCountdown ? (
        <div className="countdown">
          <h2>{countdown > 0 ? countdown : "Go!"}</h2>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <button className="playAgain-btn" onClick={handlePlayAgainClick}>
            {showText ? "Play Again" : "Start"}
          </button>
          {showAnswer && (
            <div className="result-section">
              <div className="score-section">
                {" "}
                <h2>
                  Final Score: {(positiveMarks - negativeMarks).toFixed(2)}
                </h2>
                <p>Total Positive Marks: {positiveMarks}</p>
                <p>Total Negative Marks: {negativeMarks.toFixed(2)}</p>
              </div>
              <div className="break"></div>
              {questions.map((question, index) => (
                <div key={index} className="result-question">
                  <h3>{question.description}</h3>
                  <p>
                    Correct Answer:{" "}
                    {
                      question.options.find((opt) => opt.is_correct)
                        ?.description
                    }
                  </p>
                  <p>
                    Your Answer:{" "}
                    {selectedAnswers[index]
                      ?.map(
                        (answerId) =>
                          question.options.find((opt) => opt.id === answerId)
                            ?.description
                      )
                      .join(", ") || "No answer selected"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <p style={{ fontSize:"1.2rem",fontWeight:"bold"}}>Negative Marking: {quizDetails.negative_marks}</p>
          {questions.length > 0 ? (
            <div className="question-section animate__animated animate__fadeIn">
              <p>
                Time Left: {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? "0" : ""}
                {timeLeft % 60}
              </p>
              <div className="question-count">
                <span>{currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion]?.description}
              </div>

              <AnswerSection
                questions={questions}
                currentQuestion={currentQuestion}
                handleAnswerOptionClick={handleAnswerOptionClick}
              />

              <div className="navigation-buttons">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQuestion(currentQuestion - 1);
                      selectOptionSound.play();
                    }}
                  >
                    Previous
                  </button>
                )}
                {currentQuestion < questions.length - 1 ? (
                  <button onClick={handleNextQuestion}>Next</button>
                ) : (
                  <button onClick={handleSubmit}>Submit</button>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
