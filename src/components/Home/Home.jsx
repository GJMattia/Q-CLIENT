import './Home.css';
import { useState } from 'react';
import { signUp } from '../../../utilities/user-api';



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
            <div className='SplitBox'>

                <div className='BoxOne'>
                    <h1>Test your brain power and earn badges</h1>
                    <h4>Take quiz's with 15 different categories, and over 10k different questions!</h4>
                </div>



                <div className='BoxTwo'>

                    <div className='SignInOptions'>
                        <button>Sign in with Google</button>
                        <button>Sign in with Facebook</button>
                    </div>
                    <form className='SignUpForm' autoComplete="off" onSubmit={handleSubmit}>
                        <input placeholder='Username' type="text" name="name" value={formData.name} onChange={handleChange} required />
                        <input placeholder='Email Address' type="email" name="email" value={formData.email} onChange={handleChange} required />
                        <input placeholder='Password' type="password" name="password" value={formData.password} onChange={handleChange} required />
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