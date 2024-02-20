import './Log.css';
import LoginForm from '../Auth/LoginForm/LoginForm';
import SignUpForm from '../Auth/SignUpForm/SignUpForm';
import Google from '../Google/Google';

export default function Log({ logType, setLogType, log, setLog, setUser }) {

    function toggleLog() {
        setLog(!log);
        document.body.style.overflow = log ? 'auto' : 'hidden';
    };

    function toggleSignIn() {
        setLogType(0)
    }

    function toggleCreate() {
        setLogType(1)
    }

    function toggleSocial() {
        setLogType(2)
    }

    return (
        <div className='LogBackground'>
            <div className='LogBox'>
                <button className='X' onClick={toggleLog}>X</button>

                <div className='LogButtons'>
                    <button className={logType === 0 ? 'ActiveLog' : 'NotActiveLog'} onClick={toggleSignIn}>Sign In</button>
                    <button className={logType === 1 ? 'ActiveLog' : 'NotActiveLog'} onClick={toggleCreate}>Register</button>
                    <button className={logType === 2 ? 'ActiveLog' : 'NotActiveLog'} onClick={toggleSocial}>Google</button>
                </div>

                <div className='LogDiv'>
                    {logType === 0 ? (
                        <LoginForm log={log} setLog={setLog} setUser={setUser} />
                    ) : logType === 1 ? (
                        <SignUpForm log={log} setLog={setLog} setUser={setUser} />
                    ) : (
                        <div className='SocialMedia'>
                            <h1>Sign in with Google!</h1>
                            <Google log={log} setLog={setLog} setUser={setUser} />
                            <div className='Line'></div>
                        </div>
                    )}
                </div>









            </div>
        </div>
    )
}