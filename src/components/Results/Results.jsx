import './Results.css';
import { Link } from 'react-router-dom';


export default function Results({ score }) {

    const handlePlayClick = () => {
        // Perform any necessary reset or cleanup actions here

        // Reload the page to simulate a refresh
        window.location.reload();
    };

    return (
        <div className='Results'>
            <h1 className='PlayTitle'>AFTER ACTION REPORT</h1>
            <ul className='ResultsList'>
                {score.map((result, index) => (
                    <li key={index} className='ResultItem'>
                        {result}
                    </li>
                ))}
            </ul>

            <div className='PostOptions'>
                <Link to='/play' onClick={handlePlayClick}>Play Again?</Link>
                <Link to='/'> My Profile</Link>
            </div>
        </div>
    )
};