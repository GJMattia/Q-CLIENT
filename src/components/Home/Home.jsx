import './Home.css';
import BlueSpikes from '../../assets/pictures/BlueSpikes.png';
import HomeGraphics from '../HomeGraphics/HomeGraphics';
import Log from '../Log/Log';
import SignUpForm from '../Auth/SignUpForm/SignUpForm';
import { useState } from 'react';

export default function Home({ setUser, log, setLog, logType, setLogType }) {

    const [warning, setWarning] = useState(true);

    function toggleWarning() {
        setWarning(false);
    }

    function toggleLog() {
        setLog(!log);
        document.body.style.overflow = log ? 'auto' : 'hidden';
    };

    return (
        <>
            <div className='Home'>
                {warning && (
                    <div className='Warning'>
                        <p>Reminder: This website is on a free service, so the server may take up to 5 minutes to boot up on first use!</p>
                        <button onClick={toggleWarning} >Okay</button>
                    </div>
                )}
                <img className='BlueSpikes' src={BlueSpikes} />
                <div className='SplitBox'>
                    <div className='BoxOne'>
                        <h1>Unleash Your Wisdom</h1>
                        <p>Empowering minds through diverse quizzes, tracking achievements, and earning
                            XP – embark on a journey of knowledge and fun. Uncover your potential, one question at a time.</p>
                        <button onClick={toggleLog} >Sign in and play!</button>
                    </div>
                    <div className='BoxTwo'>
                        <div className='SignInOptions'>
                            <h1 className='SignTitle'>Sign up for free!</h1>
                        </div>
                        <SignUpForm log={log} setLog={setLog} setUser={setUser} />
                    </div>
                </div>
            </div>
            <HomeGraphics />
            {log && <Log log={log} setLog={setLog} setUser={setUser} logType={logType} setLogType={setLogType} />}
        </>
    )
}