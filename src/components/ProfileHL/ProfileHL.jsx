import './ProfileHL.css';

export default function ProfileHL({ categories }) {

    const categoryStats = Object.entries(categories).map(([category, counts]) => {
        const rightCount = counts['right'];
        const wrongCount = counts['wrong'];
        const totalAttempts = rightCount + wrongCount;
        const percentageRight = totalAttempts === 0 ? 0 : (rightCount / totalAttempts) * 100;

        return {
            category,
            percentageRight,
        };
    });

    const overallRight = categoryStats.reduce((sum, stat) => sum + stat.percentageRight, 0);
    const overallPercentage = overallRight / categoryStats.length;
    const bestCategory = categoryStats.reduce((best, stat) => (stat.percentageRight > best.percentageRight ? stat : best), categoryStats[0]);
    const worstCategory = categoryStats.reduce((worst, stat) => (stat.percentageRight < worst.percentageRight ? stat : worst), categoryStats[0]);

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
