import React, { useState } from "react";
import "./question.css";

const Question = ({ question, onNextClicked }) => {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const onOptionClicked = option => {
    setAnswered(true);
    setSelectedOption(option);
  };

  const isCorrect = option => {
    return option.option === question.answer;
  };

  const resetQuestion = () => {
    setAnswered(false);
    setSelectedOption({});
    onNextClicked(selectedOption);
  };

  return (
    <div className="question">
      <div className="question-image-holder">
        <img className="question-image" src={question.image} alt={question} />
      </div>
      <section>
        <div className="question-text-holder">
          {answered && <button onClick={resetQuestion}>Next</button>}
          <h4 className="question-text">{question.question}</h4>
        </div>

        {question.options.map(option => {
          return (
            <button
              key={option.id}
              onClick={() => onOptionClicked(option)}
              disabled={answered && !isCorrect(option)}
              className={`question-option ${answered &&
                isCorrect(option) &&
                "correct"}
              ${selectedOption.option === option.option &&
                !isCorrect(option) &&
                "wrong"}
              `}
            >
              <span>
                {answered ? (isCorrect(option) ? "✔" : "X") : option.id}
              </span>
              {option.option}
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default Question;
