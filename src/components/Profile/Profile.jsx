import './Profile.css';
import { useState, useEffect } from 'react';
import { getAccount } from '../../../utilities/accounts-api';
import XPBar from '../XPBar/XPBar';
import EditMotto from '../EditMotto/EditMotto';
import ProPicUpload from '../ProPicUpload/ProPicUpload';



export default function Profile({ user }) {

    const [account, setAccount] = useState(null);
    const [motto, setMotto] = useState(false);
    const [pic, setPic] = useState(false);



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
    };

    function toggleMotto() {
        setMotto(!motto);
    }

    function togglePic() {
        setPic(!pic);
    };

    return (
        account && (
            <div className='Profile'>
                {motto && <EditMotto motto={motto} setMotto={setMotto} account={account} setAccount={setAccount} />}
                <div className='PersonalInfo'>
                    <h1 className='Username'>{user.name}</h1>
                    <img className='ProfilePicture' src={account.pic} />
                    <div className='ProfileOptions'>

                        {pic && <ProPicUpload setAccount={setAccount} pic={pic} setPic={setPic} />}
                        <button onClick={togglePic}>Change Picture</button>
                        <button onClick={toggleMotto}>Edit Motto</button>
                    </div>
                    <div className='AccountInfo'>
                        <p className='ProfileLevel'>Level {account.level}</p>
                        <p className='ProfileAge'>Joined {daysAgo(user.createdAt)} days ago</p>
                        <p className='ProfileMotto'>{account.motto}</p>
                    </div>
                    {/* <XPBar XP={account.xp} /> */}
                </div>
            </div>
        )
    );
};