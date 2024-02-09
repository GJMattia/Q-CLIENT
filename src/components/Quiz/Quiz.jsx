import './Quiz.css';
import { useState, useEffect } from 'react';
import * as accountAPI from '../../../utilities/accounts-api';

export default function Quiz({ questionSet, account, setAccount }) {

    //Decodes JSON elements into readable HTML text
    function Decode(string) {
        return new DOMParser().parseFromString(string, 'text/html').documentElement.textContent;
    };

    //State Variables
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [choice, setChoice] = useState(null);
    const [next, setNext] = useState(true);

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

    function handleConfirm() {
        if (choice === questionSet[question].correct_answer) {
            console.log('correct, you earned 5xp');
            addXp();
        } else {
            console.log('incorrect');
        }
        showAnswers();
        setNext(!next);
    };

    function showAnswers() {
        let answerElements = document.querySelectorAll('.Answer');
        for (let i = 0; i < answerElements.length; i++) {
            if (answerElements[i].innerText === questionSet[question].correct_answer) {
                answerElements[i].id = 'Correct'
            } else {
                answerElements[i].id = 'Incorrect'
            }
        }
    };

    function hideAnswers() {
        let answerElements = document.querySelectorAll('.Answer');
        answerElements.forEach(function (element) {
            element.id = '';
        })
    };

    function nextQuestion() {
        if (question === questionSet.length - 1) {
            return;
        };
        const selectedAnswer = document.querySelector('.SelectedAnswer');
        if (selectedAnswer) {
            selectedAnswer.classList.remove('SelectedAnswer');
        };
        hideAnswers();
        setChoice(null);
        setQuestion(question + 1);
        setNext(!next);
    };

    async function addXp() {
        try {
            const response = await accountAPI.addXp({ xp: 17 });
            setAccount(response);
        } catch (error) {
            console.error('Error Awarding XP'.error)
        }
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

            <button onClick={next ? handleConfirm : nextQuestion} className='Confirm'>{next ? 'Confirm' : 'Next'}</button>

        </div>
    )
};