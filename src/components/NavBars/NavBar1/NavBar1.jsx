import './NavBar1.css';

export default function NavBar1({ log, setLog }) {

    function toggleLog() {
        setLog(!log);

    };
    return (
        <div className='NavBar1'>

            <h1 className='WebsiteTitle'>Sauce</h1>

            <div className='Btn-Log-Container'>
                <button className='Log-Btn' onClick={toggleLog}>
                    Sign In
                </button>
                <button className='Log-Btn' onClick={toggleLog}>
                    Register
                </button>
            </div>

        </div>
    )
};