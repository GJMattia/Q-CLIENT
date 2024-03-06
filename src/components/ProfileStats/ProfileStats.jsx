import React from 'react';
import './ProfileStats.css';
import CategoryData from '../../assets/data/categories.json';
import { useState } from 'react';

export default function ProfileStats({ categories }) {

    const [stats, setStats] = useState(false);

    function toggleStats() {
        setStats(!stats)
    }

    return (
        <>
            <button onClick={toggleStats} className='StatsBtn'>{stats ? 'Hide Stats' : 'Show Stats'}</button>
            {stats && (
                <table className='StatsTable'>
                    <thead>
                        <tr>
                            <th className='CategoryTitle'>Category</th>
                            <th className='Right'>Right</th>
                            <th className='Wrong'>Wrong</th>
                            <th className='Average'>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(categories).map(([category, counts]) => {
                            const rightCount = counts['right'];
                            const wrongCount = counts['wrong'];
                            const totalAttempts = rightCount + wrongCount;
                            const percentageRight = totalAttempts === 0 ? 0 : (rightCount / totalAttempts) * 100;
                            const capitalizedCategory =
                                category === 'videogames'
                                    ? 'Video Games'
                                    : category.charAt(0).toUpperCase() + category.slice(1);
                            const color = CategoryData.categories[capitalizedCategory].color;

                            return (
                                <tr key={category}>
                                    <td className='Category' style={{ color: color }}>{capitalizedCategory}</td>
                                    <td className='Right'>{counts['right']}</td>
                                    <td className='Wrong'>{counts['wrong']}</td>
                                    <td className={percentageRight === 0 ? 'Average' : percentageRight < 50 ? 'Wrong' : 'Right'}> {percentageRight.toFixed(2)}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </>
    );
}
