import './Sauce.css';
import { useState } from 'react';

export default function Sauce() {

    const [test, setTest] = useState(true);

    function stop() {
        setTest(!test);



    }

    return (
        <div className='Test'>
            {test && (
                <div className='Back'>
                    <div className='Box'>
                        <h1>hello friends</h1>
                        <button onClick={stop}>rope rope rope</button>
                    </div>
                </div>
            )}
            <button onClick={stop}>rope rope rope</button>
            <div className='Red'></div>
            <div className='Blue'></div>
            <div className='Green'></div>
        </div>
    );
}
