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
import HomeGraphics from '../HomeGraphics/HomeGraphics';
import Log from '../Log/Log';

export default function App() {
  const [user, setUser] = useState(getUser());

  const [log, setLog] = useState(false);

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
          <NavBar1 log={log} setLog={setLog} />

          <Home setUser={setUser} />
          <HomeGraphics />
          {log && <Log log={log} setLog={setLog} />}
          {/* <AuthPage setUser={setUser} /> */}
          <Footer />
        </>
      }
    </div>
  )
}



