import { useState } from 'react';
import './Sauce.css';

export default function Sauce() {
    const [xp, setXP] = useState(0);

    const handleAddXP = () => {
        setXP(prevXP => prevXP + 10);
    };

    return (
        <div className='Test'>
            <div className='Bar'>
                <div className='Kook' style={{ width: `${xp}%` }}></div>
            </div>
            <button onClick={handleAddXP}>Add 10 XP</button>
        </div>
    );
}
