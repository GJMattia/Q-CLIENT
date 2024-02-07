import './ProfileHL.css';

export default function ProfileHL({ categories }) {
    const filteredCategories = Object.entries(categories)
        .filter(([category, counts]) => counts['right'] > 0 || counts['wrong'] > 0)
        .map(([category, counts]) => {
            const rightCount = counts['right'];
            const wrongCount = counts['wrong'];
            const totalAttempts = rightCount + wrongCount;
            const percentageRight = totalAttempts === 0 ? 0 : (rightCount / totalAttempts) * 100;

            return {
                category,
                percentageRight,
            };
        });

    const overallRight = filteredCategories.reduce((sum, stat) => sum + stat.percentageRight, 0);
    const overallPercentage = filteredCategories.length === 0 ? 0 : overallRight / filteredCategories.length;
    const bestCategory = filteredCategories.reduce((best, stat) => (stat.percentageRight > best.percentageRight ? stat : best), filteredCategories[0]);
    const worstCategory = filteredCategories.reduce((worst, stat) => (stat.percentageRight < worst.percentageRight ? stat : worst), filteredCategories[0]);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <table className='HighLights'>
            <thead>
                <th>Overall %</th>
                <th>Best Category</th>
                <th>Worst Category</th>
            </thead>
            <tbody>
                <tr>
                    <td>{overallPercentage.toFixed(2)}%</td>
                    <td className='Best'>{capitalizeFirstLetter(bestCategory.category)} {bestCategory.percentageRight.toFixed(2)}%</td>
                    <td className='Worst'>{capitalizeFirstLetter(worstCategory.category)} {worstCategory.percentageRight.toFixed(2)}%</td>
                </tr>
            </tbody>
        </table>
    );
}
