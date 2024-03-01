import './XPBar.css';

export default function XPBar({ xp, level }) {

    return (
        <div className='Bar'>
            <p className='Username'> Level {level}</p>
            <div className='XPBar'>
                <div className='Meter' style={{ width: `${xp}%` }}></div>
            </div>
        </div>
    )
}