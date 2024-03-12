import './Leaderboard.css';
import { useState, useEffect } from 'react';
import { getAllAccounts } from '../../../utilities/accounts-api';
import CategoryData from '../../assets/data/categories.json';
import Other from '../Other/Other';
import Loading from '../Loading/Loading';


export default function Leaderboard({ user }) {


    const [accounts, setAccounts] = useState(null);
    const [choice, setChoice] = useState('film');
    const [leaderboard, setLeaderboard] = useState(true);
    const [other, setOther] = useState(false);
    const [accountIndex, setAccountIndex] = useState(0);

    const handleCategoryChange = (event) => {
        const newChoice = event.target.value;
        setChoice(newChoice);

        setAccounts((prevAccounts) =>
            [...prevAccounts].sort((a, b) => {
                const categoryA = a.categories[newChoice];
                const categoryB = b.categories[newChoice];

                const averageA = categoryA.right === 0 ? 0 : categoryA.right / (categoryA.right + categoryA.wrong);
                const averageB = categoryB.right === 0 ? 0 : categoryB.right / (categoryB.right + categoryB.wrong);

                return averageB - averageA;
            })
        );
    };

    const categories = ['film', 'music', 'television', 'videogames',
        'mythology', 'sports', 'geography', 'history', 'politics', 'animals', 'vehicles'];


    useEffect(function () {
        async function getAllAccounts2() {
            try {
                const accounts = await getAllAccounts({});
                const sortedAccounts = [...accounts].sort((a, b) => {
                    const categoryA = a.categories[choice];
                    const categoryB = b.categories[choice];
                    const averageA = categoryA.right === 0 ? 0 : categoryA.right / (categoryA.right + categoryA.wrong);
                    const averageB = categoryB.right === 0 ? 0 : categoryB.right / (categoryB.right + categoryB.wrong);
                    return averageB - averageA;
                });

                setAccounts(sortedAccounts);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getAllAccounts2();
    }, []);


    function clickUser(index) {
        setAccountIndex(index);
        setLeaderboard(false);
        setOther(true);
    }

    return (
        <>
            {!accounts ? (
                <Loading />
            ) : (
                <>
                    {other && <Other setLeaderboard={setLeaderboard} setOther={setOther} account={accounts[accountIndex]} />}

                    {leaderboard &&
                        <div className='Leaderboard'>
                            <h2 className='PlayTitle'>Select a category to sort!</h2>
                            <select className='Selector' value={choice} onChange={handleCategoryChange}>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>

                            <table className='LeaderboardTable'>
                                <thead>
                                    <tr>
                                        <th className='CategoryTitle'>Rank</th>
                                        <th className='OtherName'>Name</th>
                                        <th className='Right'>Right</th>
                                        <th className='Wrong'>Wrong</th>
                                        <th className='Average'>Average</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts && accounts.length > 0 && (
                                        accounts.map((account, index) => {
                                            const right = account.categories[choice].right;
                                            const wrong = account.categories[choice].wrong;

                                            const average = (right + wrong !== 0) ? ((right / (right + wrong)) * 100).toFixed(2) : '0.00';

                                            return (
                                                <tr key={index}>
                                                    <td className='CategoryTitle'>#{index + 1}</td>
                                                    <td className='OtherName' onClick={() => clickUser(index)}>{account.user.name}</td>
                                                    <td className='Right'>{right}</td>
                                                    <td className='Wrong'>{wrong}</td>
                                                    <td className={average < 50 ? 'Wrong' : 'Right'}>{`${average}%`}</td>
                                                </tr>
                                            );
                                        })
                                    )}

                                </tbody>
                            </table>

                            <h3 className='LeaderboardTip'>Click a user to view their profile!</h3>
                        </div>
                    }
                </>
            )}

        </>

    )
}