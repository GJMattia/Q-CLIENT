import './Leaderboard.css';
import { useState, useEffect } from 'react';
import { getAllAccounts } from '../../../utilities/accounts-api';
import CategoriesData from '../../assets/data/categories.json';
import Select from '../../assets/audio/select.mp3';

export default function Leaderboard() {

    const [accounts, setAccounts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(11);

    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    useEffect(function () {
        async function getAllAccounts2() {
            try {
                const accounts = await getAllAccounts({});
                setAccounts(accounts);
                console.log(accounts)
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getAllAccounts2();
    }, []);


    const handleCategoryClick = (category) => {
        const categoryData = CategoriesData.categories[category];
        setSelectedCategory(categoryData.code);
        playSound(Select);
    };

    return (
        <>
            {!accounts ? (
                <div className='LoadingState'>
                    Loading...
                </div>
            ) : (
                <div className='Leaderboard'>
                    <h2>Leaderboard Gang</h2>
                    <div className='Categories'>
                        <h4 className='TopTitle'>Category</h4>
                        <div className='Categorys'>
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
                    </div>



                    <table className='LeaderboardTable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Overall %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts && accounts.length > 0 && (
                                accounts.map((account, index) => {
                                    let average = (
                                        (account.overall.right /
                                            (account.overall.right + account.overall.wrong)) *
                                        100
                                    ).toFixed(2);
                                    average = isNaN(average) ? '0.00' : average;
                                    return (
                                        <tr key={index}>
                                            <td>{account.user.name}</td>
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
            )}
        </>

    )
}