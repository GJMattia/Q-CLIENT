import './Log.css';

export default function Log({ log, setLog }) {

    function toggleLog() {
        setLog(!log);
    };


    return (
        <div className='LogBackground'>
            <div className='LogBox'>
                <button className='X' onClick={toggleLog}>X</button>

                <div className='LogButtons'>
                    <button>Sign In</button>
                    <button>Register</button>
                </div>



            </div>
        </div>
    )
}