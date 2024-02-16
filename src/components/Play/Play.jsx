import './Play.css';
import { useState, useEffect } from 'react';
import { getAccount } from '../../../utilities/accounts-api';
import PlaySettings from '../PlaySettings/PlaySettings';
import Quiz from '../Quiz/Quiz';
import Results from '../Results/Results';
import XPBar from '../XPBar/XPBar';



export default function Play({ user }) {

    const [account, setAccount] = useState(null);
    const [questionSet, setQuestionSet] = useState(null);
    const [settings, setSettings] = useState(true);
    const [results, setResults] = useState(false);
    const [score, setScore] = useState([]);


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
                {/* <XPBar xp={account.xp} level={account.level} /> */}
                {settings && <PlaySettings setQuestionSet={setQuestionSet} setSettings={setSettings} />}
                {questionSet && <Quiz questionSet={questionSet} setQuestionSet={setQuestionSet} setAccount={setAccount} setResults={setResults} setScore={setScore} score={score} />}
                {results && <Results score={score} />}

            </div>
        )
    )
}