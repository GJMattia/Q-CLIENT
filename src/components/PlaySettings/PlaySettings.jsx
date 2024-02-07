import './PlaySettings.css';
import CategoriesData from '../../assets/data/categories.json';
import { useState } from 'react';

export default function PlaySettings({ questionSet, setQuestionSet }) {

    // Variables for Quiz Settings
    const [amount, setAmount] = useState(5);
    const [difficulty, setDifficulty] = useState('easy');
    const [selectedCategory, setSelectedCategory] = useState(11);

    // Functions for buttons
    const handleAmountClick = (newAmount) => {
        setAmount(newAmount);
        console.log(amount)
    };

    const handleDifficultyClick = (newDifficulty) => {
        setDifficulty(newDifficulty.toLowerCase());
        console.log(difficulty)
    };

    const handleCategoryClick = (category) => {
        const categoryData = CategoriesData.categories[category];
        setSelectedCategory(categoryData.code);
        console.log(selectedCategory)
    };

    // Function for getting questions
    async function getExternalQuestions() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`);
            const data = await response.json();
            setQuestionSet(data.results);


        } catch (error) {
            console.error('Error getting quiz questions', error);
        }
    };

    return (
        <div className='PlaySettings'>
            <div className='Amount'>
                <button onClick={() => handleAmountClick(5)} className={amount === 5 ? 'selected' : ''}>5</button>
                <button onClick={() => handleAmountClick(10)} className={amount === 10 ? 'selected' : ''}>10</button>
            </div>
            <div className='Difficulty'>
                <button onClick={() => handleDifficultyClick('Easy')} className={difficulty === 'Easy' ? 'selected' : ''}>Easy</button>
                <button onClick={() => handleDifficultyClick('Medium')} className={difficulty === 'Medium' ? 'selected' : ''}>Medium</button>
                <button onClick={() => handleDifficultyClick('Hard')} className={difficulty === 'Hard' ? 'selected' : ''}>Hard</button>
                <button onClick={() => handleDifficultyClick('Random')} className={difficulty === 'Random' ? 'selected' : ''}>Random</button>
            </div>

            <div className='Category'>
                {Object.entries(CategoriesData.categories).map(([category, properties]) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{ backgroundColor: properties.color }}
                        className={selectedCategory === properties.code ? 'selected' : ''}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button onClick={getExternalQuestions}>BEGIN</button>
        </div>
    );
}
