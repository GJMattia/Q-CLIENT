import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../../utilities/user-services'
import AuthPage from '../Auth/AuthPage/AuthPage'
import NavBar from '../NavBar/NavBar'
import Profile from '../Profile/Profile'
import Sauce from '../Sauce/Sauce'
import './App.css'

function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main>
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<Profile />} />
            <Route path='/sauce' element={<Sauce />} />
          </Routes>
        </> :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
