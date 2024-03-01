import './Quiz.css';
import { useState, useEffect } from 'react';
import * as accountAPI from '../../../utilities/accounts-api';
import Correct from '../../assets/audio/correct.mp3';
import Wrong from '../../assets/audio/wrong.mp3';
import Categories from '../../assets/data/categories.json';

export default function Quiz({ questionSet, setQuestionSet, setAccount, setResults, setScore, score, account }) {

    //State Variables
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [choice, setChoice] = useState(null);
    const [next, setNext] = useState(true);
    const [color, setColor] = useState(Categories.categories[parseCategory(questionSet[0].category)].color);
    const [mult, setMult] = useState(1);

    //Auto Shuffle when the question variable is changed.
    useEffect(shuffleAnswers, [question, questionSet]);

    //Audio
    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    //Decoding strings
    function Decode(string) {
        return new DOMParser().parseFromString(string, 'text/html').documentElement.textContent;
    };

    function parseCategory(string) {
        const parts = string.split(':');
        if (parts.length > 1) {
            return parts[1].trim();
        } else {
            return string.trim();
        }
    };

    function parseCategory2(string) {
        const newString = string.replace(/\s/g, '').toLowerCase();
        return newString;
    };

    function dLevelColor(string) {
        switch (string) {
            case 'easy':
                return 'lawngreen';
            case 'medium':
                return 'yellow';
            case 'hard':
                return 'red';
        }
    };

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
        setChoice(Decode(event.target.innerText));

    };

    //Submitting answer
    function handleConfirm() {
        let earned = xpCalc(questionSet[question].difficulty);
        if (choice === Decode(questionSet[question].correct_answer)) {
            playSound(Correct);
            addXp();
            submitAnswer(1);
            setScore([...score, `Question ${question + 1}: Correct, +${earned}xp`]);
        } else {
            playSound(Wrong);
            submitAnswer(0);
            setScore([...score, `Question ${question + 1}: Incorrect`])
        }
        showAnswers();
        setNext(!next);
    };

    //Showing the right and wrong answers
    function showAnswers() {
        let answerElements = document.querySelectorAll('.Answer');
        for (let i = 0; i < answerElements.length; i++) {
            if (Decode(answerElements[i].innerText) === Decode(questionSet[question].correct_answer)) {
                answerElements[i].id = 'Correct'
            } else {
                answerElements[i].id = 'Incorrect'
            }
        }
    };

    //Hides correct and incorrect answers
    function hideAnswers() {
        let answerElements = document.querySelectorAll('.Answer');
        answerElements.forEach(function (element) {
            element.id = '';
        })
    };

    //Loads next Question
    function nextQuestion() {
        if (question === questionSet.length - 1) {
            setResults(true);
            setQuestionSet(null);
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

    function xpCalc(string) {
        switch (string) {
            case 'easy':
                return 5 * mult;
            case 'medium':
                return 10 * mult;
            case 'hard':
                return 15 * mult;
        }
    }

    async function addXp() {
        let earned = xpCalc(questionSet[question].difficulty);
        try {
            const response = await accountAPI.addXp({ xp: earned });
            setAccount(response);
            setMult(1);
        } catch (error) {
            console.error('Error Awarding XP'.error)
        }
    };

    async function submitAnswer(number) {
        let category = parseCategory2(parseCategory(questionSet[0].category));
        try {
            await accountAPI.submitAnswer({ category: category, status: number });
        } catch (error) {
            console.error('Error awarding correct answer'.error)
        }
    };

    async function usePowerup(powerup) {
        try {
            let response = await accountAPI.usePowerup({ powerup: powerup, });
            setAccount(response);
        } catch (error) {
            console.error('Error using powerup'.error)
        }
    };

    function skip() {
        if (question === questionSet.length - 1) {
            setResults(true);
            setQuestionSet(null);
        };
        const selectedAnswer = document.querySelector('.SelectedAnswer');
        if (selectedAnswer) {
            selectedAnswer.classList.remove('SelectedAnswer');
        };
        setChoice(null);
        setQuestion(question + 1);
        setScore([...score, `Question ${question}: SKIPPED`]);
        usePowerup('skip')
    };

    function quad() {
        setMult(4);
        usePowerup('quad');
    };

    function minus() {
        let remove = Decode(questionSet[question].incorrect_answers[getRandomNumber()]);

        let answerElements = document.querySelectorAll('.Answer');

        for (let i = 0; i < answerElements.length; i++) {
            if (answerElements[i].innerText === remove) {
                answerElements[i].id = 'Minus'
            };
        };
        usePowerup('minus')
    };

    function getRandomNumber() { return Math.floor(Math.random() * 3); }

    return (
        <>
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

                <div style={{ background: dLevelColor(questionSet[question].difficulty) }} className='Dlevel'>{questionSet[question].difficulty}</div>
                <div style={{ background: color }} className='CategoryName'>Category: {parseCategory2(parseCategory(questionSet[0].category))}</div>
                <button onClick={next ? handleConfirm : nextQuestion} className='Confirm'>{next ? 'Confirm' : 'Next'}</button>
            </div>
            <div className={`Powerups ${!next ? 'Forbidden' : ''}`}>
                <div className='Powerup'>
                    <p>{account.powerups.skip}</p>
                    <button onClick={skip}>Skip</button>
                </div>
                <div className='Powerup'>
                    <p>{account.powerups.quad}</p>
                    <button onClick={quad}>x4</button>
                </div>
                <div className='Powerup'>
                    <p>{account.powerups.minus}</p>
                    <button onClick={minus}>-1</button>
                </div>
            </div>
        </>
    )
};