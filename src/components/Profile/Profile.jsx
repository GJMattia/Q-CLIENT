import './Profile.css';
import { useState, useEffect } from 'react';
import { getAccount } from '../../../utilities/accounts-api';
import Default from '../../assets/pictures/default.jpeg';
import XPBar from '../XPBar/XPBar';

export default function Profile({ user }) {
    const [account, setAccount] = useState(null);
    useEffect(function () {
        async function getAccount2() {
            try {
                const account = await getAccount({ user: user._id });
                setAccount(account);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getAccount2();
    }, []);

    function daysAgo(date) {
        const oldDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate - oldDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }




    return (
        account && (
            <div className='Profile'>
                <div className='PersonalInfo'>
                    <h1 className='Username'>{user.name}</h1>
                    <img className='ProfilePicture' src={Default} />
                    <div className='ProfileOptions'>
                        <button>Upload Picture</button>
                        <button>Edit Motto</button>
                    </div>
                    <div className='AccountInfo'>
                        <p className='ProfileLevel'>Level {account.level}</p>
                        <p className='ProfileAge'>Joined {daysAgo(user.createdAt)} days ago</p>
                        <p className='ProfileMotto'>{account.description}</p>
                    </div>
                    <XPBar XP={account.xp} />
                </div>
            </div>
        )
    );
};