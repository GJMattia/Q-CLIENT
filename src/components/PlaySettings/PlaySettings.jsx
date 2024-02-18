import './PlaySettings.css';
import CategoriesData from '../../assets/data/categories.json';
import { useState } from 'react';
import Select from '../../assets/audio/select.mp3';

export default function PlaySettings({ setQuestionSet, setSettings, setSong }) {

    // Variables for Quiz Settings
    const [amount, setAmount] = useState(5);
    const [difficulty, setDifficulty] = useState('easy');
    const [selectedCategory, setSelectedCategory] = useState(11);
    const [nextSong, setNextSong] = useState(null);

    //Audio
    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    // Functions for buttons
    const handleAmountClick = (newAmount) => {
        setAmount(newAmount);
        playSound(Select);
    };

    const handleDifficultyClick = (newDifficulty) => {
        setDifficulty(newDifficulty);
        playSound(Select);
    };

    const handleCategoryClick = (category) => {
        const categoryData = CategoriesData.categories[category];
        setSelectedCategory(categoryData.code);
        playSound(Select);
        setNextSong(categoryData.code);
    };

    // Function for getting questions
    async function getExternalQuestions() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`);
            const data = await response.json();
            setQuestionSet(data.results);
            setSettings(false);
            setSong(nextSong);
        } catch (error) {
            console.error('Error getting quiz questions', error);
        }
    };

    return (
        <div className='PlaySettings'>
            <h1>How many questions?</h1>
            <div className='Amount'>
                <button onClick={() => handleAmountClick(5)} className={`Five ${amount === 5 ? 'Selected' : ''}`}>5</button>
                <button onClick={() => handleAmountClick(10)} className={`Ten ${amount === 10 ? 'Selected' : ''}`}>10</button>
            </div>
            <h1>Choose your difficulty</h1>
            <div className='Difficulty'>
                <button onClick={() => handleDifficultyClick('easy')} className={`Easy ${difficulty === 'easy' ? 'Selected' : ''}`}>Easy</button>
                <button onClick={() => handleDifficultyClick('medium')} className={`Medium ${difficulty === 'medium' ? 'Selected' : ''}`}>Medium</button>
                <button onClick={() => handleDifficultyClick('hard')} className={`Hard ${difficulty === 'hard' ? 'Selected' : ''}`}>Hard</button>

            </div>
            <h1>Pick your category</h1>
            <div className='Categories'>
                {Object.entries(CategoriesData.categories).map(([category, properties]) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{ background: properties.color }}
                        className={`CategoryBtn ${selectedCategory === properties.code ? 'Selected' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button className='Begin' onClick={getExternalQuestions}>BEGIN</button>
        </div>
    );
}
