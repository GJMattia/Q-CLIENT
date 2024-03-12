import './HomeGraphics.css';
import PenguinBooks from '../../assets/pictures/PenguinBooks.png';
import PenguinSlot from '../../assets/pictures/PenguinSlot.png';
import PenguinTrophy from '../../assets/pictures/PenguinTrophy.png';


export default function HomeGraphics() {

    return (
        <>
            <div className='HomeGraphics TopGraphic'>
                <div className='ImageContainer'>
                    <img className='PenguinBooks' src={PenguinBooks} />
                </div>
                <div className='InfoContainer'>
                    <h1>Expand Your Horizons</h1>
                    <p> Immerse yourself in a diverse world of knowledge with our quizzes spanning numerous categories.
                        From science to History, challenge yourself and broaden your understanding across a spectrum of fascinating subjects.</p>
                </div>
            </div>
            <div className='HomeGraphics'>
                <div className='InfoContainer'>
                    <h1>Power play</h1>
                    <p>Elevate your quiz experience with three exciting power-ups! Enhance the fun and challenge of each quiz by strategically using these game-changing boosts.</p>
                </div>
                <div className='ImageContainer'>
                    <img className='PenguinSlot' src={PenguinSlot} />
                </div>
            </div>
            <div className='HomeGraphics'>
                <div className='ImageContainer'>
                    <img className='PenguinTrophy' src={PenguinTrophy} />
                </div>
                <div className='InfoContainer'>
                    <h1>Level Up</h1>
                    <p>Every quiz is not just a challenge but an opportunity to grow. Earn Experience Points (EXP) as you play, climb the ranks, and unlock badges and achievements along the way.
                        Showcase your quiz mastery and celebrate your accomplishments as you progress through our interactive and rewarding experience.</p>
                </div>
            </div>
        </>
    )
}