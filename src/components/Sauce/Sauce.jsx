import './Sauce.css';
import { useState } from 'react';

export default function Sauce() {
    const [test, setTest] = useState(true);

    function toggle() {
        setTest(!test);
    }

    return (
        <>
            <button onClick={toggle} className='BoxBtn'>
                Test Page
            </button>

            {test &&
                <div className={`Box ${test ? 'slop' : ''}`}>
                    Test Page
                </div>
            }
        </>
    );
}
