import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchResolve } from "../../helpers/fetchResolve";

export const QuestionsTeatroIndependienteCordoba = () => {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [showOptions, setShowOptions] = useState(true);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showReturnButton, setShowReturnButton] = useState(false);
  const [answerMessage, setAnswerMessage] = useState("");
  document.body.style.overflow = "hidden";
  
  useEffect(() => {
    fetchResolve()
      .then((resolvedQuestions) => {
        if (resolvedQuestions && resolvedQuestions.categorias) {
          const categoryQuestions = resolvedQuestions.categorias.find(
            (cat) => cat.categoria === "Teatro Independiente en Córdoba"
          );
          if (categoryQuestions && categoryQuestions.preguntas.length > 0) {
            setCategory(categoryQuestions.categoria);
            const randomIndex = Math.floor(Math.random() * categoryQuestions.preguntas.length);
            setRandomQuestion(categoryQuestions.preguntas[randomIndex]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0 && !selectedOption) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else if (timeRemaining === 0 && !selectedOption) {
        setShowOptions(false);
        setIsTimeUp(true);
        setShowReturnButton(true);
        setAnswerMessage("Tiempo agotado");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, selectedOption]);

  const handleOptionSelect = (optionKey) => {
    if (!selectedOption) {
      setSelectedOption(optionKey);
      const question = randomQuestion;
      const correctAnswer = optionKey === question.respuesta_correcta;
      setIsCorrect(correctAnswer);
      setIsTimeUp(false);
      setAnswerMessage(correctAnswer ? "Respuesta correcta" : "Respuesta incorrecta");

      setTimeout(() => {
        setShowReturnButton(true);
      }, 750);

      setTimeout(() => {
        setShowOptions(false);
      }, 750);
    }
  };

  return (
    <div className="question_card">
      {randomQuestion && (
        <div className="question_content">
          <h2 className="question_category">{category}</h2>
          <h3 className="question_text">{randomQuestion.pregunta}</h3>
          {answerMessage ? (
            <div className="answer_message">{answerMessage}</div>
          ) : (
            <div className="time_remaining">Tiempo restante: {timeRemaining} segundos</div>
          )}
          {showOptions && (
            <div className="options_container">
              {Object.entries(randomQuestion.opciones).map(([key, value]) => (
                <div
                  key={key}
                  className={`option_item ${selectedOption === key ? (isCorrect ? "correct" : "incorrect") : ""}`}
                  onClick={() => handleOptionSelect(key)}
                >
                  <input
                    type="radio"
                    id={`pregunta-${randomQuestion.pregunta}-${key}`}
                    name={`pregunta-${randomQuestion.pregunta}`}
                    value={key}
                  />
                  <label htmlFor={`pregunta-${randomQuestion.pregunta}-${key}`} className="option_label">
                    {value}
                  </label>
                </div>
              ))}
            </div>
          )}
          {selectedOption && !isCorrect && (
            <div className="correct_answer">Respuesta correcta: {randomQuestion.opciones[randomQuestion.respuesta_correcta]}</div>
          )}
          {(!showOptions || selectedOption || isTimeUp) && showReturnButton && (
            <Link to="/roulette">
              <button className="return_to_roulette">Volver a la ruleta</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
