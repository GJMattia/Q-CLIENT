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
                Test Page 23434
            </button>

            {test &&
                <div className={`Box ${test ? 'slop' : ''}`}>
                    Test Page
                </div>
            }
        </>
    );
}
