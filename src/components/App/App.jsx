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
            <Route path='/' element={<Profile />} />
            <Route path='/sauce' element={<Sauce user={user} />} />
          </Routes>
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