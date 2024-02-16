import { useState } from 'react';
import './Sauce.css';

export default function Sauce() {
    const [xp, setXP] = useState(0);

    const handleAddXP = () => {
        setXP(prevXP => prevXP + 10);
    };



    return (

        <div className='Black'>
            <button class="CategoryBtn"><span>Read More</span></button>

        </div>
    );
}
