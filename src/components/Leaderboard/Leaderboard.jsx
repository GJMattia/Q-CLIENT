import './Leaderboard.css';
import { useState, useEffect } from 'react';
import { getAllAccounts } from '../../../utilities/accounts-api';
import Deadlift from '../../assets/pictures/Deadlift.png';
import Other from '../Other/Other';
import Loading from '../Loading/Loading';


export default function Leaderboard({ user }) {

    const [accounts, setAccounts] = useState(null);
    const [choice, setChoice] = useState('film');
    const [leaderboard, setLeaderboard] = useState(true);
    const [other, setOther] = useState(false);
    const [accountIndex, setAccountIndex] = useState(0);

    const handleCategoryChange = (event) => {
        setChoice(event.target.value);
    };

    const categories = ['film', 'music', 'television', 'videogames',
        'mythology', 'sports', 'geography', 'history', 'politics', 'animals', 'vehicles'];

    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    useEffect(function () {
        async function getAllAccounts2() {
            try {
                const accounts = await getAllAccounts({});
                setAccounts(accounts);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getAllAccounts2();
    }, []);


    function Slop(index) {
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
                            <h2 className='PlayTitle'>Leaderboard Gang</h2>
                            <div className='CategorySelection'>
                                <h4>Leaderboard Sorter</h4>
                                <div className='DualBox'>
                                    <select value={choice} onChange={handleCategoryChange}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <img src={Deadlift} />
                                </div>
                            </div>

                            <table className='LeaderboardTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>{choice}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts && accounts.length > 0 && (
                                        accounts.map((account, index) => {
                                            let average = (
                                                (account.categories[choice].right /
                                                    (account.categories[choice].right + account.categories[choice].wrong)) *
                                                100
                                            ).toFixed(2);
                                            average = isNaN(average) ? '0.00' : average;
                                            return (
                                                <tr key={index}>
                                                    <td onClick={() => Slop(index)}>{account.user.name}</td>
                                                    <td>
                                                        {average}
                                                        %
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}

                                </tbody>
                            </table>

                        </div>
                    }
                </>
            )}
        </>

    )
}