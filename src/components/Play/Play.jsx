import './Play.css';
import { useState } from 'react';
import PlaySettings from '../PlaySettings/PlaySettings';
import Quiz from '../Quiz/Quiz';


export default function Play() {



    const [questionSet, setQuestionSet] = useState(null);

    console.log(questionSet)
    return (
        <div className='Play'>

            <PlaySettings questionSet={questionSet} setQuestionSet={setQuestionSet} />

            <Quiz />

        </div>
    )
}