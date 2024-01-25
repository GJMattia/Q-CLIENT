import './XPBar.css';

export default function XPBar({ XP }) {

    const meterWidth = `${XP}%`;

    console.log(XP)
    return (
        <div className='XPBar'>
            <div className='Meter' style={{ width: meterWidth }}></div>
        </div>
    )
}