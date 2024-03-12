import './XPBar.css';

export default function XPBar({ xp, level }) {

    return (
        <div className='Bar'>
            <div className='LevelBox'>
                <p id='LevelName' className='Username'> Level {level}</p>
            </div>
            <div className='XPBar'>
                <div className='Meter' style={{ width: `${xp}%` }}></div>
            </div>
        </div>
    )
}