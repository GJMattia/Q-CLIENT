import './Quiz.css';
import { useState, useEffect } from 'react';
import * as accountAPI from '../../../utilities/accounts-api';
import Correct from '../../assets/audio/correct.mp3';
import Wrong from '../../assets/audio/wrong.mp3';
import Categories from '../../assets/data/categories.json';
import Select from '../../assets/audio/select.mp3';
import Minus from '../../assets/pictures/minus.webp';
import Skip from '../../assets/pictures/skip.webp';
import x4 from '../../assets/pictures/x4.webp';
import MinusSound from '../../assets/audio/Minus.mp3';
import QuadSound from '../../assets/audio/Quad.mp3';
import SkipSound from '../../assets/audio/Skip.mp3'

export default function Quiz({ questionSet, setQuestionSet, setAccount, setResults, setScore, score, account }) {

    //State Variables
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [choice, setChoice] = useState(null);
    const [next, setNext] = useState(true);
    const [color, setColor] = useState(Categories.categories[parseCategory(questionSet[0].category)].quiz);
    const [mult, setMult] = useState(1);
    const [power, setPower] = useState(true);

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
        playSound(Select);
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
            setMult(1);
        } else {
            playSound(Wrong);
            submitAnswer(0);
            setScore([...score, `Question ${question + 1}: Incorrect`]);
            setMult(1);
        }
        showAnswers();
        setNext(!next);
        setPower(false);
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
        setPower(true);
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
        if (account.powerups.skip <= 0) {
            return;
        };
        playSound(SkipSound);
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
        if (account.powerups.quad <= 0) {
            return;
        };
        playSound(QuadSound);
        setPower(false);
        setMult(4);
        usePowerup('quad');
    };

    function minus() {
        if (account.powerups.minus <= 0) {
            return;
        };
        playSound(MinusSound);
        setPower(false);
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
            <div className='QuizBar'>
                <h3>{question + 1}/ {questionSet.length}</h3>
                <h4 style={{ color: Categories.categories[parseCategory(questionSet[0].category)].color }}>Category: {parseCategory2(parseCategory(questionSet[0].category))}</h4>
                <h4 style={{ color: dLevelColor(questionSet[question].difficulty) }} className='Dlevel'>Difficulty: {questionSet[question].difficulty}</h4>
                <h4 className='Multiplier'>XP Multiplier: x{mult} </h4>
            </div>

            <div style={{ backgroundColor: color }} className='QuizContainer'>
                <h2 className='QuestionText'>{Decode(questionSet[question].question)}</h2>
                <div className='Answers'>
                    <div onClick={handleChoice} className='Answer'>{Decode(answers[0])}</div>
                    <div onClick={handleChoice} className='Answer'>{Decode(answers[1])}</div>
                    <div onClick={handleChoice} className='Answer'>{Decode(answers[2])}</div>
                    <div onClick={handleChoice} className='Answer'>{Decode(answers[3])}</div>
                </div>
                <button onClick={next ? handleConfirm : nextQuestion} className='Confirm'>{next ? 'Confirm' : 'Next'}</button>
            </div>
            <div className={`Powerups ${!power ? 'Forbidden' : ''}`}>
                <div className='Powerup'>
                    <img className='PowerupIcon' src={Skip} onClick={skip} />
                    <p>{account.powerups.skip}</p>
                </div>
                <div className='Powerup'>
                    <img className='PowerupIcon' src={x4} onClick={quad} />
                    <p>{account.powerups.quad}</p>
                </div>
                <div className='Powerup'>
                    <img className='PowerupIcon' src={Minus} onClick={minus} />
                    <p>{account.powerups.minus}</p>
                </div>
            </div>
        </>
    )
};