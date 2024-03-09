import './Other.css';
import ProfileStats from '../ProfileStats/ProfileStats';
import Badges from '../Badges/Badges';

export default function Other({ account, setLeaderboard, setOther }) {


    function daysAgo(date) {
        const oldDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate - oldDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    };

    function backToLB() {
        setLeaderboard(true);
        setOther(false);
    }

    return (
        <div className='Other'>
            <div className='PersonalInfo'>
                <h1 className='Username'>{account.user.name}</h1>
                <img className='OtherProfilePicture' src={account.pic} />
                <div className='AccountInfo'>
                    <p className='ProfileLevel'>Level {account.level}</p>
                    <p className='ProfileAge'>Joined {daysAgo(account.createdAt)} days ago</p>
                    <p className='ProfileMotto'>{account.motto}</p>
                </div>
            </div>
            <ProfileStats categories={account.categories} />
            <Badges account={account} />
            <button className='StatsBtn Return' onClick={backToLB}>Return to Leaderboard</button>
        </div>
    )
};