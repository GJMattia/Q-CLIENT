import './XPBar.css';

export default function XPBar({ xp, level }) {

    return (
        <div className='Bar'>
            <div className='LevelBox'>
                <p className='Username'> Level {level}</p>
            </div>
            <div className='XPBar'>
                <div className='Meter' style={{ width: `${xp}%` }}></div>
            </div>
        </div>
    )
}