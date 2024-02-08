import './Quiz.css';
import { useState, useEffect } from 'react';

export default function Quiz({ questionSet }) {

    //Decodes JSON elements into readable HTML text
    function Decode(string) {
        return new DOMParser().parseFromString(string, 'text/html').documentElement.textContent;
    };

    //State Variables
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [choice, setChoice] = useState(null);

    //Auto Shuffle when the question variable is changed.
    useEffect(shuffleAnswers, [question, questionSet]);

    //This function shuffles array of correct and incorrect answers
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    //Combines the incorrect and correct answers, and shuffles them
    function shuffleAnswers() {
        setAnswers(shuffleArray([...questionSet[question].incorrect_answers, questionSet[question].correct_answer]));
    };

    //Choosing an answer

    function handleChoice(event) {
        const selectedAnswer = document.querySelector('.SelectedAnswer');
        if (selectedAnswer) {
            selectedAnswer.classList.remove('SelectedAnswer');
        };

        event.target.classList.add('SelectedAnswer');
        setChoice(event.target.innerText);

    };

    function nextQuestion() {
        if (choice === questionSet[question].correct_answer) {
            console.log('correct')
        } else {
            console.log('incorrect');
        }
        if (question === 4) {
            return;
        };
        setQuestion(question + 1);
    }

    return (
        <div className='QuizContainer'>
            <div className='QuestionContainer'>
                <div className='QuestionNumber'>{question + 1}/ {questionSet.length}</div>
                <div className='QuestionText'>{Decode(questionSet[question].question)}</div>
            </div>

            <div className='Answers'>
                <div onClick={handleChoice} className='Answer'>{Decode(answers[0])}</div>
                <div onClick={handleChoice} className='Answer'>{Decode(answers[1])}</div>
                <div onClick={handleChoice} className='Answer'>{Decode(answers[2])}</div>
                <div onClick={handleChoice} className='Answer'>{Decode(answers[3])}</div>
            </div>

            <button onClick={nextQuestion} className='Confirm'>Answer</button>

        </div>
    )
};