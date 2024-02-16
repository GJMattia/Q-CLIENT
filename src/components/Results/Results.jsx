import './Results.css';


export default function Results({ score }) {



    return (
        <div className='Results'>
            <h1>AFTER ACTION REPORT</h1>
            <ul className='ResultsList'>
                {score.map((result, index) => (
                    <li key={index} className='ResultItem'>
                        {result}
                    </li>
                ))}
            </ul>
        </div>
    )
}