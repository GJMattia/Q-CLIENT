import './XPBar.css';
import { useState } from 'react';

export default function XPBar({ xp, level }) {



    return (
        <>
            <h2>Level {level}</h2>
            <div className='XPBar'>
                <div className='Meter' style={{ width: `${xp}%` }}></div>
            </div>
        </>
    )
}