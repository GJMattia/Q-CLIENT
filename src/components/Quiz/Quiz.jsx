import './Quiz.css';
import { useState, useEffect } from 'react';
import * as accountAPI from '../../../utilities/accounts-api';
import Correct from '../../assets/audio/correct.mp3';
import Wrong from '../../assets/audio/wrong.mp3';
import Categories from '../../assets/data/categories.json';

export default function Quiz({ questionSet, setQuestionSet, setAccount, setResults, setScore, score }) {

    //State Variables
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [choice, setChoice] = useState(null);
    const [next, setNext] = useState(true);
    const [color, setColor] = useState(Categories.categories[parseCategory(questionSet[0].category)].quiz);

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
        setChoice(event.target.innerText);

    };

    //Submitting answer
    function handleConfirm() {
        if (choice === questionSet[question].correct_answer) {
            playSound(Correct);
            addXp();
            submitAnswer(1);
            setScore([...score, `Question ${question}: Correct, +5xp`])
        } else {
            playSound(Wrong);
            submitAnswer(0);
            setScore([...score, `Question ${question}: Incorrect`])
        }
        showAnswers();
        setNext(!next);
    };

    //Showing the right and wrong answers
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
                return 5;
            case 'medium':
                return 10;
            case 'hard':
                return 15;
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

    return (
        <div style={{ background: color }} className='QuizContainer'>
            <div style={{ background: dLevelColor(questionSet[question].difficulty) }} className='Dlevel'>{questionSet[question].difficulty}</div>
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