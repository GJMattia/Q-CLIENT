import './Home.css';
import { useState } from 'react';
import { signUp } from '../../../utilities/user-api';
import BlueSpikes from '../../assets/pictures/BlueSpikes.png';



export default function Home({ setUser }) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const { error, confirm, ...data } = formData;

            const user = await signUp(data);
            setUser(user);
        } catch (error) {
            setFormData({ ...formData, error: 'Sign Up Failed - Try Again' });
        }
    };

    const disable = formData.password !== formData.confirm;

    return (
        <div className='Home'>
            <img className='BlueSpikes' src={BlueSpikes} />
            <div className='SplitBox'>

                <div className='BoxOne'>
                    <h1>Unleash Your Wisdom</h1>
                    <p>Empowering minds through diverse quizzes, tracking achievements, and earning
                        XP – embark on a journey of knowledge and fun. Uncover your potential, one question at a time.</p>
                    <button>Play Now!</button>
                </div>



                <div className='BoxTwo'>

                    <div className='SignInOptions'>
                        <button>Sign in with Google</button>
                        <button>Sign in with Facebook</button>
                    </div>
                    <form className='SignUpForm' autoComplete="off" onSubmit={handleSubmit}>
                        <label className='UserIcon'>👤</label>
                        <input placeholder='Username' type="text" name="name" value={formData.name} onChange={handleChange} required />
                        <label className='EmailIcon'>📧</label>
                        <input placeholder='Email Address' type="email" name="email" value={formData.email} onChange={handleChange} required />
                        <label className='PWIcon1'>🔒</label>
                        <input placeholder='Password' type="password" name="password" value={formData.password} onChange={handleChange} required />
                        <label className='PWIcon2'>🔒</label>
                        <input placeholder='Confirm Password' type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
                        <button className='CreateAccountBtn' type="submit" disabled={disable}>
                            Create My Account
                        </button>
                    </form>
                </div>
            </div>
            <p className="error-message">&nbsp;{formData.error}</p>
        </div>
    )
}