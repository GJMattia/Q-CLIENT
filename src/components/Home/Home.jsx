import './Home.css';
import { useState } from 'react';
import BlueSpikes from '../../assets/pictures/BlueSpikes.png';
import HomeGraphics from '../HomeGraphics/HomeGraphics';
import Log from '../Log/Log';
import SignUpForm from '../Auth/SignUpForm/SignUpForm';

export default function Home({ setUser, log, setLog, logType, setLogType }) {


    return (
        <>
            <div className='Home'>
                <img className='BlueSpikes' src={BlueSpikes} />
                <div className='SplitBox'>

                    <div className='BoxOne'>
                        <h1>Unleash Your Wisdom</h1>
                        <p>Empowering minds through diverse quizzes, tracking achievements, and earning
                            XP – embark on a journey of knowledge and fun. Uncover your potential, one question at a time.</p>
                        <button>Play Now!</button>
                    </div>
                    <div className='BoxTwo'>
                        <div className='SignInOptions'>
                            <button >Sign in with Google</button>
                            <button >Sign in with Facebook</button>
                        </div>
                        <SignUpForm setUser={setUser} />
                    </div>
                </div>
            </div>
            <HomeGraphics />
            {log && <Log log={log} setLog={setLog} setUser={setUser} logType={logType} setLogType={setLogType} />}
        </>
    )
}