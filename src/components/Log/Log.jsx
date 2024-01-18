import './Log.css';
import LoginForm from '../Auth/LoginForm/LoginForm';
import SignUpForm from '../Auth/SignUpForm/SignUpForm';

export default function Log({ logType, setLogType, log, setLog, setUser }) {

    function toggleLog() {
        setLog(!log);
    };

    function toggleSignIn() {
        setLogType(0)
    }

    function toggleCreate() {
        setLogType(1)
    }


    return (
        <div className='LogBackground'>
            <div className='LogBox'>
                <button className='X' onClick={toggleLog}>X</button>

                <div className='LogButtons'>
                    <button className={logType === 0 ? 'ActiveLog' : 'NotActiveLog'} onClick={toggleSignIn}>Sign In</button>
                    <button className={logType === 1 ? 'ActiveLog' : 'NotActiveLog'} onClick={toggleCreate}>Register</button>
                </div>

                <div className='LogOptions'>


                    <div className='Manual'>
                        {logType === 0 ? (
                            <LoginForm log={log} setLog={setLog} setUser={setUser} />
                        ) : (
                            <SignUpForm setUser={setUser} />
                        )}
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