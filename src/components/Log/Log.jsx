import './Log.css';
import LoginForm from '../Auth/LoginForm/LoginForm';
import SignUpForm from '../Auth/SignUpForm/SignUpForm';
import Google from '../Google/Google';

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
                    <button className={logType === 2 ? 'ActiveLog' : 'NotActiveLog'} onClick={toggleSocial}>Social Media</button>
                </div>




                <div className='LogDiv'>
                    {logType === 0 ? (
                        <LoginForm log={log} setLog={setLog} setUser={setUser} />
                    ) : logType === 1 ? (
                        <SignUpForm setUser={setUser} />
                    ) : (
                        <div className='SocialMedia'>
                            <button>Sign in With Google</button>
                            <button>Sign in with Facebook</button>
                        </div>
                    )}
                </div>









            </div>
        </div>
    )
}