import './Play.css';
import { useState, useEffect } from 'react';
import { getAccount } from '../../../utilities/accounts-api';
import PlaySettings from '../PlaySettings/PlaySettings';
import Quiz from '../Quiz/Quiz';
import Results from '../Results/Results';
import XPBar from '../XPBar/XPBar';
import Correct from '../../assets/audio/correct.mp3';


export default function Play({ user }) {

    const [account, setAccount] = useState(null);
    const [questionSet, setQuestionSet] = useState(null);


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
            <div className='Play'>

                <PlaySettings questionSet={questionSet} setQuestionSet={setQuestionSet} />
                {questionSet && <Quiz questionSet={questionSet} account={account} setAccount={setAccount} />}
                {/* <Results /> */}
                <XPBar xp={account.xp} level={account.level} />
            </div>
        )
    )
}