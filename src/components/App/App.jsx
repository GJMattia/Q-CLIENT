import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../../utilities/user-services';
import AuthPage from '../Auth/AuthPage/AuthPage';
import NavBar1 from '../NavBars/NavBar1/NavBar1';
import NavBar2 from '../NavBars/NavBar2/NavBar2';
import Profile from '../Profile/Profile';
import Sauce from '../Sauce/Sauce';
import './App.css';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';

export default function App() {
  const [user, setUser] = useState(getUser())

  return (
    <div className='App'>

      {user ?
        <>
          <NavBar2 user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<Profile />} />
            <Route path='/sauce' element={<Sauce />} />
          </Routes>
        </> :
        <>
          <NavBar1 />
          <Home setUser={setUser} />
          {/* <AuthPage setUser={setUser} /> */}
          <Footer />
        </>
      }
    </div>
  )
}


