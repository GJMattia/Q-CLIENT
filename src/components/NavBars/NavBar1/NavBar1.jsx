import './NavBar1.css';


export default function NavBar1({ log, setLog, setLogType }) {


    function toggleSignIn() {
        setLog(!log);
        setLogType(0);
        document.body.style.overflow = log ? 'auto' : 'hidden';
    }

    function toggleCreate() {
        setLog(!log);
        setLogType(1);
        document.body.style.overflow = log ? 'auto' : 'hidden';
    }

    return (
        <div className='NavBar1'>

            <h1 className='WebsiteTitle'>Sauce</h1>

            <div className='Btn-Log-Container'>
                <button className='Log-Btn' onClick={toggleSignIn}>
                    Sign In
                </button>
                <button className='Log-Btn' onClick={toggleCreate}>
                    Register
                </button>
            </div>

        </div>
    )
};