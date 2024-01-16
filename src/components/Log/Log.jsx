import './Log.css';
import LoginForm from '../Auth/LoginForm/LoginForm';

export default function Log({ log, setLog, setUser }) {

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

                <div className='LogOptions'>

                    <div className='Manual'>
                        <LoginForm log={log} setLog={setLog} setUser={setUser} />
                    </div>


                    <div className='SocialMedia'>
                        <button>Sign in With Google</button>
                        <button>Sign in with Facebook</button>
                    </div>

                </div>



            </div>
        </div>
    )
}