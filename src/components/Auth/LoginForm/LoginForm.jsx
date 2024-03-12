import { useState } from 'react'
import * as usersService from '../../../../utilities/user-services'
import './LoginForm.css';

export default function LoginForm({ setUser, log, setLog, setLoading }) {

  function toggleLog() {
    setLog(!log);
    document.body.style.overflow = log ? 'auto' : 'hidden';
  };

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const Error = document.querySelector('.Error');
    try {
      setLoading(true);
      const user = await usersService.login(credentials)
      setUser(user);
      toggleLog();
    } catch {
      setError('Log In Failed - Try Again');
      Error.style.opacity = '1';
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className='LoginForm' autoComplete="off" onSubmit={handleSubmit}>
        <label className='LoginEmail'>📧</label>
        <input min="1" max="25" placeholder='Your email address' type="text" name="email" value={credentials.email} onChange={handleChange} required />
        <label className='LoginPW'>🔒</label>
        <input min="1" max="25" placeholder='Your password' type="password" name="password" value={credentials.password} onChange={handleChange} required />
        <button className='LoginBtn' type="submit">Sign In</button>
      </form>
      <p className="Error">{error}</p>
    </>
  )
}