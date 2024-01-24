import './Profile.css';
import { useState, useEffect } from 'react';
import { getAccount } from '../../../utilities/accounts-api';

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

    return (
        account && (
            <div className='Profile'>
                <p>Username: {user.name}</p>
                <p>XP: {account.xp}</p>
                <p>Level: {account.level}</p>
                <p>Motto: {account.description}</p>
                <p>Music Wrong: {account.music.wrong}</p>
            </div>
        )
    );
};