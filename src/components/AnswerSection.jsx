import React, { useState } from 'react';
import 'animate.css';

const AnswerSection = ({ questions, currentQuestion, handleAnswerOptionClick }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const question = questions[currentQuestion];
    const options = question.options;

    const handleOptionClick = (isCorrect, description, id) => {
        const updatedSelectedOptions = selectedOptions.includes(id)
            ? selectedOptions.filter(optionId => optionId !== id)
            : [...selectedOptions, id];
        setSelectedOptions(updatedSelectedOptions);
        handleAnswerOptionClick(isCorrect, description, updatedSelectedOptions);
    };

    return (
        <div className='answer-section'>
            {options && options.map(option => (
                <button
                    className={`answer-options animate__animated ${selectedOptions.includes(option.id) ? 'selected animate__pulse' : ''}`}
                    key={option.id}
                    onClick={() => handleOptionClick(option.is_correct, option.description, option.id)}
                >
                    {option.description}
                </button>
            ))}
        </div>
    );
};

export default AnswerSection;
