import { Link } from 'react-router-dom';
import * as userService from '../../../../utilities/user-services';
import './NavBar2.css'

export default function NavBarTwo({ user, setUser }) {
  function handleLogOut() {
    userService.logOut()
    setUser(null)
  }

  return (
    <div className='NavBar2'>
      <h1 className='WebsiteTitle'>Sauce</h1>
      <ul className='Nav2List'>
        <li> <Link to='/play'>Play</Link></li>
        <li><Link to='/'>Profile</Link></li>
        <li> <Link to='/sauce'>Sauce</Link></li>
        <li><Link to='' onClick={handleLogOut}>Log Out</Link></li>
      </ul>
    </div>
  );
};