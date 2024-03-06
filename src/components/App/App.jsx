import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../../utilities/user-services';
import NavBar1 from '../NavBars/NavBar1/NavBar1';
import NavBar2 from '../NavBars/NavBar2/NavBar2';
import Profile from '../Profile/Profile';
import Sauce from '../Sauce/Sauce';
import './App.css';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Play from '../Play/Play';
import Help from '../Help/Help';
import Leaderboard from '../Leaderboard/Leaderboard';

export default function App() {

  const [user, setUser] = useState(getUser());
  const [log, setLog] = useState(false);
  const [logType, setLogType] = useState(0);

  return (
    <div className='App'>
      {user ?
        <>
          <NavBar2 user={user} setUser={setUser} />
          <Routes>
            <Route path='/play' element={<Play user={user} />} />
            <Route path='/' element={<Profile user={user} />} />
            <Route path='/help' element={<Help user={user} />} />
            <Route path='/leaderboard' element={<Leaderboard user={user} />} />
            <Route path='/sauce' element={<Sauce user={user} />} />
          </Routes>
          <Footer />
        </> :
        <>
          <NavBar1 log={log} setLog={setLog} setLogType={setLogType} />
          <Home setUser={setUser} log={log} setLog={setLog} logType={logType} setLogType={setLogType} />
          <Footer />
        </>
      }
    </div>
  )
};