import React from 'react';
import './ProfileStats.css';

export default function ProfileStats({ categories }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Correct %</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(categories).map(([category, counts]) => {
                    const rightCount = counts['right'];
                    const wrongCount = counts['wrong'];
                    const totalAttempts = rightCount + wrongCount;

                    const percentageRight = totalAttempts === 0 ? 0 : (rightCount / totalAttempts) * 100;

                    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

                    return (
                        <tr key={category}>
                            <td>{capitalizedCategory}</td>
                            <td>{percentageRight.toFixed(2)}%</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
